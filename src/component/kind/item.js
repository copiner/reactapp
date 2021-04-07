import React, { useState,useEffect } from "react";
import ReactDOM from "react-dom";
import { Button, Select, message } from 'antd';

import ComInput from '../common/bipt'
import BaseSelect from '../common/bslt'
import CodeItem from '../common/code'

import stl from '../common/index.css'

import CNF from '../../config'

import { useQuery } from '../common/query';

function Item(props) {


  let { modifyFlag,cardKindName } = props;

  let init = {
    id:props.id||"",
    cardKindName:props.cardKindName||"",
    busiCost:props.busiCost/100 || "",
    rechargFee: props.rechargFee/100 ||"",
    limitTimes: props.limitTimes||"",
    validYear: props.validYear||"",
    operatorId:"any",
    mobile:"any",
    codeId:"any",
    verifyCode:"any",
    modifyFlag:props.modifyFlag||""
  };

  const { query, setQuery, updateField, emptyField, resetField, updateDate } = useQuery(init);

  useEffect(() => {
    setQuery(init)
  },[props])

  const [code, setCode] = useState(null);
  const [delay, setDelay] = useState(null);//开启定时器，并设置时间 null值暂停计时器

  //操作员电话号码
  const operSelt = (v,o) =>{
    setQuery(prev=>({...prev, mobile:o.mobile}))
  }

  const printValues = e => {
    e.preventDefault();

    if(modifyFlag == "2"){

      if(!query.cardKindName){
        message.warning("请输入银行卡类别名称！")
        return
      }

      if(!query.busiCost){
        message.warning("请输入补办成本！")
        return
      }

      if(!query.rechargFee){
        message.warning("请输入充值费用！")
        return
      }

      if(!query.limitTimes){
        message.warning("请输入每天限次！")
        return
      }

      if(!query.validYear){
        message.warning("请选择有效时长！")
        return
      }

    }

    if(!query.operatorId){
      message.warning("请选择操作员！")
      return
    }

    if(!query.verifyCode){
      message.warning("请输入验证码！")
      return
    }


    //去除验证码校验
    // props.kindupdateSt({
    //     kte:{...query, codeId:code.qrcodeId, busiCost:query.busiCost*100, rechargFee:query.rechargFee*100},
    //     kind:{ pageNum:"1", pageSize:"10" }
    // })

    props.kindupdateSt({
        kte:{...query, busiCost:query.busiCost*100, rechargFee:query.rechargFee*100},
        kind:{ pageNum:"1", pageSize:"10" }
    })

    props.hideModal();
    setDelay(null);
  };


  return (
    <div className={stl.comModal}>
      <div className={stl.lineItem}><i><b>*</b>银行卡类别名称：</i>
        {
          modifyFlag == '3'?
          <i>{cardKindName}</i> :
          <ComInput
            limit={ CNF.IPTLIT.nameb }
            placeholder={"银行卡类别名称"}
            prefix={null}
            value={ query.cardKindName }
            name={ "cardKindName" }
            clear = { emptyField }
            update={ updateField } />
        }
      </div>
      {
        modifyFlag != '3'?
        <>
          <div className={stl.lineItem}><i><b>*</b>补办成本：</i>
          <ComInput
            limit={ CNF.IPTLIT.fee }
            prefix={null}
            placeholder={ "补办成本" }
            name={ "busiCost" }
            value={ query.busiCost }
            clear = { emptyField }
            update={ updateField }/>
          </div>
          <div className={stl.lineItem}><i><b>*</b>充值费：</i>
          <ComInput
            limit={ CNF.IPTLIT.fee }
            prefix={null}
            placeholder={ "充值费" }
            name={ "rechargFee" }
            value={ query.rechargFee }
            clear = { emptyField }
            update={ updateField }/>
          </div>
          <div className={stl.lineItem}><i><b>*</b>每天限次：</i>
          <ComInput
            limit={ CNF.IPTLIT.fee }
            prefix={null}
            placeholder={ "每天限次" }
            name={ "limitTimes" }
            value={ query.limitTimes }
            clear = { emptyField }
            update={ updateField }/>
          </div>
          <div className={stl.lineItem}><i><b>*</b>有效时长：</i>
            <BaseSelect type={ CNF.DICT.validYear } item={ query } setItem={setQuery} name={"validYear"} />
          </div>
        </> : ""
      }
      {/*

      <div className={stl.lineItem}><i><b>*</b>操作员：</i>
        <BaseSelect select={operSelt} type={ CNF.DICT.cardKindOperCode } item={ query } setItem={setQuery} name={"operatorId"} />
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
      <div className={stl.comBtn}>
        <Button onClick={ ()=>{ props.hideModal(); setDelay(null); } } >取消</Button>
        <Button type="primary" onClick={ printValues }>确定</Button>
      </div>
    </div>
  );
}

export default Item;
