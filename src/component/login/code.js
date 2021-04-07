/*
  二维码逻辑组件
*/
import React, { useState, useEffect } from "react";
// import { Input, Button, Tabs, message } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useInterval } from '../common/counter';

import QRCode from 'qrcode.react';
import cde from "./cde.png"

function CodeItem(props) {
  //console.log(props)
  let { qrcodeId, qrcode, invaildSec } = props.code;

  let { delay, setDelay } = props;

  //const [delay, setDelay] = useState(null);//开启定时器，并设置时间 null值暂停计时器

  useEffect(() => {
    if(delay){
      props.codeSt();
    }
  }, [delay]);

  let t = 0;
  useInterval(()=>{
    console.log(t)
    props.codescanSt(qrcodeId)

    t = t+3;
    if(t > parseInt(invaildSec)){
      setDelay(null);
      //TODO二维码失效样式
    }

  }, delay)

  const refreshCode = () => {
      setDelay(3000);
      props.codeSt(qrcodeId);
  }

  console.log(delay)
  return (
    <>

    {
      delay ?
      <QRCode size={256} value={qrcode} />:
      <img onClick={refreshCode} src={cde} />
    }

    <span><a>二维码有效时间{ invaildSec ? invaildSec/60 : "3" }分钟</a></span>
    </>
  )

}

export default CodeItem;
