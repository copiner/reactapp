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

export default class RoleServer {
  //static fetList = fetchItems
  static fetList = (data) => HTTP.post(API.ROLE.QUERY, data)
  static roleAdd = (data) => HTTP.post(API.ROLE.ADD, data)
  static roleUpdate = (data) => HTTP.post(API.ROLE.UPDATE, data)
  static roleDelete = (data) => HTTP.post(API.ROLE.DELETE, data)

  static roleEnable = (data) => HTTP.post(API.ROLE.ENABLE, data)
  static roleDisable = (data) => HTTP.post(API.ROLE.DISABLE, data)

  static roleMenu = (data) => HTTP.post(API.ROLE.ROLEMENU, data)
  static roleAuthMenu = (data) => HTTP.post(API.ROLE.ROLEAUTHMENU, data)
  static roleSetMenu = (data) => HTTP.post(API.ROLE.ROLESETMENU, data)
  static roleUser = (data) => HTTP.post(API.USER.QUERY, data)
  static roleDelUser = (data) => HTTP.post(API.ROLE.ROLEDELUSER, data)
}
