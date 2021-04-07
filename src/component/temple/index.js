import React, { useState,useEffect, useMemo } from "react";
import { Switch, Route, Link } from 'react-router-dom';
import { Modal, Space, Button, Divider, message } from 'antd';

import ComInput from '../common/bipt'
import ComTable from '../common/table'

import CNF from '../../config'
import stl from '../common/index.css'

import { useQuery } from '../common/query';
import { useModalVisible } from '../common/modal';

function Temple(props){
  //console.log(props)

  let init = { templeName: "", exportFlag:"0",pageNum:"1", pageSize:"10" };
  const { query, setQuery, updateField, emptyField, resetField, updateDate } = useQuery(init);

  //新增修改弹窗
  let initc = { templeName: "",templeId: "",modifyFlag:'1' };
  const qry = useQuery(initc);

  const { visible, hideModal, openModal } = useModalVisible();

  const popItem = (action, record) =>{
      let params = null;
      if(action == '2'){
        params = { templeName: record.templeName, templeId: record.templeId, modifyFlag:"2" };
      } else {
        params = initc;
      }
      qry.setQuery(params)
      openModal()
  }

  const columns = [
    {
      title: "序号",
      key: "id",
      dataIndex: "id",
      render:(text, record, index) => { return index + 1 }
    },
    {
      title: "随机数",
      key: "templeId",
      dataIndex: "templeId"
    },{
      title: "名称",
      key: "templeName",
      dataIndex: "templeName"
    },
    {
      title: "创建时间",
      key: "createTime",
      dataIndex: "createTime",
    },
    {
      title: "更新时间",
      key: "updTime",
      dataIndex: "updTime"
    },{
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => popItem("2",record)}>编辑</a>
        </Space>
      ),
    }
  ];


  const handleOk = () =>{
      if(!qry.query.templeName){
        message.warning("请输入名称！")
        return
      }
      // console.log(qry.query.templeName)
      props.templeAct.templeupdateSt(qry.query)
      hideModal()
  }
  /**
  固定规则
  props  {query cln pSt loading list}
  */
  let { list } = props.templeList;

  let BaseTable = useMemo(()=>
      <ComTable
        cln={ columns }
        query={query}
        pSt={props.templeAct.templeSt}
        list={list} / >
    , [list])

  const queryValues = e => {
    props.templeAct.templeSt(query)
  };

  const exportValues = e => {
    props.templeAct.templeSt({...query,exportFlag:"1"})
  };

  useEffect(()=>{
    if(props.templeList.succ){
      props.templeAct.templeSt(query)
    }
  },[props.templeList.succ])
  return (
    <>
      <div className={stl.comQuery}>
        <label>
          <span>名称：</span>
          <ComInput
            limit={ CNF.IPTLIT.namec }
            prefix={null}
            placeholder={"名称"}
            value={ query.templeName }
            name={ "templeName" }
            clear = { emptyField }
            update={ updateField } />
        </label>
        <Button type="primary" size={"default"} onClick={ queryValues } >查询</Button>
        <Button onClick={resetField}>清空</Button>
        <Button onClick={ ()=>{ popItem("1"); }}type="primary">创建</Button>
        <Button onClick={ exportValues }>导出</Button>
      </div>
      <hr />
      {
        BaseTable
      }
      <Modal
        title={qry.query.templeId?"修改":"添加"}
        visible={visible}
        onOk={handleOk}
        onCancel={hideModal} >
        <div className={stl.comModal}>
        { qry.query.templeId ?
          <p>
            <i>随机数：</i>
            <i>{qry.query.templeId}</i>
          </p>
          : null
        }
          <p>
            <i>名称：</i>
            <ComInput
              limit={ CNF.IPTLIT.namec }
              prefix={null}
              placeholder={"名称"}
              value={ qry.query.templeName }
              name={ "templeName" }
              clear = { qry.emptyField }
              update={ qry.updateField } />
          </p>
        </div>

      </Modal>
    </>
  );

}

export default Temple
