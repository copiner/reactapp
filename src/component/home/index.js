/**
系统，常用业务

页面跳转刷新
备注
1、使用useHistory做页面跳转导航

2、withRouter组件将注入history对象作为该组件的属性。
这样，不需要处理context，可直接访问push和replace方法
*/

import React, { useState,useEffect } from "react";
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import { Button, Divider,Empty, Modal, message } from 'antd';

import loadable from "@loadable/component";

const Detail = loadable((props) => import(/* webpackChunkName: "detail" */'./detail'));
const Deal = loadable((props) => import(/* webpackChunkName: "deal" */'./deal'));

import ComInput from '../common/bipt'
import CNF from '../../config'
import { idAge } from '../../util'
import stl from './index.css'

import CpServer from '../../services/cp';

import { useQuery } from '../common/query';

function Home(props){

  let history = useHistory();
  let init = { templeCardId: "", templeCardNo: "", custIdNo: "" };

  const { query, setQuery, updateField, emptyField, resetField, updateDate } = useQuery(init);

  const readCard = ()=>{

    (async () => {

      try{

        let response =  await CpServer.readCsn()
        let data = await response.json()

        if(data.errcode === "00" && data.csn){

          printValues(data)

          setQuery({//记录读银行卡信息,刷新需要 读银行卡获取的值
            custIdNo: "",
            templeCardId:data.csn,
            templeCardNo:data.facenumber
          })

        } else {
          message.error("读银行卡失败，请重试！")
        }

      }catch(e){
        message.error("读银行卡失败，请求异常")
      }


    })()

  }

  /**
  读银行卡，清空身份证号码，通过芯片号和银行卡号查询
  查询，清空芯片号，通过银行卡号和身份证号查询
  */
  const printValues = (data) => {

    if(data){//读银行卡
      props.hact.infoSt({custIdNo: "", templeCardNo:data.facenumber, templeCardId:data.csn})
    } else if(query.templeCardNo || query.custIdNo) {//查询
      props.hact.infoSt({...query,templeCardId:""})
    } else {
      props.hact.initSt();//初始化store home
      message.error("请输入银行卡号或者证件号查询！");
    }

  };
  /*
  刷新，开通，续费，绑银行卡，退银行卡，修改姓名电话照片调用刷新
  */
  const freshPage = () => {
    history.push("/temple/sail");
    props.hact.infoSt(query);
  }

  /*
  *清空
  */
  const clearPage = () => {
    resetField();
    props.hact.initSt();//初始化store home
  }

  let { info } = props.home;

  //console.log(props)
  /*
    根据info判断按钮显示情况
    cardStatus 1-已办理，2-已过期 3-未办理
    renewFlag 1-可续费 2-不可续费
    dateFlag  1-当前日期允许办理
  */

  //console.log(info)
  return (
    <>
      <div className={stl.detailQy}>
        <label>
          <span>IC银行卡面号：</span>
          <ComInput
            limit={ CNF.IPTLIT.namea }
            prefix={null}
            placeholder={"银行卡面号"}
            value={query.templeCardNo}
            name={ "templeCardNo" }
            clear = { emptyField }
            update={ updateField } />
          <Button type="primary" size={"default"} onClick={ ()=>{  /*清空身份证号码 银行卡号，芯片号*/clearPage(); readCard(); }  } >读银行卡</Button>
        </label>
        <label>
          <span>证件号码：</span>
          <ComInput
            limit={ CNF.IPTLIT.certl }
            prefix={null}
            placeholder={"证件号码"}
            value={ query.custIdNo }
            name={ "custIdNo" }
            clear = { emptyField }
            update={ updateField } />
        </label>
        <Button type="primary" size={"default"} onClick={ ()=>{ printValues() } } >查询</Button>
        <Button onClick={clearPage}>清空</Button>
      </div>
      <Divider />
      <div className={stl.homeDetail}>
        <Detail hAct={props.hact} freshPage={freshPage} detail={ props.home } />
      </div>
    </>
  );

}

export default Home
