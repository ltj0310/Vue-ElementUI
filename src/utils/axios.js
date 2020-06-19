import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 25000,
  headers: {}
})

/**
 * http请求拦截
 */
service.interceptors.request.use(config => {
  NProgress.start()

  if (store.getters.token) {
    config.headers['authorize'] = store.getters.token
  }

  return config
}, error => {
  console.log(error) // for debug

  return Promise.reject(new Error(error))
})

/**
 * http响应拦截
 */
service.interceptors.response.use(response => {
  NProgress.done()

  const res = response.data
  if (res.code !== 200) {
    Message({
      message: res.message || 'ERROR',
      type: 'error'
    })
  }

  return response
}, error => {
  NProgress.done()

  console.log(error) // for debug
  Message({
    message: error.message,
    type: 'error'
  })

  return Promise.reject(new Error(error))
})

export default service