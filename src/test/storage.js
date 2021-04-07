/*
 * @Date: 2019-01-09 14:15:14
 * @LastEditors: ken
 * @LastEditTime: 2019-01-09 18:41:19
 */
const storage = window.localStorage

const isLocalStorageSupported = (() => {
  const testSecret = 'test'
  try {
    storage.setItem(testSecret, 'testValue')
    storage.removeItem(testSecret);
    return true
  } catch (error) {
    return false;
  }
})();

if(!isLocalStorageSupported) {
  alert('浏览不支持localStorage, 查看是否开启无痕浏览')
}

export default class Storage {

  static async get(key) {
    const data = storage[key]
    try {
      return JSON.parse(data)
    } catch (error) {
      return data
    }
  }

  static async set(key, values) {
    if(typeof values === 'string') {
      storage.setItem(key, values)
    } else if (typeof values === 'object') {
      storage.setItem(key, JSON.stringify(values))
    } else {
      throw Error(`storage.setItem err, check values. ${values}`)
    }
  }

  static async reomve(key) {
    storage.removeItem(key)
  }

  static async clear() {
    storage.clear()
  }
}
