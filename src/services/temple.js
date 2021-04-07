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

export default class TempleServer {

  // static fetchItem = fetchGoods

  static fetchList = (data) => HTTP.post(API.TEMPLE.QUERY, data)

  static templeModify = (data) => HTTP.post(API.TEMPLE.MODIFY, data)

  //static fetchBusinessList = ({ userId }) => Http.get(API.KIND.BUSINESS_LIST, { userId })
}
