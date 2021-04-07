import React, { useState,useMemo } from "react";
import { Switch, Route, Link } from 'react-router-dom';
import { Button, Divider, Modal, message } from 'antd';

import ComTable from '../common/table'

import stl from '../common/index.css'

function Commence(props){

  console.log(props)

  const columns = [
    {
      title: "序号",
      key: "id",
      dataIndex: "id",
      render:(text, record, index) => { return index + 1 }
    },
    {
      title: "团购任务名称",
      key: "orderName",
      dataIndex: "orderName"
    },
    {
      title: "银行卡类别",
      key: "cardType",
      dataIndex: "cardType"
    },
    {
      title: "用户姓名",
      key: "custName",
      dataIndex: "custName"
    },
    {
      title: "证件类型",
      key: "idType",
      dataIndex: "idType"
    },
    {
      title: "证件号",
      key: "idNo",
      dataIndex: "idNo"
    },
    {
      title: "手机号",
      key: "mobile",
      dataIndex: "mobile"
    },
    {
      title: "状态",
      key: "status",
      dataIndex: "status"
    },
    {
      title: "失败原因",
      key: "remark",
      dataIndex: "remark"
    }
  ];

  let  { list }  = props;

  let BaseTable = useMemo(()=>
  <ComTable cln={ columns }
    query={{ orderId:props.task.orderId, pageNum:"1", pageSize:"10"}}
    pSt={props.taskAct.taskdetailSt}
    list={list} / >
  , [list])

  const handleOpen = ()=>{
    let num = list && list.data[0] && list.data[0].vSucc ? list.data[0].vSucc : "0";
    if(num > 0){

      Modal.confirm({
        content: `确认批量开通${num}张年票`,
        onOk() {
          props.taskAct.taskopenSt({orderId:props.task.orderId})
        },
        onCancel() {
          console.log('Cancel');
        },
      });


    } else {
      message.error("未有校验成功的用户，无法批量开通")
    }

  }

  return (
    <>
      <Button size={"default"} onClick={ handleOpen } >批量开通</Button>
      <span>
        校验成功(位)<span>{" "}{list && list.data[0] && list.data[0].vSucc ? list.data[0].vSucc : "0"}{" "}</span>
        校验失败(位)<span>{" "}{list && list.data[0] && list.data[0].vFail ? list.data[0].vFail : "0"}{" "}</span>
      </span>
      {
        BaseTable
      }
    </>
  );

}

export default Commence
