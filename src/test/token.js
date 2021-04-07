/*
 * @Date: 2019-01-09 14:15:14
 * @LastEditors: ken
 * @LastEditTime: 2019-01-09 18:41:15
 */
import Cache from './storage'

const get = async(key) => Cache.get(key)
const set = async(key, value) => {
  Cache.set(key, value)
}

const accessTokenSecret = 'atoken'
const refreshToken = 'rtoken'

export default class TokenHelpers {

  static getAccessToken = async() => get(accessTokenSecret)
  static setAccessToken = async values => set(accessTokenSecret, values)

  static getRefreshToken = async() => get(refreshToken)
  static setRefreshToken = async values => set(refreshToken, values)

}
