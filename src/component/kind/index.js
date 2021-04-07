import React, { useState,useEffect,useMemo } from "react";
import { Modal, Button, Table, Avatar, Space, message } from "antd";

import ComTable from '../common/table'

import { useQuery } from '../common/query';
import { useModalVisible } from '../common/modal';

import CNF from '../../config'
import Item from "./item";

const KindTable = (props) => {
  //console.log(props)
  const { visible, hideModal, openModal } = useModalVisible();

  let init = { pageNum:"1", pageSize:"10" };

  const [flag, setFlag] = useState(null);

  useEffect(() => {
    props.kindAct.kindSt(init)
  },[])

  const popItem = (action, record) =>{
      //modifyFlag 1-新增，2-修改，3-删除
      console.log(record)

      let tmp = record || {}
      tmp.modifyFlag = action;
      setFlag(tmp);

      openModal();
  }

  const columns = [
    {
      title: "银行卡类别名称",
      key: "cardKindName",
      dataIndex: "cardKindName"
    },{
      title: "补办成本(元)",
      key: "busiCost",
      dataIndex: "busiCost",
      render: v => v/100
    },
    {
      title: "充值费(元)",
      key: "rechargFee",
      dataIndex: "rechargFee",
      render: v => v/100
    },
    {
      title: "每天限次",
      key: "limitTimes",
      dataIndex: "limitTimes"
    },
    {
      title: "有效时长(自然年)",
      key: "validYear",
      dataIndex: "validYear"
    },
    {
      title: "创建时间",
      key: "createTime",
      dataIndex: "createTime"
    },
    {
      title: "更新时间",
      key: "updTime",
      dataIndex: "updTime"
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => popItem("2",record)}>编辑</a>
          <a onClick={() => popItem("3",record)}>删除</a>
        </Space>
      ),
    }
  ];

  let { list } = props.kindList;

  let BaseTable = useMemo(()=><ComTable cln={ columns } query={init} pSt={props.kindAct.kindSt} list={list} / >, [list])

  const tenum = {"1":"创建银行卡类别","2":"修改银行卡类别","3":"删除银行卡类别"}
  return (
    <>
      <Button onClick={ ()=>{ popItem("1",init) }} >新建</Button>
      <hr />
      {BaseTable}
      <Modal
        title={tenum[flag && flag.modifyFlag?flag.modifyFlag:""]}
        closable={false}
        width={"480px"}
        visible={visible}
        footer={null}
        onCancel={hideModal} >
        <Item kindupdateSt={props.kindAct.kindupdateSt} hideModal={hideModal} { ...flag }/>
      </Modal>
    </>
  );

};

export default KindTable;
