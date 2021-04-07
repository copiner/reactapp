import React, { useState } from "react";
import { Modal, DatePicker, Button, Divider, message } from 'antd';

import ComInput from '../common/bipt'
import BaseSelect from '../common/bslt'
import ComTable from '../common/table'

import { useModalVisible } from '../common/modal';
import { useQuery } from '../common/query';

import stl from '../common/index.css'

import CNF from '../../config'

function Itemr(props){
  // console.log(props)
  const { query, setQuery, updateField, emptyField, resetField, updateDate } = props.qry;

  return (
    <div className={stl.comModal}>
      <div className={stl.lineItem}><i><b>*</b>角色名称：</i>
      <ComInput
        limit={ CNF.IPTLIT.nameb }
        prefix={null}
        placeholder={ "角色名称" }
        name={ "roleName" }
        value={ query.roleName }
        clear = { emptyField }
        update={ updateField }/>
      </div>
      <div className={stl.lineItem}><i><b>*</b>角色代码：</i>
      <ComInput
        limit={ CNF.IPTLIT.named }
        prefix={null}
        placeholder={ "角色代码" }
        name={ "roleCode" }
        value={ query.roleCode }
        clear = { emptyField }
        update={ updateField }/>
      </div>
    </div>
  )
}

export default Itemr
