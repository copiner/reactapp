/** 新增&&修改本地缓存
 *  @param {string} key 标示
 *  @param {string} value 新增&修改的值
 */
const setItem = (key, value) => {
  let temple = window.sessionStorage.__temple__
  if (!temple) {
    temple = {}
  } else {
    temple = JSON.parse(temple)
    if (!temple[key]) {
      temple[key] = {}
    }
  }
  temple[key] = value
  window.sessionStorage.__temple__ = JSON.stringify(temple)
}
/** 查询本地缓存
 *  @param {string} key 标示
 *  @param {string} def 如果查询不到显示的值
 */
const getItem = (key) => {
  const temple = window.sessionStorage.__temple__
  if (!temple) {
    return null
  }
  const ret = JSON.parse(temple)[key]
  if (!ret) {
    return null
  }
  return ret
}

/** 清除本地缓存
 *  @param {string} key 标示
 *  @param {string} def 如果查询不到显示的值
 */
const removeItem = (key) => {
  let temple = window.sessionStorage.__temple__
  if (!temple) {
    return
  }
  temple = JSON.parse(temple)
  if (!temple[key]) {
    temple[key] = null
  }
  window.sessionStorage.__temple__ = JSON.stringify(temple)
}

const clear = () => {
  window.sessionStorage.removeItem('__temple__')
}


export default {
  setItem,
  getItem,
  removeItem,
  clear
}
