/**
 * 判断是否为空
 */
export const isNull = (val) => {
  if (typeof val == 'boolean') {
    return false
  }
  if (typeof val == 'number') {
    return false
  }
  if (val instanceof Array) {
    if (val.length == 0) return true
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true
  } else {
    if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true
    return false
  }
  return false
}

/**
 * 邮箱
 */
export const isEmail = (str) => {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/
  return reg.test(str)
}

/**
 * 手机号码
 */
export const isMobile = (str) => {
  const reg = /^1[3456789]\d{9}$/
  return reg.test(str)
}