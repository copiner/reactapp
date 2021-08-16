/*
  开通 续费
*/
import React, { useState,useEffect } from 'react';
import { Radio, Button,Select, Input, Modal, message  } from 'antd';
import moment from 'moment';

import ComInput from '../common/bipt'
import BaseSelect from '../common/bslt'
import stl from './index.css'
import temppic from "../common/photo.png"

import CNF from '../../config'
import Gpy from '../common/gaopy'
import CpServer from '../../services/cp';
import HomeServer from '../../services/home';

import { useModalVisible } from '../common/modal';
import { printMe, idAge, after70y } from "../../util"

function Deal(props) {

  let { cust } = props;
  let { cardStatus, renewFlag }  = cust;
  let cardKind = props.cust.cardKind ? props.cust.cardKind : CNF.DICT.defaultCard; //默认银行卡类型1
  let idType = props.cust.idType ? props.cust.idType : CNF.DICT.defaultIdType; //默认证件类型01

  let initatom = { idType:idType, custIdNo:"", custName: "", sex: "", mobile:"", cardKind:cardKind, photo: "",channelId:CNF.CHANNEL,firstFlag:`${cardStatus=='3'?"0":"1"}` };

  const [info, setInfo] = useState(initatom);

  const { visible, hideModal, openModal } = useModalVisible();
  //初始值
  useEffect(() => {

    setInfo({
      ...info,
      custIdNo: cust && cust.custIdNo ? cust.custIdNo : "",
      custName: cust && cust.custName ? cust.custName : "",
      mobile: cust && cust.mobile ? cust.mobile : "",
      photo: cust && cust.photo ? cust.photo : "",
      sex: cust && cust.sex ? cust.sex : ""
    });

  }, [cust, cust.custIdNo]);

  const updateField = e => {

    setInfo({
      ...info,
      [e.target.name]: e.target.value
    });

  };

  const emptyField = e => {
    setInfo({
      ...info,
      [e.target.name]: ''
    });
  };

  useEffect(() => {
    //获取初始化状态， 默认银行卡类型（续费即为原银行卡类型的办银行卡费用）的办银行卡费用，有效期
    //银行卡类型切换，更新数据
    if(info.cardKind){
      props.hAct.onecardSt({cardKind:info.cardKind})
    }

  }, [info.cardKind]);

  //截止日期内用户满70岁，满70岁，进行提示
  //props.card.validDate
  useEffect(() => {
    //console.log(props.card.validDate)

    if(info.idType == CNF.DICT.defaultIdType && info.custIdNo && props.card.validDate){
      let age = idAge(info.custIdNo);
      let after70b = after70y(info.custIdNo);
      //console.log(age)
      if(age >= 70){
          Modal.success({
            title: '温馨提醒！',
            content: "该客户已经年满70岁！",
          });
      }

      if(age < 70 && after70b < props.card.validDate){
          Modal.success({
            title: '温馨提醒！',
            content: "该客户即将年满70周岁，确定办理！",
          });
      }

    }
  }, [props.card]);

  const ocCard = () =>{

    if(cardStatus == "3"){
      if(!info.sex){
        message.error("请选择性别！")
        return
      }
    }

    if(!info.cardKind){
      message.error("请选择银行卡类别！")
      return
    }

    (async () => {

      const rst =  await HomeServer.homeOccard(info)
      if(rst.code == CNF.CODE.suc){

          message.success('办理成功！', 5);
          let validDate = props.card.validDate.length==8?props.card.validDate.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3"):props.card.validDate;
          let curr = moment().format('YYYY-MM-DD HH:mm:ss');
          let obj = {
            busiType:"开通续费",
            custName:info.custName,
            idTypeName:CNF.IDTYPE[info.idType],
            custIdNo:info.custIdNo,
            validDate:validDate,
            times:curr,
            fee:props.card.fee ? props.card.fee/100 : "0"
          }
          let params = printMe(obj)

          CpServer.printReceipt(params)//打印小票

          //刷新页面
          props.freshPage()

      } else {
        console.error('homeOccard: '+rst.message)
      }

    })()


  }
  //修改用户信息
  //props.hAct.updateinfoSt({...info, modifyFlag: e.target.name})

  const [localvisible, setLocalvisible] = useState(false);
  const [mod, setMod] = useState("");
  const modInfo = (stamp) =>{
    setMod(stamp)
    if(stamp == "mobile"){
      setLocalvisible(true)
    }

    if(stamp == "custName"){
      setLocalvisible(true)
    }

    if(stamp == "photo"){
      openModal()
    }
  }

  const handleMod = () => {
    setLocalvisible(false);
    props.hAct.updateinfoSt({...info, modifyFlag: mod})
  };

  return (
    <div className={stl.deal}>
      <div className={stl.infoDeal}>
        <div className={stl.lineItem}>
          <i>证件类型：</i>
          {
            cardStatus == "3" ?
            <BaseSelect type={ CNF.DICT.idType } item={ info } setItem={setInfo} name={"idType"} />:
            props.cust.idTypeName
          }
        </div>
        <div className={stl.lineItem}>
          <i>姓名：</i>
          <span className={stl.wItem}>{props.cust.custName}</span>
          {cardStatus!="3"?<a onClick={()=>modInfo("custName")}>修改</a>:null}
        </div>
        <div className={stl.lineItem}>
        <i>证件号码：</i>
        <span className={stl.wItem}>
          {props.cust.custIdNo}
        </span>
        </div>
        <div className={stl.lineItem}>
          <i>性别：</i>
          {
            cardStatus == "3" ?
            <Radio.Group name="sex" onChange={updateField} value={info.sex}>
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </Radio.Group>:
            ( props.cust.sex == '1'?"男":(props.cust.sex == '2'?"女":"") )
          }
        </div>
        <div className={stl.lineItem}>
          <i>手机号：</i>
          {
            cardStatus == "3" ?
            <span className={stl.iptItem}>
              <ComInput
                limit={ CNF.IPTLIT.mobile }
                prefix={null}
                placeholder={"手机号"}
                value={info.mobile}
                maxLength={11}
                name={ "mobile" }
                clear = { emptyField }
                update={ updateField } />
            </span>:
            <span className={stl.wItem}>{props.cust.mobile}</span>
          }
          {cardStatus!="3"?<a onClick={()=>modInfo("mobile")}>修改</a>:null}
        </div>
        <p><i></i><span className={stl.dealRemark}> {"绑定手机号可享受手机刷码入寺院"}</span></p>
        <div className={stl.lineItem}>
          <i>银行卡类型：</i>
          <BaseSelect type={ CNF.DICT.cardKind } params={{checkFlag:"1"}} item={ info } setItem={setInfo} name={"cardKind"} />
        </div>
        <div className={stl.lineItem}>
          <i>当前有效期：</i>
          <span>{cardStatus=="3"?"00000000":props.cust.validDate}</span>
        </div>
        <div className={stl.lineItem}>
          <i>新有效期：</i>
          <span>{props.card.validDate}</span>
        </div>
        <div className={stl.lineItem}>
          <i>办银行卡费用(元)：</i>
          <span>{props.card.fee?props.card.fee/100:""}</span>
        </div>
        <div className={stl.cBtn}>
        {renewFlag=="1"?<Button onClick={ocCard} type="primary">续费</Button>:null}
        {cardStatus=="3"?<Button onClick={ocCard} type="primary">开通</Button>:null}
        </div>
      </div>

      <div className={stl.pic}>
        <div className={stl.photo}>
          <img src={info.photo ? "data:image/jpg;base64,"+info.photo : temppic} alt="暂无照片" />
        </div>
        <div className={stl.photoSit}><a onClick={()=>modInfo("photo")}>修改照片</a></div>
      </div>
      <Modal
        visible={visible}
        width={"860px"}
        maskClosable={false}
        footer={null}
        closable={false}
        onCancel={hideModal} >
        <Gpy visible={visible} hideModal={hideModal} pto={info} setPto={setInfo} />
      </Modal>
      <Modal
        visible={localvisible}
        width={"360px"}
        title={mod=="mobile" ? "用户手机号修改":"用户姓名修改"}
        maskClosable={false}
        closable={false}
        onOk={handleMod}
        onCancel={()=>setLocalvisible(false)} >
        {
          mod == "mobile" ?
          <ComInput
            limit={ CNF.IPTLIT.mobile }
            prefix={null}
            placeholder={"手机号"}
            value={info.mobile}
            maxLength={11}
            name={ "mobile" }
            clear = { emptyField }
            update={ updateField } />:
          <ComInput
            limit={ CNF.IPTLIT.nameb }
            prefix={null}
            placeholder={"姓名"}
            value={info.custName}
            name={ "custName" }
            clear = { emptyField }
            update={ updateField } />
        }
      </Modal>
    </div>
  );
}

export default Deal
