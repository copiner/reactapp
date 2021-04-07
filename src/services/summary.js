import HTTP from './http'
import API from './api'

export default class SummaryServer {

  // static fetchItem = fetchGoods

  static fetchList = (data) => HTTP.post(API.SUMMARY.QUERY, data)
  static updateList = (data) => HTTP.post(API.SUMMARY.UPDATE, data)
  static summartExport = (data) => HTTP.post(API.SUMMARY.EXPORT, data)

}
