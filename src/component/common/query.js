/*
  查询参数，统一处理
*/
import React, { useState } from "react";

export const useQuery = (params) =>{

  const [query, setQuery] = useState(params);

  //输入框
  const updateField = e => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value
    });
  };

  const emptyField = e => {
    setQuery({
      ...query,
      [e.target.name]: ''
    });
  };

  const resetField = e => {
    setQuery(params);
  };

  //日期框
  const updateDate = (date, dateString) => {

    setQuery({
      ...query,
      cdate:date,
      startTime:dateString[0],
      endTime:dateString[1]
    });
  }

  //TODO

  return {
    query,
    setQuery,
    updateField,
    emptyField,
    resetField,
    updateDate
  }
}
