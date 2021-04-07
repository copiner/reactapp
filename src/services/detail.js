import HTTP from './http'
import API from './api'

export default class DetailServer {

  static fetchList = (data) => HTTP.post(API.DETAIL.QUERY, data)
  static detailExport = (data) => HTTP.post(API.DETAIL.EXPORT, data)

  // static fetchList = ({ orderVersions, size, page, userId, mobile, sourceId, cardId, realName, startTime, endTime }) => Http.get(API.KIND.LIST, { orderVersions, size, page, userId, mobile, sourceId, cardId, realName, startTime, endTime })
  // static update = ({ loanMinAmount, loanMaxAmount, userId }) => Http.post(API.KIND.UPDATE, { loanMinAmount, loanMaxAmount, userId })
  // static select = ({ id, userId }) => Http.post(API.KIND.SELECT, { id, userId })
  // static fetchBusinessList = ({ userId }) => Http.get(API.KIND.BUSINESS_LIST, { userId })
}
