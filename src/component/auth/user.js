/*
  用户管理
*/
import React, { useState, useMemo } from "react";
import { Switch, Route, Link } from 'react-router-dom';
import { Modal, Button, Space, message } from 'antd';

import ComInput from '../common/bipt'
import BaseSelect from '../common/bslt'
import Itemu from "./itemu";

import ComTable from '../common/table'
import CNF from '../../config'
import stl from '../common/index.css'

import { useQuery } from '../common/query';
import { useModalVisible } from '../common/modal';

function User(props){

  const { visible, hideModal, openModal } = useModalVisible();

  let init = { custName: "",mobile:"", status:"", pageNum:"1", pageSize:"10" };
  const { query, setQuery, updateField, emptyField, resetField, updateDate } = useQuery(init);

  let initc = { accountName:"",custName: "",mobile: "", remark:"", status:"",roleArray:[] };
  const qry = useQuery(initc);

  const [flag, setFlag] = useState({ action:'1' });//action === '1' 新增

  const popItem = (action, record) =>{
      let params = null;
      if(action === '2'){
        let arr = [];
        record.roleArray.map((item)=>{
          arr.push(item.id)
        })
        params = { custName: record.custName,mobile: record.mobile, remark:record.remark, status:record.status,roleArray:arr };
      } else {
        params = initc;
      }

      qry.setQuery(params)

      let tmp = record||{}
      tmp.action = action
      setFlag(tmp);

      openModal()
  }

  // console.log(props)
  const columns = [
    {
      title: "序号",
      key: "id",
      dataIndex: "id",
      render:(text, record, index) => { return index + 1 }
    },
    {
      title: "用户名",
      key: "userName",
      dataIndex: "userName"
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
      title: "角色",
      key: "roleArray",
      dataIndex: "roleArray",
      render: (text) => {
        let str = '';
        text.map((item)=>{
          str += item.roleName + " "
        })
        return str;
      }
    },
    {
      title: "状态",
      key: "status",
      dataIndex: "status",
      render: status => (status=='1'?'已停用':'已启用')
    },
    {
      title: "备注",
      key: "remark",
      dataIndex: "remark",
    },
    {
      title: "创建时间",
      key: "createTime",
      dataIndex: "createTime"
    },
    {
      title: "修改时间",
      key: "updateTime",
      dataIndex: "updateTime"
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => popItem("2",record)}>编辑</a>
          <a onClick={() => popItem("3",record)}>删除</a>
          <a onClick={() => popItem("4",record)}>{record.status==='1'?"启用":"停用"}</a>
          <a onClick={() => popItem("5",record)}>重置密码</a>
        </Space>
      ),
    }
  ];

  const userenum = {'1':"新增用户","2":"编辑用户","3":"删除用户","4":"启用/停用用户","5":"重置密码"}

  /**
  固定规则
  props  {query cln pSt loading list}
  */
  let { list } = props.userList;

  let BaseTable = useMemo(
    ()=>
    <ComTable
        cln={ columns }
        query={query}
        pSt={props.userAct.userSt}
        list={list} / >
    , [list])


  const queryValues = () => {
    props.userAct.userSt(query)
  };

  const handleOk=()=>{

    if(flag.action == '1' || flag.action == '2'){

      if(!qry.query.custName){
        message.warning("请输入姓名！")
        return
      }

      if(!qry.query.mobile){
        message.warning("请输入手机号！")
        return
      }

      if(!qry.query.roleArray.length){
        message.warning("请选择角色！")
        return
      }

      if(!qry.query.status){
        message.warning("请选择状态！")
        return
      }

      if(flag.action == '1'){//新增 并刷新

        if(!qry.query.accountName){
          message.warning("请输入账户名称！")
          return
        }

        props.userAct.useraddSt({add:qry.query,user:query})
      }

      if(flag.action == '2'){//编辑并刷新
        props.userAct.userupdateSt({ ute:{...qry.query,userId:flag.id},user:query })
      }

    }


    if(flag.action == '3'){//删除并刷新
      props.userAct.userdeleteSt({ dte:{userId:flag.id},user:query })
    }

    if(flag.action == '4'){//启用，停用 user:query
      if(flag.status=='1'){
        props.userAct.userenableSt({ ele:{userId:flag.id},user:query })//启用
      } else {
        props.userAct.userdisableSt({ dle:{userId:flag.id},user:query })//停用
      }
    }

    if(flag.action == '5'){
      props.userAct.userresetSt({userId:flag.id})
    }

    hideModal()
  }

  const itemN = () =>{

    switch (flag.action) {
      case '1':
      case '2':
        return <Itemu flag={flag} qry={qry} />
        break;
      case '3':
        let del = `确认删除该用户吗`;
        return del;
        break;
      case '4':
        let able = `确认${flag.status==='1'?"启用":"停用"}该用户吗`;
        return able;
        break;
      case '5':
        let ret = `确认重置该用户密码吗`;
        return ret;
        break;
      default:
        return null;
    }
  }


  return (
    <>
      <div className={stl.comQuery}>
        <div className={stl.lineItem}>
          <label>
            <span>姓名：</span>
            <ComInput
              limit={ CNF.IPTLIT.nameb }
              prefix={null}
              placeholder={"姓名"}
              value={ query.custName }
              name={ "custName" }
              clear = { emptyField }
              update={ updateField } />
          </label>
          <label>
            <span>手机号：</span>
            <ComInput
              limit={ CNF.IPTLIT.mobile }
              prefix={null}
              placeholder={"手机号"}
              value={ query.mobile }
              name={ "mobile" }
              clear = { emptyField }
              update={ updateField } />
          </label>
          <label>
            <span>状态：</span>
            <BaseSelect type={ CNF.DICT.roleStatus } item={ query } setItem={setQuery} name={"status"} />
          </label>
          <Button type="primary" size={"default"} onClick={ queryValues } >查询</Button>
          <Button onClick={resetField}>清空</Button>
          <Button type="primary" size={"default"} onClick={ ()=>{ popItem("1"); } } >新增</Button>
        </div>
      </div>
      <hr />
      {
          /*性能优化  类似 shouldComponentUpdate 生命周期，优化组件是否渲染 */
          /*<ComTable cln={ columns } loading={props.loading} data={data}/>*/
          list ? BaseTable : null
      }

      <Modal
        visible={visible}
        title={flag.action=="4"?(flag.status=='1'?"启用用户":"停用用户"):userenum[flag.action]}
        onOk={handleOk}
        onCancel={hideModal} >
        {
          /*modal*/
          itemN()
        }

      </Modal>
    </>
  );

}

export default User
