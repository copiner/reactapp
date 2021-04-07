import axios from 'axios'
import HTTP from './http'
import API from './api'

// import Mock from "mockjs";
//
// const fetchGoods = (params) => {
//   console.log(params)
//   const goodsList = Mock.mock({
//     "list|10": [
//       {
//         id: "@id()",
//         name: "@cname(10, 20)",
//         img: "@img(64x64)",
//         price: "@float(0.01, 9999.99)",
//         stock: "@integer(10, 200)"
//       }
//     ],
//     total: 100
//   });
//
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(goodsList);
//     }, Mock.Random.integer(500, 1000));
//   });
// };

export default class TaskServer {

  static fetchList = (data) => HTTP.post(API.TASK.QUERY, data)
  static taskUpload = (data) => HTTP.post(API.TASK.UPLOAD, data)
  static taskSubmit = (data) => HTTP.post(API.TASK.SUBMIT, data)

  static taskDetail = (data) => HTTP.post(API.TASK.DETAIL, data)
  static taskOpen = (data) => HTTP.post(API.TASK.OPEN, data)

  static taskExport = (data) => HTTP.post(API.DETAIL.EXPORT, data)

  // static fetchList = ({ orderVersions, size, page, userId, mobile, sourceId, cardId, realName, startTime, endTime }) => Http.get(API.KIND.LIST, { orderVersions, size, page, userId, mobile, sourceId, cardId, realName, startTime, endTime })
  // static update = ({ loanMinAmount, loanMaxAmount, userId }) => Http.post(API.KIND.UPDATE, { loanMinAmount, loanMaxAmount, userId })
  // static select = ({ id, userId }) => Http.post(API.KIND.SELECT, { id, userId })
  // static fetchBusinessList = ({ userId }) => Http.get(API.KIND.BUSINESS_LIST, { userId })
}
