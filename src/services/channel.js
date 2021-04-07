import HTTP from './http'
import API from './api'

export default class ChannelServer {

  // static fetchItem = fetchGoods

  static fetchList = (data) => HTTP.post(API.CHANNEL.QUERY, data)
  static channelAdd = (data) => HTTP.post(API.CHANNEL.ADD, data)
  static channelUpdate = (data) => HTTP.post(API.CHANNEL.UPDATE, data)

}
