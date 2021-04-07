/*
  限定性 输入框组件
*/
import React from 'react';
import { Input, message } from 'antd';

function ComInput(props) {
  //console.log(props)

  let { limit } = props;

  const validateField = e => {
    if(!limit.reg.test(props.value) && props.value){
      message.warning(limit.msg);
      props.clear(e);
    }
  };


  return (
      props.password ?
      <Input.Password
        prefix={ props.prefix }
        placeholder = { props.placeholder }
        name={ props.name }
        value={ props.value }
        onKeyDown={props.bindKeys||""}
        onBlur={ validateField }
        onChange={ props.update }
        /> :
      <Input
        prefix={ props.prefix }
        placeholder = { props.placeholder }
        name={ props.name }
        maxLength={props.maxLength||""}
        value={ props.value }
        onBlur={ validateField }
        onChange={ props.update }
        />
  );
}

export default ComInput;
