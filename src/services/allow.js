import HTTP from './http'
import API from './api'

// import Mock from "mockjs";
//
// const fetchList = (params) => {
//
//   const goodsList = Mock.mock({
//     "list|1000": [
//       {
//         id: "@id()",
//         price: "@float(0.01, 9999.99)",
//         stock: "@integer(10, 200)"
//       }
//     ],
//     total: 1000
//   });
//
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(goodsList);
//     }, Mock.Random.integer(400, 600));
//   });
// };

export default class AllowServer {
  static fetchList = (data) => HTTP.post(API.ALLOW.QUERY, data)
  static kindUpdate = (data) => HTTP.post(API.ALLOW.MODIFY, data)
  //static allowList = ({ username, password }) => HTTP.post(API.BUSINESS.ALLOW, { username, password })
}
