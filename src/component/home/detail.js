import React, { useState, useEffect } from "react";
import { Route, Link, useHistory } from 'react-router-dom';
import { Modal, Radio, Button, message } from 'antd';
import loadable from "@loadable/component";
import moment from 'moment';
import CpServer from '../../services/cp';
import HomeServer from '../../services/home';

import stl from './index.css'
import CNF from '../../config'

import { printMe } from "../../util"

import { useModalVisible } from '../common/modal';

const Record = loadable((props) => import(/* webpackChunkName: "record" */'./record'));
const Print = loadable((props) => import(/* webpackChunkName: "print" */'./print'));
const Deal = loadable((props) => import(/* webpackChunkName: "deal" */'./deal'));

function Detail(props) {

  let history = useHistory();

  let { info, record, one} = props.detail;

  const { visible, hideModal, openModal } = useModalVisible();

  const [bili, setBili] = useState("");

  const bindBound = e =>{
    setBili(e.target.name)

    let curr = moment().format('YYYY-MM-DD HH:mm:ss');

    if(!info.custIdNo){
      message.error("无法获取用户证件号码，请查询后重试！")
      return;
    }

    if(!info.custName){
      message.error("无法获取用户姓名，请查询后重试！")
      return;
    }

    if(e.target.name == "BINDCARD"){//绑银行卡

      (async () => {

        let response =  await CpServer.readCsn()
        let data = await response.json()

        if(data.errcode === "00" && data.csn){

          const cnt =
          <>
            <p>银行卡表面号：{data.facenumber}</p>
            <p>银行卡芯片号：{data.csn}</p>
            <p>证件号：{info.custIdNo}</p>
          </>;

          Modal.confirm({
            title: '是否确定绑定银行卡片！',
            content: cnt,
            onOk() {
              (async () => {
                const rst =  await HomeServer.homeBindCard({
                  custIdNo:info.custIdNo,
                  templeCardNo:data.facenumber,
                  templeCardId:data.csn,
                  channelId:CNF.CHANNEL
                })

                if(rst.code == CNF.CODE.suc){
                  message.success("绑银行卡成功！")
                  props.freshPage() //刷新

                } else{
                  console.error('homeBindCard: '+rst.message)
                }
              })()
            },
            onCancel() {
              console.log('Cancel');
            },
          });


        } else {
          message.error("绑银行卡，读银行卡失败,请放置好银行卡片，重新绑银行卡！" )
        }

      })()

    }

    if(e.target.name == "BACKCARD"){//退银行卡

      (async () => {
        const rst =  await HomeServer.homeBackCardPre({custIdNo:info.custIdNo})

        if(rst.code == CNF.CODE.suc){

          const cnt =
          <>
            <p>姓名：{info.custName}</p>
            <p>证件号：{info.custIdNo}</p>
            <p className={stl.redtips}>开通费用：{rst.data.returnFee?rst.data.returnFee/100:"-"}</p>
            <p className={stl.redtips}>使用总次数：{rst.data.totalTimes}</p>
            <p className={stl.redtips}>今日使用次数：{rst.data.todayTimes}</p>
          </>;

          Modal.confirm({
            title: '是否退银行卡',
            content: cnt,
            onOk() {
              (async () => {
                const rst =  await HomeServer.homeBackCard({
                  custIdNo:info.custIdNo,
                  templeCardNo:"",
                  templeCardId:"",
                  channelId:CNF.CHANNEL
                })

                if(rst.code == CNF.CODE.suc){
                  //message.success("退银行卡成功，应退金额："+rst.data/100);
                  //`退银行卡成功，应退金额：${rst.data/100}`
                  Modal.success({
                    content: `退银行卡成功，应退金额：${rst.data/100}`,
                  });

                  //history.push("/temple/sail")
                  let obj = {
                    busiType:"退银行卡",
                    custName:info.custName,
                    idTypeName:info.idTypeName,
                    custIdNo:info.custIdNo,
                    times:curr,
                    fee:rst.data/100
                  }
                  let params = printMe(obj)
                  CpServer.printReceipt(params)//打印小票

                  //查询，刷新
                  props.freshPage()
                } else {
                  console.error('homeBackCard: '+rst.message)
                }

              })()
            },
            onCancel() {
              console.log('Cancel');
            }
          });

        } else {
          message.success("退银行卡银行卡信息查询失败，"+rst.message)
          return;
        }

      })()

    }

    if(e.target.name == "RECORD"){//业务记录
      props.hAct.recordSt({custIdNo:info.custIdNo,pageNum:"1", pageSize:"10"})
    }

  }

  return (
      <>
        <div className={stl.homeNav}>
            {//已经办理，或者过期，查询业务记录
              info && info.cardStatus && info.cardStatus != '3' ? <a name="RECORD" onClick={ (e)=>{ bindBound(e);openModal(); } }>业务记录</a> : null
            }
            {//已经办理业务 可以做打印银行卡片  绑银行卡 退银行卡
              info && info.cardStatus == '1' && info.dateFlag =="1" ?
              <span>
                <a name="PRINTCARD" onClick={ (e)=>{ bindBound(e);openModal(); } }>打印银行卡片</a>
                <a name="BINDCARD" onClick={ bindBound }>绑银行卡</a>
                <a name="BACKCARD" onClick={ bindBound }>退银行卡</a>
              </span>
               : null
            }
          </div>
          <hr />
          <div className={ stl.homeCont }>
            {
              info && info.cardStatus ? (
                <Deal freshPage={props.freshPage} cust={info} card={one} hAct={props.hAct}/>
              ) : ""
            }
          </div>
          {/*业务记录modal*/}
          <Modal
            title={bili == "PRINTCARD"?"用户打印银行卡片":"用户业务记录"}
            visible={visible}
            width={ "860px" }
            footer={null}
            onCancel={hideModal} >
            {
              bili == "PRINTCARD"?
              <Print info={info} hideModal={hideModal} hAct={props.hAct} />:
              <Record info={info} list={record} hAct={props.hAct} />
            }
          </Modal>
      </>
    );
}

export default Detail;
