/*
  数据字典加载 下拉框 base select
*/
import React,{ useEffect, useState, useLayoutEffect } from 'react';
// import { debounce } from "lodash/fp";

import DictServer from '../../services/dict';
import { Select, message } from 'antd';
import stl from './index.css'

import CNF from '../../config'

function BaseSelect(props) {

  /*
  type:数据字典id，
  item:props参数集合
  name:选择框对应参数名字
  */

  let { type, item, name, params:params={} } = props

  const [data, setData] = useState([]);
  const [option, setOption] = useState(null);

  const fetchCode = (type, data) => {

    if(type){

      (async () => {
        const rst =  await DictServer.initDict(type,data)
        if(rst.code == CNF.CODE.suc){
          setData(rst.data);
        } else {
          console.error("bslt,error,"+type)
        }
        //console.log(rst.data)
      })()

    }

  }

  useEffect(() => {
    if(type === CNF.DICT.levName){//初始化 团购名称 联想查询
      fetchCode(type,{orderName:""})
    } else {
      fetchCode(type,params)
    }
  }, [type]);


  const updateField = (v,o,name) =>{
    //console.log(v, o, name)
    props.setItem({
      ...item,
      [name]: v
    })
  }

  const clearField = e =>{
    //console.log(e)
  }

  const searchField = value =>{
    if (value) {
      if(type === CNF.DICT.levName){//团购名称 联想查询
        fetchCode(type,{orderName:value})
      } else {
        fetchCode(type,value)
      }
    } else {
       setData([]);
     }
  }


  let releasedDict = () => {

    if(type == CNF.DICT.roleList){
      return data.map((item, idx)=>{//角色多选框
        return <Select.Option key={idx} value={item.id}>{item.roleName}</Select.Option>
      })
    } else if(type == CNF.DICT.cardKind) {
      return data.map((item, idx)=>{//银行卡类型
        return <Select.Option key={idx} value={item.id}>{item.cardKindName}</Select.Option>
      })
    } else if(type == CNF.DICT.templeName) {
      return data.map((item, idx)=>{//寺院名称
        return <Select.Option key={idx} value={item.templeId}>{item.templeName}</Select.Option>
      })
    } else if(type === CNF.DICT.taskOperCode || type === CNF.DICT.cardKindOperCode || type === CNF.DICT.orderOperCode || type == CNF.DICT.allOper) {
      return data.map((item, idx)=>{//创建银行卡类别权限操作员 操作员名称
        return <Select.Option key={idx} mobile={item.mobile} value={item.id}>{item.custName}</Select.Option>
      })
    } else if(type == CNF.DICT.levName) {
      return data.map((item, idx)=>{//联想查询团购名称
        return <Select.Option key={idx} value={item.orderId}>{item.orderName}</Select.Option>
      })
    } else if(type == CNF.DICT.channelCode) {
      return data.map((item, idx)=>{//渠道查询
        return <Select.Option key={idx} value={item.channelNo}>{item.channelName}</Select.Option>
      })
    } else {
      return data.map((item, idx)=>{
        return <Select.Option key={idx} value={item.dataNo}>{item.dataName}</Select.Option>
      })
    }

  }

  /*
  加载下拉框，银行卡类型默认值处理，如果下拉元素未找到，默认普通银行卡
  非银行卡类型下拉框，保存默认值不变
  */
  const defaultVal=(v)=>{
    let dvl = "";

    if(type == CNF.DICT.cardKind && params.checkFlag == "1"){

      data.map((item, idx)=>{
        if(item.id == v){
          dvl = v;
        }
      })
      if(!dvl){ //下拉元素未找到，默认普通银行卡
        dvl = CNF.DICT.defaultCard;
      }

    } else {
      dvl = v;
    }

    return dvl;
  }

  /**
  初始化,银行卡类型特殊处理, 加载下拉框，银行卡类型默认值处理
  */
  useEffect(() => {

    if(type == CNF.DICT.cardKind && params.checkFlag == "1"){

      let v = item[name];
      let flag = false;
      data.map((item, idx)=>{
        if(item.id == v){
          flag = true;
        }
      })

      if(!flag){ //下拉元素未找到，默认普通银行卡
        props.setItem({
          ...item,
          [name]: CNF.DICT.defaultCard
        })
      }

    }

  }, [data]);

  useEffect(() => {
     setOption(releasedDict())
  }, [data]);

  return (
    <Select
      allowClear = {true}
      showSearch={props.showSearch ? props.showSearch: false}
      mode={props.mode||null}
      className={stl.baseSelect}
      // virtual={false}
      // getPopupContainer={triggerNode => triggerNode.parentNode}
      onClear={clearField}
      optionFilterProp={"children"}
      onChange={ (v,o)=>{updateField(v,o,name)} }
      onSelect={props.select ? props.select: null}
      onSearch={props.showSearch ? searchField : false}
      value={ defaultVal(item[name]) }>
    { option }
   </Select>
  );
}

export default BaseSelect;
