import request from '@/utils/axios'

export const login = (params) => {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      ...params
    }
  })
}

export const getInfo = (token) => {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export const logout = () => {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}