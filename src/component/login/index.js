import React, { useState,useEffect } from "react";
import { Input, Button, Tabs, message } from 'antd';
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';

import QRCode from 'qrcode.react';
import { MD5 } from '../../util'

import ComInput from '../common/bipt'
import Code from './code'
import CNF from '../../config'

import stl from './index.css'

import { useInterval } from '../common/counter';

function LoginForm(props) {
  
  const [delay, setDelay] = useState(null);//定时器，并设置时间 null值暂停计时器

  let { codeImg, codeId } = props.login.pic;
  const [login, setLogin] = useState({ userName: "",pwd: "",codeId:"any", capchaCode:"any" });

  useEffect(() => {
      props.lAct.signpicSt()
      return ()=>{
        setDelay(null);//暂停计时器
      }
  }, []);

  useEffect(() => {
    setLogin({
      ...login,
      codeId: codeId
    });
  }, [codeId]);

  const printValues = () => {


    //e.preventDefault();
    //console.log(MD5("abc").toString());
    if(login.userName && login.pwd && login.capchaCode){

      let info = JSON.stringify(login);
      info = JSON.parse(info)
      info.pwd = MD5(info.pwd);

      props.lAct.loginSt(info)

    } else {
      message.error('请输入用户名、密码和验证码！');
    }

  };

  const enterValues = e =>{
    if (e.keyCode === 13) {
			printValues()
		}
  }

  const updateField = e => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  };

  const emptyField = e => {
    setLogin({
      ...login,
      [e.target.name]: ''
    });
  };

  const refreshPic = () => {
      //props.lAct.signpicSt(login.codeId)
  }

  //Tabs 切换
  const tabkey = (key) => {
    if(key == '1'){
      setDelay(null);
    }

    if(key == '2'){
      setDelay(3000);
    }
  }

  return (
    <div className={stl.locals.backabc}>
    <div className={stl.loginMain}>
      <Tabs defaultActiveKey="1" onChange={tabkey}>
        <Tabs.TabPane tab="账密登陆" key="1">
          <div className={stl.loginAccount}>
            <p>
              <ComInput
                limit={ CNF.IPTLIT.username }
                prefix={<UserOutlined />}
                placeholder={"用户名"}
                value={login.userName}
                name={ "userName" }
                clear = { emptyField }
                update={ updateField } />
            </p>
            <p>
              <ComInput
                limit={ CNF.IPTLIT.password }
                prefix={<LockOutlined />}
                placeholder={ "密码" }
                password
                bindKeys={enterValues}
                name={ "pwd" }
                value={ login.pwd }
                clear = { emptyField }
                update={ updateField }/>
            </p>
            <p className={stl.picCode}>
              <ComInput
                limit={ CNF.IPTLIT.namea }
                prefix={<SafetyOutlined />}
                placeholder={ "验证码" }
                name={ "capchaCode" }
                value={ login.capchaCode }
                clear = { emptyField }
                update={ updateField }/>
                <span className={stl.pic} onClick={refreshPic}><img src={ "data:image/png;base64," + codeImg } alt="验证码" /></span>
            </p>

            <p>
              <Button type="primary" block onKeyDown={enterValues} onClick={printValues} >确认</Button>
            </p>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="扫码登陆" key="2">
          <div className={stl.loginCode}>
            <Code delay={delay} setDelay={setDelay} code={props.login.code} codeSt={props.lAct.codeSt} codescanSt={props.lAct.codescanSt}/>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
    </div>
  );
}

export default LoginForm;
