import React, { useState,useEffect } from "react";
import ReactDOM from "react-dom";
import { Upload, Button, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import ComInput from '../common/bipt'
import BaseSelect from '../common/bslt'
/*
去除二维码
*/
//import CodeItem from '../common/code'
import stl from '../common/index.css'

import CNF from '../../config'
import Session from '../../util/session'
import KindServer from '../../services/kind';

import { useQuery } from '../common/query';

function CreateItem(props) {

  console.log(props)

  let init = { orderName: "",cardType: "", codeId:"any",verifyCode:"any",operatorId:"any", mobile:"any" };
  const { query, setQuery, updateField, emptyField, resetField, updateDate } = useQuery(init);

  /**
  上传文件，更新用户数量
  */
  const [filed, setFiled] = useState([]);
  /**
  e : {file: {},fileList: [],event: {}}
  antd选择后的文件file是经过包装的数据，
  添加到formData时需要取file.originFileObj
  */
  const handleChange = e => {
    setFiled(e.fileList.slice(-1))
  }
  useEffect(()=>{

    if(filed && filed.length > 0){
      const formData = new FormData();
      formData.append('fileName', filed[0].originFileObj);
      formData.append('openId', Session.getItem("openId"));
      props.taskAct.taskuploadSt(formData);
    } else {
      props.taskAct.taskuploadSt();
    }

  },[filed])

  /**
  银行卡类型切换，更新办银行卡费用，有效期
  */
  const [kind, setKind] = useState(null);
  useEffect(() => {
    //获取初始化状态， 默认银行卡类型（续费即为原银行卡类型的办银行卡费用）的办银行卡费用，有效期
    if(query.cardType){

      (async () => {
        const rst =  await KindServer.kindOneInfo({cardKind:query.cardType})
        if(rst.code == CNF.CODE.suc){
          setKind(rst.data);
        } else {
          message.error("onekind,error,"+query.cardType)
        }
      })()

    }

  }, [query.cardType]);


  //二维码验证码
  const [code, setCode] = useState(null);
  const [delay, setDelay] = useState(null);//开启定时器，并设置时间 null值暂停计时器

  //操作员电话号码
  const operSelt = (v,o) =>{
    setQuery(prev=>({...prev, mobile:o.mobile}))
  }


  const printSubmit = e => {
    e.preventDefault();

    if(!query.operatorId){
      message.warning("请选择操作员！")
      return
    }

    if(!query.verifyCode){
      message.warning("请输入验证码！")
      return
    }

    if(props.task && props.task.action == '1'){//新增

      if(!query.orderName){
        message.warning("请输入任务名称！")
        return
      }

      if(!query.cardType){
        message.warning("请选择银行卡类型！")
        return
      }

      if(filed.length == '0'){
        message.warning("请上传文件！")
        return;
      }

      const formData = new FormData();
      formData.append('fileName', filed[0].originFileObj);
      formData.append('openId', Session.getItem("openId"));
      formData.append('orderName', query.orderName);
      formData.append('cardType', query.cardType);
      //formData.append('codeId', code.qrcodeId);//删除权限校验
      formData.append('operatorId', query.operatorId);
      formData.append('verifyCode', query.verifyCode);

      props.taskAct.tasksubmitSt(formData)

    } else {//导出明细
      //删除权限校验
      //props.taskAct.taskexportSt({...query, codeId:code.qrcodeId, orderId:props.task.orderId})
      props.taskAct.taskexportSt({...query, orderId:props.task.orderId})
    }

    //resetData();
  };

  useEffect(()=>{//关闭弹窗
    if(props.succ){
      resetData();
    }
  },[props.succ])

  const resetData = ()=>{
    props.hideModal();
    setDelay(null);
    setCode(null);
    setQuery(init);//初始化
    setKind(null);
    setFiled([]);
  }

  const loadExfile = () =>{
    window.location.href = SERVICE_URL + CNF.TASKTMP;
  }

  return (
    <div className={stl.comModal}>
    {props.task && props.task.action == '1' ?
      <>
        <p className={stl.redText}>注：团购不打印IC银行卡，如有需要请持有效证件到园区打印绑银行卡</p>
        <div className={stl.lineItem}><i><b>*</b>任务名称：</i>
          <ComInput
            limit={ CNF.IPTLIT.nameb }
            placeholder={"任务名称"}
            prefix={null}
            value={ query.orderName }
            name={ "orderName" }
            clear = { emptyField }
            update={ updateField } />
        </div>
        <div className={stl.lineItem}><i><b>*</b>银行卡类型：</i>
          <BaseSelect type={ CNF.DICT.cardKind } item={ query } setItem={setQuery} name={"cardType"} />
        </div>
        <div className={stl.lineItem}><i><b>*</b>上传用户名单</i>
        <Upload
          name={'fileName'}
          fileList = {filed}
          beforeUpload={()=>false}
          onChange={handleChange}
          // onRemove={filedRemove}
          >
          <Button>
            <UploadOutlined /> 点击上传文件
          </Button>
        </Upload>
        <span><i></i>一次办理数量不超过1000条，点击<a onClick={loadExfile}>下载模板</a></span>
        </div>
        <div className={stl.lineItem}>
          <i><b>*</b>用户数量：</i>
          <i>{props.upload.custCnt}</i>
        </div>
        <div className={stl.lineItem}>
          <i><b>*</b>有效期：</i>
          <i>{kind && kind.validDate ? kind.validDate : "-"}</i>
        </div>
        <div className={stl.lineItem}>
          <i><b>*</b>单价(元)：</i>
          <i>{kind && kind.fee ? kind.fee/100 : "-"}</i>
        </div>
        <div className={stl.lineItem}>
          <i><b>*</b>总金额(元)：</i>
          <i>{props.upload.custCnt && kind && kind.fee ? props.upload.custCnt*kind.fee/100 : "-"}</i>
        </div>
        <div className={stl.lineItem}><i>备注：</i>
          <ComInput
            limit={ CNF.IPTLIT.remark }
            placeholder={"备注"}
            prefix={null}
            value={ query.remark }
            name={ "remark" }
            clear = { emptyField }
            update={ updateField } />
        </div>
      </> :
      <>
        <div className={stl.lineItem}>
          <i>团购任务id：</i>
          <i>{props.task.orderId}</i>
        </div>
        <div className={stl.lineItem}>
          <i>团购任务名称：</i>
          <i>{props.task.orderName}</i>
        </div>
      </>
      }
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
        <Button onClick={ resetData } >取消</Button>
        <Button type="primary" onClick={ printSubmit }>确定</Button>
      </p>
    </div>
  );
}

export default CreateItem;
