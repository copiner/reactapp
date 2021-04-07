/*
  角色管理
*/
import React, { useState,useMemo } from "react";
import { Switch, Route, Link } from 'react-router-dom';
import { Modal, Button, Divider,Space, message } from 'antd';

import ComInput from '../common/bipt'
import BaseSelect from '../common/bslt'

import ComTable from '../common/table'
import Itemr from "./itemr";

import TreeList from "./tree";
import List from "./list";

import CNF from '../../config'
import stl from '../common/index.css'

import { useQuery } from '../common/query';
import { useModalVisible } from '../common/modal';

function Role(props){
  //console.log(props)

  const { visible, hideModal, openModal } = useModalVisible();

  let init = { roleName: "", status:"",pageNum:"1", pageSize:"10" };
  const { query, setQuery, updateField, emptyField, resetField, updateDate } = useQuery(init);

  //新增修改弹窗
  let initc = { roleName: "",roleCode: "" };
  const qry = useQuery(initc);

  const [flag, setFlag] = useState({ action:'1' });//action === '1' 新增

  const popItem = (action, record) =>{//不要在循环，条件或嵌套函数中调用 Hook
      if(action == '2'){//编辑
        qry.setQuery({ roleName: record.roleName,roleCode: record.roleCode })
      } else {
        qry.setQuery(initc)
      }
      let tmp = record||{}
      tmp.action = action
      setFlag(tmp);

      if(action == '5'){//获取资源
        props.roleAct.rolemenuSt({roleId:record.id})
      }

      // if(action == '6'){//根据角色获取用户
      //   //props.roleAct.roleuserSt({roleId:record.id})
      // }
      openModal()

  }

  const columns = [
    {
      title: "序号",
      key: "id",
      dataIndex: "id",
      render:(text, record, index) => { return index + 1 }
    },{
      title: "角色名称",
      key: "roleName",
      dataIndex: "roleName"
    },
    {
      title: "角色代码",
      key: "roleCode",
      dataIndex: "roleCode",
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
          <a onClick={() => popItem("5",record)}>权限设置</a>
          <a onClick={() => popItem("6",record)}>成员管理</a>
        </Space>
      ),
    }
  ];

  const roleenum = {'1':"新增角色","2":"修改角色","3":"删除角色","4":"启用/停用角色","5":"权限设置","6":"成员管理"}

  /**
  固定规则
  props  {query cln pSt loading list}
  */
  let { list,menu,user } = props.roleList;

  let BaseTable = useMemo(()=><ComTable cln={ columns } query={query} pSt={props.roleAct.roleSt} list={list} / >, [list])

  const queryValues = e => {
    props.roleAct.roleSt(query)
  };


  /**
  树状菜单
  */
  const [resource, setResource] = useState([]);
  //let child = props.routes;

  const handleOk=()=>{
    if(flag.action == '1' || flag.action == '2'){

      if(!qry.query.roleName){
        message.warning("请输入角色名称！")
        return
      }

      if(!qry.query.roleCode){
        message.warning("请输入角色编码！")
        return
      }

      if(flag.action == '1'){//新增 并刷新
        props.roleAct.roleaddSt({add:qry.query,role:query})
      }

      if(flag.action == '2'){//编辑并刷新
        props.roleAct.roleupdateSt({ ute:{...qry.query,roleId:flag.id},role:query })
      }
    }


    if(flag.action == '3'){//删除并刷新
      props.roleAct.roledeleteSt({ dte:{roleId:flag.id},role:query })
    }

    if(flag.action == '4'){//启用，停用 并刷新role:query
      if(flag.status=='1'){
        props.roleAct.roleenableSt({ ele:{roleId:flag.id},role:query })//启用
      } else {
        props.roleAct.roledisableSt({ dle:{roleId:flag.id},role:query })//停用
      }
    }

    if(flag.action == '5'){//权限设置
      if(JSON.stringify(menu.check.sort()) == JSON.stringify(resource.sort())){
        //两个数组是否有相同的元素，不再提交
        console.log('equal')
      } else {
        props.roleAct.rolesetmenuSt({roleId:flag.id, resourceArray:resource})
      }

    }

    // if(flag.action == '6'){//成员管理
    //   //props.roleAct.roledeleteSt({ dte:{roleId:flag.id},role:query })
    // }

    hideModal()

  }


  const itemN = () =>{

    switch (flag.action) {
      case '1':
      case '2':
        return <Itemr qry={qry} />
        break;
      case '3':
        let del = `确认删除该角色吗`;
        return del;
        break;
      case '4':
        let able = `确认${flag.status==='1'?"启用":"停用"}该角色吗`;
        return able;
        break;
      case '5':
        return <TreeList menu={menu} setResource={setResource} />
        break;
      case '6':
        return <List flag={flag} user={user} roledeluserSt={props.roleAct.roledeluserSt} roleuserSt={props.roleAct.roleuserSt} />
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
            <span>角色名称：</span>
            <ComInput
              limit={ CNF.IPTLIT.nameb }
              prefix={null}
              placeholder={"角色名称"}
              value={ query.roleName }
              name={ "roleName" }
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
          BaseTable
      }

      <Modal
        width={ flag.action=='6'? "840px" : "520px" }
        footer={ flag.action=='6'? null : undefined }
        visible={visible}
        title={flag.action=="4"?(flag.status=='1'?"启用角色":"停用角色"):roleenum[flag.action]}
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

export default Role
