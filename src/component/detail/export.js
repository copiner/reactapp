import React, { useState,useEffect } from "react";
import ReactDOM from "react-dom";
import { Button, Select, message } from 'antd';

import ComInput from '../common/bipt'
import BaseSelect from '../common/bslt'
import CodeItem from '../common/code'
import stl from '../common/index.css'

import CNF from '../../config'

import { useQuery } from '../common/query';

function ExportItem(props) {

  console.log(props)

  let init = { orderId: "", orderName: "", codeId:"any",verifyCode:"any",operatorId:"any", mobile:"any" };
  const { query, setQuery, updateField, emptyField, resetField, updateDate } = useQuery(init);

  // useEffect(() => {
  //   setQuery(init)
  // },[props.task])

  //二维码验证码
  const [code, setCode] = useState(null);
  const [delay, setDelay] = useState(null);//开启定时器，并设置时间 null值暂停计时器

  //操作员电话号码
  const operSelt = (v,o) =>{
    setQuery(prev=>({...prev, mobile:o.mobile}))
  }

  const printSubmit = e => {
    // if(!query.orderName){
    //   message.warning("请选择任务名称！")
    //   return
    // }

    if(!query.operatorId){
      message.warning("请选择操作员！")
      return
    }

    if(!query.verifyCode){
      message.warning("请输入验证码！")
      return
    }

    //props.detailexportSt({...query,codeId:code.qrcodeId})
    props.detailexportSt({...query})
    props.hideModal();
    setDelay(null);//暂停定时器
    setQuery(init);//初始化
  };

  return (
    <div className={stl.comModal}>
      <div className={stl.lineItem}><i>任务名称：</i>
        <BaseSelect showSearch={true} type={ CNF.DICT.levName } item={ query } setItem={setQuery} name={"orderId"} />
      </div>
      {/*
      <div className={stl.lineItem}><i><b>*</b>操作员：</i>
        <BaseSelect select={operSelt} type={ CNF.DICT.taskOperCode } item={ query } setItem={setQuery} name={"operatorId"} />
      </div>
      <div className={stl.lineItem}>
        <i><b>*</b>操作员手机号：</i>
        <i>{query.mobile}</i>
      </div>
      <div className={stl.lineItem}><i><b>*</b>确认验证码：</i>
      <ComInput
        limit={ CNF.IPTLIT.digit }
        prefix={null}
        placeholder={ "请输入验证码" }
        name={ "verifyCode" }
        value={ query.verifyCode }
        clear = { emptyField }
        update={ updateField }/>
      </div>
      <div className={stl.lineItem}>
        <i></i>
        <CodeItem
          operatorId={query.operatorId}
          code={code}
          setCode={setCode}
          delay={delay}
          setDelay={setDelay} />
      </div>
      */}
      <p className={stl.comBtn}>
        <Button onClick={ ()=>{ props.hideModal(); setDelay(null); setQuery(init); } } >取消</Button>
        <Button type="primary" onClick={ printSubmit }>确定</Button>
      </p>
    </div>
  );
}

export default ExportItem;
