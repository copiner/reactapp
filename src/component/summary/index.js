/*
  工作统计
*/
import React, { useState, useMemo } from "react";
import { Switch, Route, Link } from 'react-router-dom';
import { DatePicker, Button, Divider,Space,Modal, Radio,message } from 'antd';

import ComInput from '../common/bipt'
import BaseSelect from '../common/bslt'

import ComTable from '../common/table'
import CNF from '../../config'
import stl from '../common/index.css'

import Session from '../../util/session'
import SummaryServer from '../../services/summary';
import { useQuery } from '../common/query';
import { useModalVisible } from '../common/modal';
import { downFileAtFront } from "../../util"

function Summary(props){

  //console.log(props)
  const [way, setWay] = useState({operatorId:"",date:"",payWay:"0"});

  let init = { operatorId: "",departNo:"", startTime:"",endTime:"", pageNum:"1", pageSize:"10", cdate:[] };
  const { query, setQuery, updateField, emptyField, resetField, updateDate } = useQuery(init);

  const { visible, hideModal, openModal } = useModalVisible();

  const popItem = (record) =>{

    setWay({
      ...way,
      operatorId:record.operatorId,
      date:record.createTime.replace(/-/g,""),
    })

    openModal()
  }

  const updateItem = (e)=>{
    setWay({
      ...way,
      payWay:e.target.value
    })
  }

  const handleOk = () =>{

    (async () => {

      const rst =  await SummaryServer.updateList(way)
      if(rst.code == CNF.CODE.suc){
        message.success("编辑成功")
      } else {
        message.error(rst.message)
      }

      hideModal();
      getValues(query);//重新查询

    })()

  }

  const payEnum={"0":"现金","1":"支付宝"}

  const columns = [
    {
      title: "操作日期",
      key: "createTime",
      dataIndex: "createTime"
    },
    {
      title: "操作员编号",
      key: "operatorName",
      dataIndex: "operatorName",
    },
    {
      title: "部门",
      key: "departName",
      dataIndex: "departName",
    },
    {
      title: "渠道编号",
      key: "channelId",
      dataIndex: "channelId",
    },
    {
      title: "开通数量",
      key: "openCnt",
      dataIndex: "openCnt"
    },
    {
      title: "开通金额(元)",
      key: "openFee",
      dataIndex: "openFee",
      render:v=>v?v/100:""
    },
    {
      title: "首次开通张数",
      key: "firstOpenCnt",
      dataIndex: "firstOpenCnt"
    },
    {
      title: "首次打印银行卡数量",
      key: "firstPrintCnt",
      dataIndex: "firstPrintCnt",
    },
    {
      title: "补换银行卡数量",
      key: "changeCnt",
      dataIndex: "changeCnt"
    },
    {
      title: "补换银行卡金额(元)",
      key: "changeFee",
      dataIndex: "changeFee",
      render:v=>v?v/100:""
    },
    {
      title: "退银行卡数量",
      key: "returnCnt",
      dataIndex: "returnCnt"
    },
    {
      title: "退银行卡金额(元)",
      key: "returnFee",
      dataIndex: "returnFee",
      render:v=>v?v/100:""
    },
    {
      title: "总收入(元)",
      key: "totalFee",
      dataIndex: "totalFee",
      render:v=>v?v/100:""
    },
    {
      title: '支付通道',
      key: 'payWay',
      render: (text, record) => {
          return record.departNo == "2"?(
                <Space size="middle">
                  <a onClick={ ()=>{popItem(record)} }>{payEnum[record.payWay]?payEnum[record.payWay]:"编辑"}</a>
                </Space>
              ):""
      }
    }
  ];

  let ele = props.routes;

  const obParams = (data) =>{

    let aOper = ele.some((item, idx)=>{//操作员选择框元素权限
      return (item.status && item.id==CNF.AUTHBTN.oper)
    })

    if(aOper){
      return data;
    } else {//本人的
      let info = Session.getItem("info");
      return {...data,operatorId:info.id }
    }

  }

  /*
  是否有其他操作员工作汇总查询权限，如果没有
  查询本人工作汇总
  */
  const [list, setList] = useState(null);

  const getValues = async (data) => {
      let params = obParams(data);
      const rst =  await SummaryServer.fetchList(params)
      if(rst.code == CNF.CODE.suc){
        setList(rst);
      } else {
        message.error("summary query,error")
      }
  };

  //导出
  const expValues = async (data) => {

      let params = obParams(data);
      const rst =  await SummaryServer.summartExport(params)
      if(rst.code == CNF.CODE.suc){
        if(rst.data.type && rst.data.base64Str){
          downFileAtFront(rst.data.base64Str, "summary", rst.data.type);//下载文件
        }
      } else {
        message.error("summary export,error")
      }
  };

  //查询条件操作员  权限
  let operAuth = ele.some((item)=> item.id==CNF.AUTHBTN.oper && item.status && !item.disable)

  let BaseTable = useMemo(()=><ComTable cln={ columns } query={query} pSt={getValues} sFlag={"summary"} list={list} / >, [list])

  return (
    <>
      <div className={stl.comQuery}>
        <div className={stl.lineItem}>
          {
            operAuth?(
              <>
              <label>操作员：</label>
              <BaseSelect type={ CNF.DICT.allOper } item={ query } setItem={setQuery} name={"operatorId"} />
              </>
            ):""
          }
          <label>部门：</label>
          <BaseSelect type={ CNF.DICT.departType } item={ query } setItem={setQuery} name={"departNo"} />
          <label>操作日期:</label>
          <DatePicker.RangePicker
            inputReadOnly
            format={"YYYYMMDD"}
            value={query.cdate}
            onChange={ updateDate }/>

          <Button type="primary" size={"default"} onClick={ ()=>{ getValues(query); } } >查询</Button>
          <Button onClick={resetField}>清空</Button>
          <Button onClick={ ()=>{ expValues(query) } }>导出列表</Button>
        </div>
      </div>
      <hr />
      {
        BaseTable
      }
      <Modal
        title={"支付通道"}
        visible={visible}
        onOk={handleOk}
        onCancel={hideModal} >
        <div className={stl.comModal}>
          <Radio.Group onChange={(e)=>{updateItem(e)}} defaultValue={"0"}>
            <Radio value={"0"}>现金</Radio>
            <Radio value={"1"}>支付宝</Radio>
          </Radio.Group>
        </div>

      </Modal>
    </>
  );

}

export default Summary
