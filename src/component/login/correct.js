import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Route, useHistory, useLocation } from 'react-router-dom';
import { Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import ComInput from '../common/bipt'
import CNF from '../../config'
import { MD5 } from '../../util'
import stl from './index.css'

function CorrectForm(props) {

  console.log(props)

  const [correct, setCorrect] = useState({ userName: "",oriPwd: "",newPwd:"" });

  const printValues = e => {
    e.preventDefault();

    if(correct.userName && correct.oriPwd && correct.newPwd){

      let info = JSON.stringify(correct);
      info = JSON.parse(info)
      info.oriPwd = MD5(info.oriPwd);
      info.newPwd = MD5(info.newPwd);
      props.cort(info)

    } else {
      message.info('请输入用户名，密码，新密码！');
    }
  };

  const updateField = e => {
    setCorrect({
      ...correct,
      [e.target.name]: e.target.value
    });
  };

  const emptyField = e => {
    setCorrect({
      ...correct,
      [e.target.name]: ''
    });
  };

  return (
    <div className={stl.backabc}>
    <div className={stl.loginMain}>
      <div className={stl.loginAccount}>
        <h2>密码修改</h2>
        <p>
          <ComInput
            limit={ CNF.IPTLIT.username }
            placeholder={"用户名"}
            prefix={<UserOutlined />}
            value={correct.userName}
            name={ "userName" }
            clear = { emptyField }
            update={ updateField } />
        </p>
        <p>
          <ComInput
            limit={ CNF.IPTLIT.password }
            prefix={<LockOutlined />}
            placeholder={ "原密码" }
            password
            name={ "oriPwd" }
            value={ correct.oriPwd }
            clear = { emptyField }
            update={updateField}/>
        </p>
        <p>
          <ComInput
            limit={ CNF.IPTLIT.password }
            prefix={<LockOutlined />}
            placeholder={ "新密码" }
            password
            name={ "newPwd" }
            value={ correct.newPwd }
            clear = { emptyField }
            update={ updateField }/>
        </p>
        <p>
          <Button type="primary" block onClick={printValues} >确认</Button>
        </p>
      </div>
    </div>
    </div>
  );
}

export default CorrectForm;
