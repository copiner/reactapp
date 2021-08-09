import axios from 'axios'
import { message } from 'antd'

import { v4 as uuidv4 } from 'uuid'
import Session from '../util/session'

import CNF from '../config'

axios.defaults.timeout = 16000;
axios.defaults.baseURL = process.env.BASE_API_SEV

/*

notification.open({
  message: 'Notification Title',
  description:
    'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  onClick: () => {
    console.log('Notification Clicked!');
  },
});

*/

/*
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
*/

//加密
// const encodeSearchParams = (obj) => {
//   if (!obj) return ''
//   return Object.keys(obj).map(key => obj[key] ? (`${key}=${encodeURIComponent(obj[key])}`) : '').filter(i => i).join('&')
// }
//
// config.data = encodeSearchParams(config.data)

axios.interceptors.request.use(async config => {

  config.data.openId = Session.getItem("openId");
  config.data.reqsn = uuidv4();

  return config
}, async err => {
  // return Promise.reject(err)
  console.log(err)
})

// Add a response interceptor
/*
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});
*/

axios.interceptors.response.use(async response => {
  //console.log(response)
  //TODO
  let code = response.data.code;
  if (code != '0000') {

    if(code === '0002'){

      Session.clear();
      message.error('登陆超时，请重新登陆', 2, ()=>{
        //window.location.reload()
        window.history.go(0)
      })

    } else if(code === '0005'){//二维码扫码登陆错误信息

      //console.log(response.data.message)

    } else {
      message.error(response.data.message + "("+code+")", 5)
    }

    // return;
  }
  return response.data
}, async err => {
  //console.log(err.message)
  message.error(err.message)
  //Session.clear();
  //window.history.go(0)
  //TODO handleError
  //return Promise.reject(err)
})


export default class Http {
  static get = (url, params) => axios.get(url, { params })
  static post = (url, data) => axios.post(url, data||{})
  static put = (url, data) => axios.put(url, data)
  static delete = () => axios.delete(url, data)
}
