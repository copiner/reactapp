/*
  角色成员管理
*/
import React, { useState,useEffect, useMemo } from "react";
import { Modal, Space } from "antd";

import ComTable from '../common/table'

const List = (props) => {

  let roleId = props.flag.id,roleName = props.flag.roleName;

  useEffect(() => {
    if(roleId){
      props.roleuserSt({ roleId:roleId, pageNum:"1", pageSize:"10"})
    }
  }, [roleId]);

  const popItem = (record) =>{
    //console.log(record)

    // Modal.confirm({
    //   title: '确认解除绑定?',
    //   onOk() {
    //     console.log('OK');
    //   },
    //   onCancel() {
    //     console.log('Cancel');
    //   },
    // });

    props.roledeluserSt({der:{roleId:roleId,userId:record.id},user:{ roleId:roleId, pageNum:"1", pageSize:"10"}})
  }

  const columns = [
    // {
    //   title: "序号",
    //   key: "id",
    //   dataIndex: "id",
    //   render:(text, record, index) => { return index + 1 }
    // }
    ,{
      title: "角色",
      key: "roleArray",
      dataIndex: "roleArray",
      render: (text) => {
        return roleName
      }
    },
    {
      title: "用户姓名",
      key: "custName",
      dataIndex: "custName",
    },
    {
      title: "手机号",
      key: "mobile",
      dataIndex: "mobile",
    },
    {
      title: "备注",
      key: "remark",
      dataIndex: "remark",
    },
    {
      title: "状态",
      key: "status",
      dataIndex: "status",
      render: status => (status=='1'?'已停用':'已启用')
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
          <a onClick={() => popItem(record)}>解除绑定</a>
        </Space>
      ),
    }
  ];

  //let { list } = props.userList;
  let list = props.user;

  let BaseTable = useMemo(
    ()=>
    <ComTable
        cln={ columns }
        // pageSize={pageSize}
        // setPageSize={setPageSize}
        // pageNo={pageNo}
        // setPageNo={setPageNo}
        query={{roleId:roleId}}
        pSt={props.roleuserSt}
        list={list} / >
    , [list])

  return (
    <>
      { BaseTable }
    </>
  );

};

export default List;
