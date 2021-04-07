import React, { useState } from "react";
import { Modal, DatePicker, Button, Divider, message } from 'antd';

import ComInput from '../common/bipt'
import BaseSelect from '../common/bslt'
import ComTable from '../common/table'

import { useModalVisible } from '../common/modal';
import { useQuery } from '../common/query';

import stl from '../common/index.css'

import CNF from '../../config'

function Itemu(props){
  // console.log(props)

  const { query, setQuery, updateField, emptyField, resetField, updateDate } = props.qry;

  return (
    <div className={stl.comModal}>
      <div className={stl.lineItem}><i><b>*</b>帐户名：</i>
      {
        props.flag.action == "1"?
        <ComInput
          limit={ CNF.IPTLIT.namee }
          prefix={null}
          placeholder={ "帐户名" }
          name={ "accountName" }
          value={ query.accountName }
          clear = { emptyField }
          update={ updateField }/>:
          props.flag.userName
      }
      </div>
      <div className={stl.lineItem}><i><b>*</b>姓名：</i>
      <ComInput
        limit={ CNF.IPTLIT.nameb }
        prefix={null}
        placeholder={ "姓名" }
        name={ "custName" }
        value={ query.custName }
        clear = { emptyField }
        update={ updateField }/>
      </div>
      <div className={stl.lineItem}><i><b>*</b>手机号：</i>
      <ComInput
        limit={ CNF.IPTLIT.mobile }
        prefix={null}
        placeholder={ "手机号" }
        name={ "mobile" }
        value={ query.mobile }
        clear = { emptyField }
        update={ updateField }/>
      </div>
      <div className={stl.lineItem}><i><b>*</b>角色：(可多选)</i>
        <BaseSelect mode={"multiple"} type={ CNF.DICT.roleList } item={ query } setItem={setQuery} name={"roleArray"} />
      </div>
      <div className={stl.lineItem}><i><b>*</b>状态：</i>
        <BaseSelect  type={ CNF.DICT.roleStatus } item={ query } setItem={setQuery} name={"status"} />
      </div>

      <div className={stl.lineItem}><i>备注：</i>
      <ComInput
        limit={ CNF.IPTLIT.remark }
        prefix={null}
        placeholder={ "备注" }
        name={ "remark" }
        value={ query.remark }
        clear = { emptyField }
        update={ updateField }/>
      </div>

    </div>
  )
}

export default Itemu
