import HTTP from './http'
import API from './api'

export default class RecordServer {

  // static fetchItem = fetchGoods

  static fetchList = (data) => HTTP.post(API.RECORD.QUERY, data)

}
