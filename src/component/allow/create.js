import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Button,Select,Modal, message } from 'antd';

import ComInput from '../common/bipt'
import BaseSelect from '../common/bslt'
import stl from '../common/index.css'
import temppic from "../common/photo.png"

import { useQuery } from '../common/query';
import { useModalVisible } from '../common/modal';
import CNF from '../../config'

import Gpy from '../common/gaopy'

function CreateForm(props) {
  //console.log(props)
  let init = { custName: "",custIdNo: "", mobile: "", idType:"01", photo:"", remark:"", modifyFlag:"1" };
  const { query, setQuery, updateField, emptyField, resetField, updateDate } = useQuery(init);

  const { visible, hideModal, openModal } = useModalVisible();
  const printValues = e => {
    e.preventDefault();
    if(!query.custName){
      message.warning("请输入姓名！")
      return
    }

    if(!query.custIdNo){
      message.warning("请输入证件号！")
      return
    }

    // if(!query.mobile){
    //   message.warning("请输入手机号！")
    //   return
    // }

    if(!query.idType){
      message.warning("请输入证件类型！")
      return
    }

    if(!query.photo){
      message.warning("请上传照片！")
      return
    }

    props.allowAct.allowupdateSt(query)
    //props.hideModal();
    //setQuery(init);
    //清空
  };

  useEffect(()=>{//关闭弹窗 更新 刷新 清空
    if(props.succ){
      props.hideModal();
      setQuery(init);
      //props.allowAct.allowSt(props.query)//查询刷新
      //console.log('------------------')
    }
  },[props.succ])

  return (
    <div className={stl.comModal}>
      <div className={stl.lineItem}>
      <i><b>*</b>姓名：</i>
      <ComInput
        limit={ CNF.IPTLIT.nameb }
        placeholder={"姓名"}
        prefix={null}
        value={query.custName}
        name={ "custName" }
        clear = { emptyField }
        update={ updateField } />
      </div>
      <div className={stl.lineItem}><i><b></b>手机号：</i>
      <ComInput
        limit={ CNF.IPTLIT.mobile }
        prefix={null}
        placeholder={ "手机号" }
        name={ "mobile" }
        value={ query.mobile }
        clear = { emptyField }
        update={updateField}/>
      </div>
      <div className={stl.lineItem}><i><b>*</b>证件号：</i>
      <ComInput
        limit={ CNF.IPTLIT.namea }
        prefix={null}
        placeholder={ "证件号" }
        name={ "custIdNo" }
        value={ query.custIdNo }
        clear = { emptyField }
        update={ updateField }/>
      </div>
      <div className={stl.lineItem}><i><b>*</b>证件类型：</i>
        <BaseSelect type={ CNF.DICT.idType } item={ query } setItem={setQuery} name={"idType"} />
      </div>
      <div className={stl.lineItem}><i><b>*</b>头像：</i>
        <img src={query.photo? "data:image/png;base64,"+query.photo : temppic} alt="点击裁切上传头像" className={stl.uIcon} onClick={openModal} />
      </div>
      <div className={stl.lineItem}><i>备注：</i>
      <ComInput
        limit={ CNF.IPTLIT.remark }
        prefix={null}
        placeholder={ "备注" }
        name={ "remark" }
        value={ query.remark }
        clear = { emptyField }
        update={ updateField }/>
      </div>
      <p className={stl.comBtn}>
        <Button onClick={ ()=>{ props.hideModal();setQuery(init); } } >取消</Button>
        <Button type="primary" onClick={ printValues }>确定</Button>
      </p>

      <Modal
        visible={visible}
        width={"860px"}
        maskClosable={false}
        footer={null}
        closable={false}
        onCancel={hideModal} >
        <Gpy visible={visible} hideModal={hideModal} pto={query} setPto={setQuery} />
      </Modal>
    </div>
  );
}

export default CreateForm;
