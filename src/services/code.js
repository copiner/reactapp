import HTTP from './http'
import API from './api'

export default class CodeServer {
  static fetchCode = (data) => HTTP.post(API.CODE, data)
}
