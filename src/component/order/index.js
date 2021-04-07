/*
  数据管理，订单管理
*/
import React, { useState,useMemo } from "react";
import { Modal, DatePicker, Button, message } from 'antd';

import ComInput from '../common/bipt'
import BaseSelect from '../common/bslt'
import ComTable from '../common/table'

//import ExportItem from "./export";

import { useModalVisible } from '../common/modal';
import { useQuery } from '../common/query';

import stl from '../common/index.css'

import CNF from '../../config'

function Order(props) {

  //console.log(props)
  let init = { custName: "",idNo: "", mobile:"",cardType:"", smkCardNo:"", templeCardNo:"",channel:"",orderStatus:"",orderType:"", cdate:[],startTime:"",endTime:"", pageNum:"1", pageSize:"10" };

  const { query, setQuery, updateField, emptyField, resetField, updateDate } = useQuery(init);
  const { visible, hideModal, openModal } = useModalVisible();

  const printSubmit = e => {
    props.orderAct.orderexportSt(query)
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
      title: "证件号",
      key: "idNo",
      dataIndex: "idNo"
    },
    {
      title: "手机号",
      key: "mobile",
      dataIndex: "mobile"
    },
    {
      title: "银行卡号",
      key: "smkCardNo",
      dataIndex: "smkCardNo"
    },
    {
      title: "票号",
      key: "templeCardNo",
      dataIndex: "templeCardNo"
    },
    {
      title: "订单类型",
      key: "orderType",
      dataIndex: "orderType"
    },
    {
      title: "订单状态",
      key: "orderStatus",
      dataIndex: "orderStatus"
    },
    {
      title: "金额",
      key: "fee",
      dataIndex: "fee",
      render:v=>v?v/100:""
    },
    {
      title: "银行卡类别",
      key: "cardType",
      dataIndex: "cardType"
    },
    {
      title: "渠道",
      key: "channelName",
      dataIndex: "channelName"
    },
    {
      title: "操作员",
      key: "operName",
      dataIndex: "operName"
    },
    {
      title: "购买人手机号",
      key: "openMobile",
      dataIndex: "openMobile"
    },
    {
      title: "创建日期",
      key: "createTime",
      dataIndex: "createTime"
    }
  ];


  const printValues = e => {
    e.preventDefault();
    props.orderAct.orderSt(query)
  };

  let { list } = props.orderList;
  let BaseTable = useMemo(()=><ComTable sFlag={"order"} cln={ columns } query={query} pSt={props.orderAct.orderSt} list={list} / >, [list])

  return (
    <div className={stl.comQuery}>
      <div className={stl.lineItem}>
        <label>
          <span className={stl.lName}>用户姓名：</span>
          <ComInput
            limit={ CNF.IPTLIT.nameb }
            prefix={null}
            placeholder={"姓名"}
            value={query.custName}
            name={ "custName" }
            clear = { emptyField }
            update={ updateField } />
        </label>
        <label>
        <span className={stl.lName}>证件号码：</span>
        <ComInput
          limit={ CNF.IPTLIT.certl }
          prefix={null}
          placeholder={"证件号码"}
          value={query.idNo}
          name={ "idNo" }
          clear = { emptyField }
          update={ updateField } />
        </label>
        <label>
        <span className={stl.lName}>手机号：</span>
        <ComInput
          limit={ CNF.IPTLIT.mobile }
          prefix={null}
          placeholder={"手机号"}
          value={query.mobile}
          name={ "mobile" }
          clear = { emptyField }
          update={ updateField } />
        </label>

      </div>
      <div className={stl.lineItem}>
        <label>
          <span className={stl.lName}>市民号：</span>
          <ComInput
            limit={ CNF.IPTLIT.namea }
            prefix={null}
            placeholder={"市民银行卡号"}
            value={query.smkCardNo}
            name={ "smkCardNo" }
            clear = { emptyField }
            update={ updateField } />
          </label>
          <label>
          <span className={stl.lName}>银行卡号：</span>
          <ComInput
            limit={ CNF.IPTLIT.namea }
            prefix={null}
            placeholder={"庙票银行卡号"}
            value={query.templeCardNo}
            name={ "templeCardNo" }
            clear = { emptyField }
            update={ updateField } />
          </label>
        <label>
          <span className={stl.lName}>银行卡类别：</span>
          {/*强制命名统一*/}
          <BaseSelect type={ CNF.DICT.cardKind } item={ query } setItem={setQuery} name={"cardType"} />
        </label>
      </div>
      <div className={stl.lineItem}>
        <label>
        <span className={stl.lName}>渠道名称：</span>
        {/*强制命名统一*/}
        <BaseSelect type={ CNF.DICT.channelCode } item={ query } setItem={setQuery} name={"channel"} />
        </label>
        <label>
        <span className={stl.lName}>订单状态：</span>
        <BaseSelect type={ CNF.DICT.orderStatus } item={ query } setItem={setQuery} name={"orderStatus"} />
        </label>
        <label>
        <span className={stl.lName}>订单类型：</span>
        <BaseSelect type={ CNF.DICT.orderType } item={ query } setItem={setQuery} name={"orderType"} />
        </label>
      </div>
      <div className={stl.lineItem}>
        <label>
        <span className={stl.lName}>创建日期:</span>
        <DatePicker.RangePicker
          inputReadOnly
          format={"YYYYMMDD"}
          value={query.cdate}
          onChange={ updateDate }/>
        </label>
        <Button type="primary" size={"default"} onClick={ printValues } >查询</Button>
        <Button onClick={resetField}>清空</Button>
        <Button onClick={ printSubmit /*openModal*/ } >导出</Button>
      </div>
      <hr />
      {
        /*Table*/
        BaseTable
      }
      {
        /*
        <Modal
          title={"订单管理"}
          visible={visible}
          footer={null}
          onCancel={hideModal} >
            <ExportItem hideModal={hideModal} search={query} orderexportSt={props.orderAct.orderexportSt}/>
        </Modal>
        */
      }

    </div>
  );
}

export default Order
