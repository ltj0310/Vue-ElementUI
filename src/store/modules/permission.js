/**
 * 路由状态管理
 */
import asyncRoutes from '@/router/routes/asyncRoutes'

/**
 * 
 * @param {*} route 
 * @param {*} roles 
 */
const hasPermission = (route, roles) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 
 * @param {*} routes asyncRoutes
 * @param {*} roles 
 */
const filterAsyncRoute = (routes, roles) => {
  const res = []

  routes.forEach(route => {
    const temp = { ...route }
    if (hasPermission(temp, roles)) {
      if (temp.children) {
        temp.children = filterAsyncRoute(temp.children, roles)
      }
      res.push(temp)
    }
  })

  return res
}

const state = {
  menu: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.menu = routes
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoute(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}