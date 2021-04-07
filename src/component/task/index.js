/*
团购任务
*/
import React, { useState,useEffect,useMemo } from 'react'
import { DatePicker, Button, Input, Divider, Modal,Space, message  } from 'antd';

import ComTable from '../common/table'
import ComInput from '../common/bipt'
import BaseSelect from '../common/bslt'
import CNF from '../../config'
import stl from '../common/index.css'

import { useQuery } from '../common/query';
import { useModalVisible } from '../common/modal';

import CreateItem from "./create";
import Commence from "./commence";


function Task(props) {

  // console.log(props)
  const { visible, hideModal, openModal } = useModalVisible();

  let init = { orderName: "",cardType: "", operatorId:"", cdate:[], startTime:"",endTime:"", pageNum:"1", pageSize:"10" };
  const { query, setQuery, updateField, emptyField, resetField, updateDate } = useQuery(init);


  const printValues = e => {
    e.preventDefault();
    props.taskAct.taskSt(query)
  };

  const [flag, setFlag] = useState({action:"1"});//初始化

  const actItem = (action, record) =>{
      if(action == '2'){//查看明细
        props.taskAct.taskdetailSt({ orderId:record.orderId, pageNum:"1", pageSize:"10"})
      }
      //console.log(record)
      let tmp = record || {}
      tmp.action = action;
      setFlag(tmp);
      openModal()
  }

  useEffect(()=>{//更新 刷新
    if(props.taskList.succ){
      props.taskAct.taskSt(query)
    }
  },[props.taskList.succ])

  const columns = [
    // {
    //   title: "团购id",
    //   key: "orderId",
    //   dataIndex: "orderId"
    // },
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
      title: "成功办理数量",
      key: "succCnt",
      dataIndex: "succCnt"
    },
    {
      title: "单价(元)",
      key: "singleAmt",
      dataIndex: "singleAmt",
      render:v=> v ? v/100 : "-"
    },
    {
      title: "成功办理金额(元)",
      key: "expectAmount",
      dataIndex: "expectAmount",
      render:v=> v ? v/100 : "-"
    },
    {
      title: "操作员姓名",
      key: "operatorName",
      dataIndex: "operatorName"
    },
    {
      title: "操作员手机号",
      key: "mobile",
      dataIndex: "mobile"
    },
    {
      title: "创建时间",
      key: "createTime",
      dataIndex: "createTime"
    },
    {
      title: "订单状态",
      key: "status",
      dataIndex: "status"
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => actItem("2",record)}>查看结果</a>
          <a onClick={() => actItem("3",record)}>导出明细</a>
        </Space>
      )
    }
  ];
  const titleEnum = {"1":"创建团购任务","2":"查看任务结果","3":"导出团购明细"}

  let { list } = props.taskList;

  let BaseTable = useMemo(()=><ComTable cln={ columns } query={query} pSt={props.taskAct.taskSt} list={list} / >, [list])

  return (
    <>
      <div className={stl.comQuery}>
        <div className={stl.lineItem}>
          <label>
            <span>任务名称：</span>
            <ComInput
              limit={ CNF.IPTLIT.nameb }
              prefix={null}
              placeholder={"任务名称"}
              value={ query.orderName }
              name={ "orderName" }
              clear = { emptyField }
              update={ updateField } />
          </label>
          <label>银行卡类别：</label>
          <BaseSelect type={ CNF.DICT.cardKind } item={ query } setItem={setQuery} name={"cardType"} />

          <label>操作员：</label>
          <BaseSelect type={ CNF.DICT.allOper } item={ query } setItem={setQuery} name={"operatorId"} />
        </div>
        <div className={stl.lineItem}>
          <label>创建日期:</label>
          <DatePicker.RangePicker
            inputReadOnly
            format={"YYYYMMDD"}
            value={query.cdate}
            onChange={ updateDate }/>

          <Button type="primary" size={"default"} onClick={ printValues } >查询</Button>
          <Button onClick={resetField}>清空</Button>
          <Button size={"default"} onClick={ () => { actItem("1") } } >创建任务</Button>
        </div>
      </div>
      <hr />
      { /*性能优化  类似 shouldComponentUpdate 生命周期，优化组件是否渲染 */
        /*<ComTable cln={ columns } loading={props.loading} data={data}/>*/
        BaseTable
      }
      <Modal
        visible={visible}
        title={titleEnum[flag.action]}
        footer={null}
        // closable={true}
        width={flag && flag.action=="2" ? "920px" : "520px"}
        onCancel={hideModal} >
        {
          /*modal*/
          flag && flag.action=="2" ?
          <Commence
            task={flag}
            taskAct={props.taskAct}
            list={props.taskList.detail}
            hideModal={hideModal} /> :
          <CreateItem
            task={flag}
            succ={props.taskList.succ}
            upload={props.taskList.upload}
            taskAct={props.taskAct}
            hideModal={hideModal} />
        }
      </Modal>
    </>
  );
}

export default Task;
