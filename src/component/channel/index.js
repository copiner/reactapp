import React, { useState,useMemo } from "react";
import { Switch, Route, Link } from 'react-router-dom';
import { Modal, Space, Button, message } from 'antd';

import ComInput from '../common/bipt'
import ComTable from '../common/table'

import CNF from '../../config'
import stl from '../common/index.css'

import { useQuery } from '../common/query';
import { useModalVisible } from '../common/modal';

function Channel(props){
  //console.log(props)

  let init = { channelName: "", pageNum:"1", pageSize:"10" };
  const { query, setQuery, updateField, emptyField, resetField, updateDate } = useQuery(init);

  //新增修改弹窗
  let initc = { channelName: "",channelNo: "",remark:'',channelId:"" };
  const qry = useQuery(initc);

  const { visible, hideModal, openModal } = useModalVisible();

  const [flag, setFlag] = useState('1');

  const popItem = (action, record) =>{
    let params = null;
    if(action == '2'){
      params = { channelName: record.channelName,channelNo: record.channelNo,remark:record.remark,channelId:record.channelId };
    } else {
      params = initc;
    }
    setFlag(action);
    qry.setQuery(params)
    openModal()
  }

  const columns = [
    {
      title: "渠道号",
      key: "channelNo",
      dataIndex: "channelNo"
    },{
      title: "渠道名",
      key: "channelName",
      dataIndex: "channelName"
    },
    {
      title: "渠道说明",
      key: "remark",
      dataIndex: "remark",
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

      if(!qry.query.channelNo){
        message.warning("请输入渠道号！")
        return
      }

      if(!qry.query.channelName){
        message.warning("请输入渠道名称！")
        return
      }


      if(flag == '1'){
        props.channelAct.channeladdSt(qry.query)
      } else {
        props.channelAct.channelupdateSt(qry.query)
      }

      hideModal()
  }
  /**
  固定规则
  props  {query cln pSt loading list}
  */
  let { list } = props.channelList;

  let BaseTable = useMemo(()=>
      <ComTable
        cln={ columns }
        query={query}
        pSt={props.channelAct.channelSt}
        list={list} / >
    , [list])

  const queryValues = e => {
    props.channelAct.channelSt(query)
  };


  return (
    <>
      <div className={stl.comQuery}>
        <label>
          <span>渠道名称：</span>
          <ComInput
            limit={ CNF.IPTLIT.nameb }
            prefix={null}
            placeholder={"渠道名称"}
            value={ query.channelName }
            name={ "channelName" }
            clear = { emptyField }
            update={ updateField } />
        </label>
        <Button type="primary" size={"default"} onClick={ queryValues } >查询</Button>
        <Button onClick={resetField}>清空</Button>
        <Button onClick={ ()=>{ popItem("1"); }} >创建</Button>
      </div>
      <hr />
      {
        BaseTable
      }
      <Modal
        title={ flag=='1'?"新增渠道":"编辑渠道" }
        visible={visible}
        onOk={handleOk}
        onCancel={hideModal} >
        <div className={stl.comModal}>
          <div className={stl.lineItem}>
            <i>渠道号：</i>
            <ComInput
              limit={ CNF.IPTLIT.nameg }
              prefix={null}
              placeholder={"渠道号"}
              value={ qry.query.channelNo }
              name={ "channelNo" }
              clear = { qry.emptyField }
              update={ qry.updateField } />
          </div>
          <div className={stl.lineItem}>
            <i>渠道名称：</i>
            <ComInput
              limit={ CNF.IPTLIT.nameb }
              prefix={null}
              placeholder={"渠道名称"}
              value={ qry.query.channelName }
              name={ "channelName" }
              clear = { qry.emptyField }
              update={ qry.updateField } />
          </div>
          <div className={stl.lineItem}>
            <i>渠道说明：</i>
            <ComInput
              limit={ CNF.IPTLIT.remark }
              prefix={null}
              placeholder={"渠道说明"}
              value={ qry.query.remark }
              name={ "remark" }
              clear = { qry.emptyField }
              update={ qry.updateField } />
          </div>
        </div>

      </Modal>
    </>
  );

}

export default Channel
