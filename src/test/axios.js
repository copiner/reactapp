/*
 * @Date: 2019-01-09 14:15:14
 * @LastEditors: ken
 * @LastEditTime: 2019-01-22 10:23:34
 */
import axios from 'axios'
import {
  Notification,
  Message,
  MessageBox
} from 'element-ui'
import Authorize from '../module/authorize'
import TokenHelpers from './../helpers/token';
import Storage from './../helpers/storage';
import Router from '../../router'

const whitelist = [
  '/sendMailCode',
  '/login',
  '/checkMailCode',
  '/forgetPassword',
  '/reg',
  '/oauth/token',
  '/open'
]

axios.defaults.baseURL = process.env.BASE_API

const addPrefix = (api) => {
  const prefix = '/api/bg'
  const unAddPrefixApi = [
    '/oauth/token',
    '/api/open/logo/get'
  ]
  const isAdd = !unAddPrefixApi.some(i => i.indexOf(api) > -1) && api.indexOf(prefix) === -1
  return isAdd ? `${prefix}${api}` : api
}

const checkNeedRefreshToken = ({
  status,
  data: {
    error,
    error_description
  }
}) => {
  return status === 401 && error === 'invalid_token' && error_description.indexOf('Invalid access token') > -1
}

const encodeSearchParams = (obj) => {
  if (!obj) return ''
  return Object.keys(obj).map(key => obj[key] ? (`${key}=${encodeURIComponent(obj[key])}`) : '').filter(i => i).join('&')
}


axios.interceptors.request.use(async (config) => {

  config.url = addPrefix(config.url)
  config.url = config.url.indexOf('http') > 0 ? `http${config.spilt('http')[0]}` : config.url // axios fixbug

  config.data = encodeSearchParams(config.data)

  const needToken = !whitelist.some(item => config.url.indexOf(item) > -1)
  if (needToken) {
    config.headers.common['Authorization'] = `Bearer ${ await TokenHelpers.getAccessToken() }`
  }
  config.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
  return config
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(async response => {
  console.group('request => interceptors => response ')
  console.log('response: ', response)
  console.groupEnd()
  const {
    code,
    msg,
    respData,
    respList,
    retData,
    retCode,
    retMsg
  } = response.data

  if (code === 0 || retCode === '999999' || code === 500) {
    Message.error(msg || retMsg)
    return Promise.reject({ ...response.data,
      type: 1
    })
  }
  return respData || respList || retData || response.data
}, async err => {
  console.log(err);

  try {
    // const needRefreshToken = checkNeedRefreshToken(err.response)
    // && error_description.indexOf('Invalid access token') > -1
    if (status === 401 && error === 'invalid_token') {
      return await Authorize.refresh().then(async token => {
        const { access_token, refresh_token, token_type } = token
        const { config } = err
        await TokenHelpers.setAccessToken(access_token)
        await TokenHelpers.setRefreshToken(refresh_token)
        config.headers.Authorization = `${token_type} ${access_token}`
        return await axios.request(config)
      }).catch(errRefresh => {
        console.log(`refresh token err: `, JSON.parse(JSON.stringify(errRefresh)))
        MessageBox.confirm('用户凭证过期，可以取消继续留在该页面，或者重新登录', '登录失效', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const { hash } = window.location
          await Storage.clear()
          Router.replace({
            path: '/login',
            query: { redirect: hash.replace('#', '') }
          })
        })
      })
    } else {
      console.log(`http err status = ${ status }`, JSON.parse(JSON.stringify(err)))
      // alert('客户端错误')
      Notification.error({
        title: `${err.responseJSON.status}`,
        dangerouslyUseHTMLString: true, // duration: 5000,
        message: `
          <div>url: ${err.responseJSON.path} </div>
          <div>type: <strong> ${err.responseJSON.error} </strong></div>
          <div>error_description: <p>${err.responseJSON.message || err.responseJSON.error_description}</p></div>
        `
      })
      return Promise.reject(err)
    }
  } catch (error) {
    Notification.error({
      title: `${err.responseJSON.status}`,
      dangerouslyUseHTMLString: true, // duration: 5000,
      message: `
        <div>url: ${err.responseJSON.path} </div>
        <div>type: <strong> ${err.responseJSON.error} </strong></div>
        <div>error_description: <p>${err.responseJSON.message || err.responseJSON.error_description}</p></div>
      `
    })
    return Promise.reject({
      error_description: '服务端异常'
    })
  }
})


export default class Http {
  static get = (url, params) => axios.get(url, {
    params
  })
  static post = (url, data) => axios.post(url, data)
  static put = (url, data) => axios.put(url, data)
  static delete = () => axios.delete(url, data)
}
