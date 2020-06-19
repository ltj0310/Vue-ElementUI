import Cookies from 'js-cookie'

export const setCookie = (key, value) => {
  return Cookies.set(key, value)
}

export const getCookie = (key) => {
  return Cookies.get(key)
}

export const removeCookie = (key) => {
  return Cookies.remove(key)
}