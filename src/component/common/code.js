/*
  二维码逻辑组件
*/
import React, { useState, useEffect } from "react";
import { Input, Button, Tabs, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import CodeServer from '../../services/code';
import stl from './index.css'

import { useInterval } from './counter';

import QRCode from 'qrcode.react';
import CNF from '../../config'

function CodeItem(props) {
  //console.log(props)
  let { delay, setDelay, operatorId, code, setCode } = props;//开启定时器，并设置时间 null值暂停计时器


  let t = 0;
  useInterval(()=>{

    t++;
    if(t > parseInt(code.invaildSec)){
      setDelay(null);//暂停计时器
    }
  }, delay)

  useEffect(() => {

    refreshCode()

    return ()=>{
      setDelay(null);//暂停计时器
    }
  }, [operatorId]);


  const refreshCode = () => {

    if(!operatorId){
      setDelay(null)
      return false;
    }

    (async () => {

      let id = code && code.qrcodeId ? code.qrcodeId : "";
      const rst =  await CodeServer.fetchCode({userId:operatorId,oriId:id})
      if(rst.code == CNF.CODE.suc){
        setCode(rst.data);
        setDelay(1000)
      } else {
        message.error("code,error,"+id)
      }
      //console.log(rst.data)
    })()

  }

  return (
    <>
    <div className={stl.codeBox}>
      <p><QRCode size={128} value={code && code.qrcode ? code.qrcode : "" } /></p>
      <p><span><a onClick={ refreshCode }>点击刷新</a></span></p>
      <p>注：操作员扫码获取验证码，有效期{code&&code.invaildSec?code.invaildSec/60 : "5"}分钟。</p>
    </div>
    </>
  )

}

export default CodeItem;
