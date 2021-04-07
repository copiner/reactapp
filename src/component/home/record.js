import React, { useState, useEffect,useMemo } from 'react';
import { Table, Button, Divider,Space,Modal, message  } from 'antd';

import ComTable from '../common/table'
import CNF from '../../config'
import { printMe } from "../../util"
import CpServer from '../../services/cp';

const Record = (props) => {
  // console.log(props)

  const recordItem = (record) =>{

      //console.log(record)
      let obj = {
        busiType:record.busiType,
        custName:record.custName,
        idTypeName:record.idTypeName,
        custIdNo:record.custIdNo,
        times:record.oprTime,
        validDate:record.busiTypeCode == CNF.BUSITYPE.open ? record.validEndDate:"",
        facenum:record.templeCardNo,
        fee:record.fee/100
      }
      let params = printMe(obj)
      //console.log(params)
      CpServer.printReceipt(params)//打印小票
  }

  const columns = [
    {
      title: "用户姓名",
      key: "custName",
      dataIndex: "custName"
    },
    {
      title: "业务操作类型",
      key: "busiType",
      dataIndex: "busiType"
    },
    {
      title: "银行卡类别",
      key: "cardKind",
      dataIndex: "cardKind"
    },
    {
      title: "费用(元)",
      key: "fee",
      dataIndex: "fee",
      render: fee => (fee ? fee/100 : "-")
    },
    {
      title: "办理渠道",
      key: "channel",
      dataIndex: "channel"
    },
    {
      title: "操作员",
      key: "operator",
      dataIndex: "operator"
    },
    {
      title: "操作日期",
      key: "oprTime",
      dataIndex: "oprTime"
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => recordItem(record)}>补打小票</a>
        </Space>
      )
    }
  ];

  /**
  固定规则
  props  {query cln pSt list}
  */
  let { list,info } = props;

  let BaseTable = useMemo(
    ()=> <ComTable
          cln={ columns }
          query={{custIdNo:info.custIdNo}}
          pSt={props.hAct.recordSt}
          list={list} / >
    , [list])

  // useEffect(() => {
  //   props.hAct.recordSt({custIdNo:info.custIdNo,pageNum:"1", pageSize:"10"})
  // },[info.custIdNo]);


  return (
    <>
      { BaseTable }
    </>
  );

};

export default Record
