import HTTP from './http'
import API from './api'

// import Mock from "mockjs";
//
// const fetchItems = (params) => {
//
//   const goodsList = Mock.mock({
//     "list|100": [
//       {
//         id: "@id()",
//         name: "@cname(10, 20)",
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
//
// };

export default class UserServer {
  //static fetList = fetchItems
  static fetList = (data) => HTTP.post(API.USER.QUERY, data)
  static userAdd = (data) => HTTP.post(API.USER.ADD, data)

  static userUpdate = (data) => HTTP.post(API.USER.UPDATE, data)
  static userDelete = (data) => HTTP.post(API.USER.DELETE, data)

  static userEnable = (data) => HTTP.post(API.USER.ENABLE, data)
  static userDisable = (data) => HTTP.post(API.USER.DISABLE, data)

  static userReset = (data) => HTTP.post(API.USER.RESET, data)
}
