/*
  刷银行卡记录
*/
import React, { useState,useMemo,useEffect } from "react";
import { Switch, Route, Link } from 'react-router-dom';
import { DatePicker, Button, Divider, message } from 'antd';

import ComInput from '../common/bipt'
import BaseSelect from '../common/bslt'

import ComTable from '../common/table'
import CNF from '../../config'
import stl from '../common/index.css'

import RecordServer from '../../services/record';
import { useQuery } from '../common/query';

function Record(props){

  //console.log(props)
  let init = { idNo: "",custName: "",entranceType: "", templeId: "",startTime:"",endTime:"", pageNum:"1", pageSize:"10", cdate:[] };
  const { query, setQuery, updateField, emptyField, resetField, updateDate } = useQuery(init);

  const columns = [
    {
      title: "序号",
      key: "id",
      dataIndex: "id",
      render:(text, record, index) => { return index + 1 }
    },
    {
      title: "游客姓名",
      key: "custName",
      dataIndex: "custName"
    },
    {
      title: "证件号",
      key: "custIdNo",
      dataIndex: "custIdNo"
    },
    {
      title: "入园方式",
      key: "entranceType",
      dataIndex: "entranceType"
    },
    {
      title: "设备id",
      key: "deviceId",
      dataIndex: "deviceId"
    },
    {
      title: "刷银行卡园",
      key: "templeName",
      dataIndex: "templeName"
    },
    {
      title: "刷银行卡时间",
      key: "createTime",
      dataIndex: "createTime"
    }
  ];

  const [list, setList] = useState(null);

  const getValues = async (data) => {
      const rst =  await RecordServer.fetchList(data)
      if(rst.code == CNF.CODE.suc){
        setList(rst);
      } else {
        message.error("record,error,")
      }
  };

  // console.log(list)
  let BaseTable = useMemo(()=><ComTable cln={ columns } query={query} pSt={getValues} list={list} / >, [list])

  return (
    <>
      <div className={stl.comQuery}>
        <div className={stl.lineItem}>
          <label>
            <span>游客姓名：</span>
            <ComInput
              limit={ CNF.IPTLIT.nameb }
              prefix={null}
              placeholder={"游客姓名"}
              value={ query.custName }
              name={ "custName" }
              clear = { emptyField }
              update={ updateField } />
          </label>
          <label>
            <span>证件号：</span>
            <ComInput
              limit={ CNF.IPTLIT.certl }
              prefix={null}
              placeholder={"证件号"}
              value={ query.idNo }
              name={ "idNo" }
              clear = { emptyField }
              update={ updateField } />
          </label>
          <label>名称：</label>
          <BaseSelect type={ CNF.DICT.templeName } item={ query } setItem={setQuery} name={"templeId"} />

          <label>方式：</label>
          <BaseSelect type={ CNF.DICT.entranceType } item={ query } setItem={setQuery} name={"entranceType"} />
        </div>
        <div className={stl.lineItem}>
          <label>创建日期:</label>
          <DatePicker.RangePicker
            inputReadOnly
            format={"YYYYMMDD"}
            value={query.cdate}
            onChange={ updateDate }/>

          <Button type="primary" size={"default"} onClick={ ()=>{getValues(query);} } >查询</Button>
          <Button onClick={resetField}>清空</Button>
        </div>
      </div>
      <hr />
      {
        BaseTable
      }
    </>
  );

}

export default Record
