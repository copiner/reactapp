import React, { useState,useMemo } from "react";
import { Modal, Button, Space, Divider, message } from 'antd';

import ComInput from '../common/bipt'
import BaseSelect from '../common/bslt'
import ComTable from '../common/table'

import stl from '../common/index.css'
import CNF from '../../config'

import { useQuery } from '../common/query';
import { useModalVisible } from '../common/modal';

function Device(props) {

  //console.log(props)

  const { visible, hideModal, openModal } = useModalVisible();

  let init = { templeId: "", equipType:"", equipId:"", pageNum:"1", pageSize:"10"};
  const { query, setQuery, updateField, emptyField, resetField, updateDate } = useQuery(init);

  //新增修改弹窗
  let initc = { equipId: "",templeId: "",equipType:'',useFlag:"", modifyFlag:""  };
  const qry = useQuery(initc);


  const popItem = (record) =>{
      // 1-新增，2-修改 3-删除
      Modal.confirm({
        content: `确认删除设备编号为${record.equipId}的设备吗`,
        onOk() {
          props.deviceAct.deviceupdateSt({dte:record,dce:query})
        },
        onCancel() {
          console.log('Cancel');
        },
      });


  }


  const columns = [
    {
      title: "序号",
      key: "id",
      dataIndex: "id",
      render:(text, record, index) => { return index + 1 }
    },
    {
      title: "设备编号",
      key: "equipId",
      dataIndex: "equipId"
    },{
      title: "设备类型",
      key: "equipType",
      dataIndex: "equipType",
      render: t => t == '1'?"手持":"立式"
    },
    {
      title: "运行状态",
      key: "equipStatus",
      dataIndex: "equipStatus",
    },
    {
      title: "启用标志",
      key: "useFlag",
      dataIndex: "useFlag",
      render: t => t == '1'?"已启用":"已停用"
    },
    {
      title: "名称",
      key: "templeName",
      dataIndex: "templeName"
    },
    {
      title: "创建时间",
      key: "createTime",
      dataIndex: "createTime"
    },
    {
      title: "修改时间",
      key: "updTime",
      dataIndex: "updTime"
    },{
      title: '操作',
      key: 'action',
      render: (text, record) => {
          let temp = {id:record.id,equipId: record.equipId,templeId: record.templeId,equipType:record.equipType,useFlag:record.useFlag};
          return (
                <Space size="middle">
                  <a onClick={ () => { qry.setQuery({...temp, modifyFlag:"2"}); openModal(); } }>编辑</a>
                  <a onClick={ () => popItem({...temp, modifyFlag:"3"})  }>删除</a>
                </Space>
              )
      },
    }
  ];

  let { list } = props.deviceList;

  let BaseTable = useMemo(()=><ComTable cln={ columns } query={query} pSt={props.deviceAct.deviceSt} list={list} / >, [list])

  const printValues = e => {
    e.preventDefault();
    props.deviceAct.deviceSt(query)

  };


  const handleOk = () =>{
      if(!qry.query.equipId){
        message.warning("请输入设备编号！")
        return
      }
      if(!qry.query.templeId){
        message.warning("请选择名称！")
        return
      }
      if(!qry.query.equipType){
        message.warning("请选择类型！")
        return
      }
      if(!qry.query.useFlag){
        message.warning("请选择启用标志！")
        return
      }
      //console.log(qry.query)
      props.deviceAct.deviceupdateSt({dte:qry.query,dce:query})

      hideModal()
      qry.setQuery(initc)
  }

  return (
    <>
      <div className={stl.comQuery}>
        <label>名称：</label>
        {/*强制命名统一*/}
        <BaseSelect type={ CNF.DICT.templeName } item={ query } setItem={setQuery} name={"templeId"} />

        <label>设备类型：</label>
        {/*强制命名统一*/}
        <BaseSelect type={ CNF.DICT.equipType } item={ query } setItem={setQuery} name={"equipType"} />

        <label>设备编号：</label>
        {/*强制命名统一*/}
        <ComInput
          limit={ CNF.IPTLIT.namea }
          prefix={null}
          placeholder={"设备编号"}
          value={query.equipId}
          name={ "equipId" }
          clear = { emptyField }
          update={ updateField } />
        <Button type="primary" size={"default"} onClick={ printValues } >查询</Button>
        <Button onClick={resetField}>清空</Button>
        <Button onClick={ ()=>{ qry.setQuery({ ...initc, modifyFlag:"1" }); openModal(); }}type="primary">创建</Button>

      </div>
      <hr />
      {
        BaseTable
      }
      <Modal
        title={"设备"}
        visible={visible}
        onOk={handleOk}
        onCancel={hideModal} >
        <div className={stl.comModal}>
          <div className={stl.lineItem}>
            <i>设备编号：</i>
            <ComInput
              limit={ CNF.IPTLIT.namee }
              prefix={null}
              placeholder={"设备编号"}
              value={ qry.query.equipId }
              name={ "equipId" }
              clear = { qry.emptyField }
              update={ qry.updateField } />
          </div>
          <div className={stl.lineItem}>
            <i>名称：</i>
            <BaseSelect type={ CNF.DICT.templeName } item={ qry.query } setItem={qry.setQuery} name={"templeId"} />
          </div>
          <div className={stl.lineItem}>
            <i>设备类型：</i>
            <BaseSelect type={ CNF.DICT.equipType } item={ qry.query } setItem={qry.setQuery} name={"equipType"} />
          </div>
          <div className={stl.lineItem}>
            <i>启用标志：</i>
            <BaseSelect type={ CNF.DICT.useFlag } item={ qry.query } setItem={qry.setQuery} name={"useFlag"} />
          </div>
        </div>

      </Modal>
    </>
  );
}

export default Device
