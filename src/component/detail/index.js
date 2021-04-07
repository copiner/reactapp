/*
团购明细
*/
import React, { useState,useMemo } from 'react'
import { DatePicker, Button, Input, Modal,Space, message  } from 'antd';

import ComTable from '../common/table'
import ComInput from '../common/bipt'
import BaseSelect from '../common/bslt'
import ExportItem from "./export";

import CNF from '../../config'
import stl from '../common/index.css'

import { useQuery } from '../common/query';
import { useModalVisible } from '../common/modal';

function Detail(props) {

  //console.log(props)
  //查询条件
  let init = { custName: "",idNo: "", mobile:"",cardType:"", orderName:"", cdate:[],startTime:"",endTime:"", pageNum:"1", pageSize:"10" };

  const { visible, hideModal, openModal } = useModalVisible();
  const { query, setQuery, updateField, emptyField, resetField, updateDate } = useQuery(init);

  const columns = [
    {
      title: "序号",
      key: "id",
      dataIndex: "id",
      render:(text, record, index) => { return index + 1 }
    },
    {
      title: "客户姓名",
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
      title: "银行卡类别",
      key: "cardType",
      dataIndex: "cardType"
    },
    {
      title: "团购任务名称",
      key: "orderName",
      dataIndex: "orderName"
    },
    {
      title: "有效期",
      key: "validDate",
      dataIndex: "validDate"
    },
    {
      title: "创建日期",
      key: "createTime",
      dataIndex: "createTime"
    }
  ];


  let { list } = props.detailList;
  let BaseTable = useMemo(()=><ComTable cln={ columns } query={query} pSt={props.detailAct.detailSt} list={list} / >, [list])

  const printValues = e => {
    e.preventDefault();
    props.detailAct.detailSt(query)
  };

  return (
    <>
      <div className={stl.comQuery}>
        <div className={stl.lineItem}>
          <label>
            <span>用户姓名：</span>
            <ComInput
              limit={ CNF.IPTLIT.nameb }
              prefix={null}
              placeholder={"用户姓名"}
              value={ query.custName }
              name={ "custName" }
              clear = { emptyField }
              update={ updateField } />
          </label>
          <label>
            <span>证件号码：</span>
            <ComInput
              limit={ CNF.IPTLIT.certl }
              prefix={null}
              placeholder={"证件号"}
              value={ query.idNo }
              name={ "idNo" }
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

        </div>
        <div className={stl.lineItem}>
        <label>
          <span>团购名称：</span>
          <ComInput
            limit={ CNF.IPTLIT.nameb }
            prefix={null}
            placeholder={"团购名称"}
            value={ query.orderName }
            name={ "orderName" }
            clear = { emptyField }
            update={ updateField } />
        </label>
          <label>办理日期:</label>
          <DatePicker.RangePicker
            inputReadOnly
            format={"YYYYMMDD"}
            value={query.cdate}
            onChange={ updateDate }/>
        </div>
        <div className={stl.lineItem}>
          <label>银行卡类别：</label>
          <BaseSelect type={ CNF.DICT.cardKind } item={ query } setItem={setQuery} name={"cardType"} />

          <Button type="primary" size={"default"} onClick={ printValues } >查询</Button>
          <Button onClick={resetField}>清空</Button>
          <Button size={"default"} onClick={ openModal } >导出列表</Button>
        </div>
      </div>
      <hr />
      {
        BaseTable
      }
      <Modal
        visible={visible}
        title={"导出团购任务"}
        width={"480px"}
        footer={null}
        onCancel={hideModal} >
        {
          /*modal*/
          <ExportItem hideModal={hideModal} detailexportSt={props.detailAct.detailexportSt} />

        }

      </Modal>
    </>
  );
}

export default Detail;
