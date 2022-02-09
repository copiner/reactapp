/*
白名单
*/
import React, { useState,useEffect,useMemo } from 'react';
import { DatePicker, Button, Input, Space,Modal, message  } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import Create from './create'
import ComTable from '../common/table'
import ComInput from '../common/bipt'
import CNF from '../../config'

import { useQuery } from '../common/query';
import { useModalVisible } from '../common/modal';

import stl from '../common/index.css'

function Allowed(props) {
  console.log(props)
  const { visible, hideModal, openModal } = useModalVisible();

  let init = { custName: "",custIdNo: "", mobile: "", cdate:[] ,startTime:"",endTime:"", pageNum:"1", pageSize:"10" };
  const { query, setQuery, updateField, emptyField, resetField, updateDate } = useQuery(init);


  const handleDel = (record) => {
    // console.log(record)
    // console.log({custIdNo:record.custIdNo, modifyFlag:"3"})
    Modal.confirm({
      content: `确认删除证件号为${record.custIdNo}的用户`,
      onOk() {
        props.allowAct.allowupdateSt({custIdNo:record.custIdNo, modifyFlag:"3"})
      },
      onCancel() {
        console.log('Cancel');
      },
    });

  };

  const columns = [
    {
      title: "序号",
      key: "id",
      dataIndex: "id",
      render:(text, record, index) => { return index + 1 }
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
      title: "证件号码",
      key: "custIdNo",
      dataIndex: "custIdNo"
    },
    {
      title: "用户手机号",
      key: "mobile",
      dataIndex: "mobile"
    },
    {
      title: "备注",
      key: "remark",
      dataIndex: "remark"
    },
    {
      title: "操作员手机号",
      key: "operatorMobile",
      dataIndex: "operatorMobile"
    },
    {
      title: "创建时间",
      key: "createTime",
      dataIndex: "createTime"
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handleDel(record)}>删除</a>
        </Space>
      ),
    }
  ];
  let { list } = props.allowList;

  let BaseTable = useMemo(()=><ComTable cln={ columns } query={query} pSt={props.allowAct.allowSt} list={list} / >, [list])

  const queryValues = e => {
    e.preventDefault();
    props.allowAct.allowSt(query)
  };

  useEffect(()=>{//更新 刷新
    if(props.allowList.succ){
      props.allowAct.allowSt(query)
    }
  },[props.allowList.succ])


  return (
      <div className={stl.comQuery}>
        <div className={stl.lineItem}>
          <label>用户姓名:</label>
          <ComInput
            limit={ CNF.IPTLIT.nameb }
            prefix={null}
            placeholder={"用户姓名"}
            value={query.custName}
            name={ "custName" }
            clear = { emptyField }
            update={ updateField } />
          <label>证件号码:</label>
          <ComInput
            limit={ CNF.IPTLIT.certl }
            prefix={null}
            placeholder={"证件号码"}
            value={query.custIdNo}
            name={ "custIdNo" }
            clear = { emptyField }
            update={ updateField } />
          <label>手机号码:</label>
          <ComInput
            limit={ CNF.IPTLIT.mobile }
            prefix={null}
            placeholder={"手机号"}
            value={query.mobile}
            name={ "mobile" }
            clear = { emptyField }
            update={ updateField } />
        </div>
        <div className={stl.lineItem}>

          <label>创建日期:</label>
          <DatePicker.RangePicker
            inputReadOnly
            format={"YYYYMMDD"}
            value={query.cdate}
            onChange={ updateDate }/>

          <Button type="primary" size={"default"} onClick={ queryValues } >查询</Button>
          <Button onClick={resetField}>清空</Button>
          <Button onClick={ openModal }>创建</Button>
        </div>
        <hr />
        {
          BaseTable
        }
        <Modal
          visible={visible}
          title={"创建"}
          footer={null}
          width={ "480px" }
          onCancel={hideModal} >
          <Create allowAct={props.allowAct} query={query} succ={props.allowList.succ} hideModal={hideModal} />
        </Modal>
      </div>
    );
}

export default Allowed;
