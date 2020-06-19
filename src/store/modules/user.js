/**
 * 用户状态管理
 */
import { login, logout, getInfo } from '@/api/user/login'
import { setCookie, getCookie, removeCookie } from '@/utils/cookie'
import { resetRouter } from '@/router'

const state = {
  token: getCookie('token') || '',
  name: '',
  avatar: '',
  roles: [],
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_NAME: (state, name) => {
    state.name = name
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { user, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ user: user.trim(), password: password })
        .then(response => {
          const { data } = response
          commit('SET_TOKEN', data.data.token)
          setCookie('token', data.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
    })
  },

  logout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_AVATAR', '')
        commit('SET_NAME', '')

        removeCookie('token')

        // 文档解释 https://vuex.vuejs.org/zh/guide/modules.html
        dispatch('system/closeAllTags', null, { root:true }) //清空面包屑导航

        resetRouter()
        
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        const { roles, avatar, name } = data.data
        commit('SET_ROLES', roles)
        commit('SET_AVATAR', avatar)
        commit('SET_NAME', name)
        resolve(data.data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_AVATAR', '')
      commit('SET_NAME', '')

      removeCookie('token')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}