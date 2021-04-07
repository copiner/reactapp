import HTTP from './http'
import API from './api'

// import Mock from "mockjs";
//
// const fetchList = (params) => {
//
//   const goodsList = Mock.mock({
//       id: "@id()",
//       name: "@cname(10, 20)",
//       age: "@integer(1, 100)"
//   });
//
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(goodsList);
//     }, Mock.Random.integer(400, 600));
//   });
//
// };

// const fetchRecord = (params) => {
//   console.log(params)
//   const goodsList = Mock.mock({
//     "list|10": [
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

export default class HomeServer {
  static homeInfo = (data) => HTTP.post(API.BUSINESS.INFO, data)
  static homeOneCardInfo = (data) => HTTP.post(API.BUSINESS.ONEINFO, data)
  static homeOccard = (data) => HTTP.post(API.BUSINESS.OCCARD, data)

  static homeUpdateInfo = (data) => HTTP.post(API.BUSINESS.UPDATEINFO, data)

  static homeRecord = (data) => HTTP.post(API.BUSINESS.RECORD, data)

  //打印，绑银行卡，退银行卡
  static homePrintCard = (data) => HTTP.post(API.BUSINESS.PRINTCARD, data)
  static homeBindCard = (data) => HTTP.post(API.BUSINESS.BINDCARD, data)
  static homeBackCard = (data) => HTTP.post(API.BUSINESS.BACKCARD, data)
  static homeBackCardPre = (data) => HTTP.post(API.BUSINESS.BACKCARDPRE, data)
  //static allowList = ({ username, password }) => HTTP.post(API.BUSINESS.ALLOW, { username, password })
}
