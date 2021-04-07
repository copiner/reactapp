import HTTP from './http'
import API from './api'
import CNF from '../config'

// import Mock from "mockjs";
//
// const fetchD = (params) => {
//   //console.log(params)
//   const goodsList = Mock.mock({
//     "data|3-7": [
//       {
//         key: '@string("number", 5)',
//         value: "@cword(2,7)"
//       }
//     ]
//   });
//
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(goodsList);
//     }, Mock.Random.integer(100, 500));
//   });
// };

const fetchDict = (type,data) => {

  if(type === CNF.DICT.roleStatus){//角色状态固定
    return  { code:'0000', data:[
      // {typeNo:"C001",typeName: "角色状态", dataNo: '',dataName: "---请选择---"},
      {typeNo:"C001",typeName: "角色状态",dataNo: '0',dataName: "已启用"},
      {typeNo:"C001",typeName: "角色状态", dataNo: '1',dataName: "已停用"}
    ] }
  } else if(type === CNF.DICT.useFlag){//设备启用标志
    return  { code:'0000', data:[
      {typeNo:"C005",typeName: "启用标志",dataNo: '1',dataName: "启用"},
      {typeNo:"C005",typeName: "启用标志", dataNo: '0',dataName: "停用"}
    ] }
  } else if(type === CNF.DICT.departType){//设备启用标志
    return  { code:'0000', data:[
      {typeNo:"C011",typeName: "部门",dataNo: '1',dataName: "移动端"},
      {typeNo:"C011",typeName: "部门", dataNo: '2',dataName: "银行"},
      {typeNo:"C011",typeName: "部门", dataNo: '3',dataName: "营业厅"}
    ] }
  } else if(type === CNF.DICT.roleList){//查询角色接口
    return  HTTP.post(API.ROLE.QUERY, { pageSize:'200',pageNum:'1' })
  } else if(type === CNF.DICT.cardKind){//查询银行卡种类
    return  HTTP.post(API.KIND.QUERY, { pageSize:'200',pageNum:'1' ,...data})
  } else if(type === CNF.DICT.taskOperCode || type === CNF.DICT.cardKindOperCode || type === CNF.DICT.orderOperCode){//根据角色ID 查询操作员
    return  HTTP.post(API.USER.QUERY, { pageSize:'200',pageNum:'1',roleId: type})
  }  else if(type === CNF.DICT.allOper){//查询操作员
    return  HTTP.post(API.USER.QUERY, { pageSize:'200',pageNum:'1'})
  } else if(type === CNF.DICT.templeName){//查询寺院名称
    return  HTTP.post(API.TEMPLE.QUERY, { exportFlag:"0", pageSize:'200',pageNum:'1' })
  } else if(type === CNF.DICT.levName){//联想查询团购名称
    return  HTTP.post(API.DETAIL.LEVNAME, data)
  } else if(type === CNF.DICT.channelCode){//查询渠道名称
    return  HTTP.post(API.CHANNEL.QUERY, { pageSize:'200',pageNum:'1' })
  } else  {
    return  HTTP.post(API.DICT, { typeNo:type })
  }

};

export default class DictServer {

  static initDict = fetchDict

  //static initDict = (typeNo) => HTTP.post(API.DICT, { typeNo })
}
