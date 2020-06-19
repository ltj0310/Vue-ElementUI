/**
 * system状态管理
 */
import { setStorage, getStorage  } from '@/utils/storage'

const state = {
  collapse: false,
  tagsView: getStorage({ name: 'tagsView' }) || []
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.collapse = !state.collapse
  },
  ADD_TAGS: (state, tags) => {
    if (state.tagsView.some(i => i.path === tags.path)) return //路由一样，不执行

    state.tagsView.push(Object.assign({
      path: tags.path,
      name: tags.name,
      fullPath: tags.fullPath,
      title: tags.meta.title,
      query: tags.query
    }))

    setStorage({
      name: 'tagsView',
      content: state.tagsView,
      type: 'session'
    })
  },
  CLOSE_TAGS: (state, tag) => {
    for (const [i, v] of state.tagsView.entries()) {
      if (v.path === tag) {
        state.tagsView.splice(i, 1)
        break
      }
    }
    setStorage({
      name: 'tagsView',
      content: state.tagsView,
      type: 'session'
    })
  },
  CLOSE_OTHER_TAGS: (state, tag) => {
    state.tagsView = state.tagsView.filter(i => {
      return i.path === '/dashboard' || i.path === tag
    })
    setStorage({
      name: 'tagsView',
      content: state.tagsView,
      type: 'session'
    })
  },
  CLOSE_ALL_TAGS: state => {
    state.tagsView = state.tagsView.filter(i => {
      return i.path === '/dashboard'
    })
    setStorage({
      name: 'tagsView',
      content: state.tagsView,
      type: 'session'
    })
  },
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  addTags({ commit }, tags) {
    commit('ADD_TAGS', tags)
  },
  closeTag({ commit, state }, tag) {
    return new Promise(resolve => {
      commit('CLOSE_TAGS', tag)
      resolve([...state.tagsView])
    })
  },
  closeOtherTags({ commit, state }, tag) {
    return new Promise(resolve => {
      commit('CLOSE_OTHER_TAGS', tag)
      resolve([...state.tagsView])
    })
  },
  closeAllTags({ commit, state }) {
    return new Promise(resolve => {
      commit('CLOSE_ALL_TAGS')
      resolve([...state.tagsView])
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}