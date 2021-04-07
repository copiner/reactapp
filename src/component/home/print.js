import React, { useState,useEffect } from "react";
import ReactDOM from "react-dom";
import { Button, Radio, Select,Modal, message } from 'antd';

import CpServer from '../../services/cp';
import HomeServer from '../../services/home';

import stl from './index.css'
import CNF from '../../config'

import { useQuery } from '../common/query';
import { printMe } from "../../util"

function Print(props) {
  //console.log(props)
  let { info } = props;
  let { custName, custIdNo, photo } = props.info;
  let init = { printReason:"0",channelId:CNF.CHANNEL,custIdNo:"",custName:"" };
  const { query, setQuery, updateField, emptyField, resetField, updateDate } = useQuery(init);

  useEffect(()=>{
    setQuery({
      ...query,
      custName:custName,
      custIdNo:custIdNo,
      photo:photo
    })
  },[props.info])

  const printCard = ()=>{

    if(!custName){
      message.error("无法获取用户姓名，请查询后重试！")
      return;
    }

    if(!custIdNo){
      message.error("无法获取用户证件号码，请查询后重试！")
      return;
    }

    if(!photo){
      message.error("无法获取用户照片，请上传后重试！")
      return;
    }

    (async () => {

      let response =  await CpServer.printStatus()
      let data = await response.json()
      //console.log(data)

      if(data.errcode === "00" && data.status==="0"){

        let params={
          piclocation:"684,60",
          pic:photo,
          wordlocation:"60,100",
          word:{
            name:custName,
            idcard:custIdNo
          }
        }


        let response2 =  await CpServer.printCard(params)//打印银行卡片
        let data2 = await response2.json()

        if(data2.errcode == "00"){

          //关闭打印银行卡片弹窗
          props.hideModal()

          //1.生成打银行卡记录
          HomeServer.homePrintCard(query)


          //2.默认打印小票
          let curr = new Date().Format("yyyy-MM-dd hh:mm:ss");
          let obj = {
            busiType:"打印银行卡片",
            custName:info.custName,
            idTypeName:info.idTypeName,
            custIdNo:info.custIdNo,
            times:curr,
            fee:query.printReason == "2" ? "10":"0"
          }
          let params = printMe(obj)
          CpServer.printReceipt(params)//打印小票

          //3.提示绑银行卡
          Modal.success({
            content: "成功打印银行卡片后，请不要忘记绑银行卡 ",
          });


        } else {
          message.error("打银行卡机异常，请重试！")
        }



      } else {
        message.error("获取打银行卡机状态失败，请稍后重试！")
      }
    })()

  }

  return (
    <div className={stl.printCard}>

      <div className={stl.printInfo}>
        <div className={stl.custInfo}>
          <div className={stl.infoItem}>用户姓名：<span>{custName}</span></div>
          <div className={stl.infoItem}>证件号码：<span>{custIdNo}</span></div>
          <div className={stl.infoItem}>
            <i>选择打印原因：</i>
            <Radio.Group name="printReason" onChange={updateField} value={query.printReason}>
              <Radio value={"0"}>首次打印(免费)</Radio>
              <Radio value={"1"}>质量问题(免费)</Radio>
              <Radio value={"2"}>丢失/损坏(收费10元)</Radio>
            </Radio.Group>
          </div>
        </div>
        <div className={stl.custImg}>
          <img src={"data:image/jpg;base64,"+photo} />
        </div>
      </div>
      <div className={stl.comBtn}>
        <Button  type="primary" onClick={ printCard }>打印银行卡片</Button>
        <Button onClick={ props.hideModal } >取消</Button>
      </div>
    </div>
  );
}

export default Print;
