import HTTP from './http'
import API from './api'

// import Mock from "mockjs";
//
// const fetchUser = (params) => {
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
//     }, Mock.Random.integer(100, 500));
//   });
// };

export default class LoginServer {

  static loginIn = (data) => HTTP.post(API.LOGIN.SIGNIN, data)
  static signpic = (oriId) => HTTP.post(API.LOGIN.SIGNPIC, { oriId })
  static loginOut = () => HTTP.post(API.LOGIN.SIGNPIC)

  static correctIn = (data) => HTTP.post(API.LOGIN.CORRECT,data)

  static codeIn = (data) => HTTP.post(API.LOGIN.CODE,data)
  static codescanIn = (data) => HTTP.post(API.LOGIN.CODESCAN,data)

  static menuIn = (data) => HTTP.post(API.LOGIN.MENUIN,data)
}
