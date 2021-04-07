import HTTP from './http'
import API from './api'

export default class OrderServer {

  static fetchList = (data) => HTTP.post(API.ORDER.QUERY, data)
  static orderExport = (data) => HTTP.post(API.ORDER.EXPORT, data)

}
