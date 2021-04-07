/*
  table列表组件 开发
*/
import React, { useState, useEffect } from "react";
import { Tree } from "antd";

const TreeList = (props) => {

  let checkedData = props.menu.check || [];
  let treeData = props.menu.tree || [];

  const [menu, setMenu] = useState([]);

  useEffect(() => {

    setMenu(checkedData)
    props.setResource(checkedData)

  },[checkedData]);


   const onCheck = (checkedKeys, info) => {
      setMenu(checkedKeys)
      props.setResource([...checkedKeys, ...info.halfCheckedKeys])
     //console.log([...checkedKeys, ...info.halfCheckedKeys]);//传递halfCheckedKeys, checkedKeys
   };

  // console.log(menu)
  return (
      <>
       {
          treeData.length ? (
            <Tree
               checkable
               defaultExpandAll
               checkedKeys={ menu }
               onCheck={ onCheck }
               treeData={ treeData }
             />
          ) : (
            'loading tree'
          )
       }
       </>
  );

};

export default TreeList;
