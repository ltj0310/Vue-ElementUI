import { isNull } from './validate'
export const setStorage = (params = {}) => {
  const { name, type, content } = params
  const obj = {
    type,
    content,
    dataType: typeof content,
    initTime: +new Date()
  }
  if (type)
    window.sessionStorage.setItem(name, JSON.stringify(obj));
  else
    window.localStorage.setItem(name, JSON.stringify(obj));
}

export const getStorage = (params = {}) => {
  const { name, debug } = params
  let obj = {}, content
  obj = window.sessionStorage.getItem(name)
  /**
   * 先判断sessionStorage内是否有需要的数据
   * 有则跳过以下2个if判断
   * 无则判断localStorage内是否有数据
   */
  if (isNull(obj))
    obj = window.localStorage.getItem(name)
  if (isNull(obj)) 
    return null
  
  try {
    obj = JSON.parse(obj)
  } catch {
    return obj
  }

  if (debug) return obj

  if (obj.dataType == 'string') {
    content = obj.content
  } else if (obj.dataType == 'number') {
    content = Number(obj.content)
  } else if (obj.dataType == 'boolean') {
    content = eval(obj.content)
  } else if (obj.dataType == 'object') {
    content = obj.content
  }

  return content
}

export const removeStorage = (params = {}) => {
  const { name, type } = params
  if (type) 
    window.sessionStorage.removeItem(name)
  else
    window.localStorage.removeItem(name)
}