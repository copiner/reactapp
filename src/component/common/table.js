/*
  table列表组件 开发
*/
import React, { useState,useEffect } from "react";
import { Table } from "antd";

import BaseSelect from '../common/bslt'

import stl from './index.css'

const showSummary=(sFlag, data)=>{

  let summ = null;
  if(sFlag == "summary"){
    return (
      <div className={stl.recordDtl}>
        <span>开通总条数:{data.totalOpenCnt||"0"}</span>
        <span>开通总费用(元):{data.totalOpenFee/100||"0"}</span>
        <span>首次开通总条数:{data.totalFirstOpenCnt||"0"}</span>
        <span>首次打印总条数:{data.totalFirstPrintCnt||"0"}</span>
        <span>换银行卡总条数:{data.totalChangeCnt||"0"}</span>
        <span>换银行卡总费用(元):{data.totalChangeFee/100||"0"}</span>
      </div>
    )
  }

  if(sFlag == "order"){
    return (
      <div className={stl.recordDtl}>
        <span>总条数:{data.totalCount||"0"}</span>
        <span>总费用(元):{data.totalAmount/100||"0"}</span>
      </div>
    )
  }

}

const ComTable = (props) => {
  //console.log(props)
  let query = props.query;

  let currentPage = props.list && props.list.currentPage ? props.list.currentPage : '1';
  let currentPageSize = props.list && props.list.pageSize ? props.list.pageSize : '10';
  let totalCount = props.list && props.list.totalCount ? props.list.totalCount : '0';

  let data = [];
  let summ = null;

  if(props.sFlag && props.list){
     data = props.list && props.list.data.list ? props.list.data.list: [];
     summ = showSummary(props.sFlag, props.list.data)
  } else {
    data = props.list && props.list.data ? props.list.data: [];
  }


  //loading = props.loading||false;
  //let { pageSize,setPageSize,pageNo,setPageNo } = props;

  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setPageNo(currentPage);
    setPageSize(currentPageSize);
  },[data]);//pageflag

  return (
    <>
      {
        props.sFlag && props.list && props.list.data? summ : ""
      }
      <Table
        rowKey={record => record.id||record.busiId||record.templeId||record.channelId||record.custIdNo||record.orderId}
        // loading={loading}
        dataSource={data}
        columns={props.cln}
        scroll={{x:true}}
        tableLayout={"fixed"}
        bordered
        pagination={{
          pageSize,
          showSizeChanger:true,
          current: pageNo,
          total: totalCount,//total
          showTotal:(total)=>{
              return `总计${total}条`
          },
          onChange: (page, pageSize) => {
            setPageNo(page);
            setPageSize(pageSize);
            //console.log( Object.assign(props.query, {pageNum:page, pageSize}) )
            props.pSt({...query, pageNum:page, pageSize:pageSize})
          },
          onShowSizeChange:(current, size)=>{
            // console.log(current, size)
            // setPageNo(current);
            // setPageSize(size);
          }
        }}
      />
    </>
  );

};

export default ComTable;
