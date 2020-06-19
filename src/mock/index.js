import Mock from 'mockjs'
import user from './user'

import { param2Obj } from '@/utils'

// Mock拦截axios的时间
Mock.setup({
  timeout: '1000-1200'
});

const mocks = [...user]

const response = (respond) => {
  return function(options) {
    let result = null
    if (respond instanceof Function) {
      const { body, type, url } = options
      result = respond({
        method: type,
        body: JSON.parse(body),
        query: param2Obj(url)
      })
    } else {
      result = respond
    }
    return Mock.mock(result)
  }
}

export default mocks.map(route => {
  return Mock.mock(new RegExp(route.url), route.type || 'get', response(route.response))
})