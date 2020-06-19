const getters = {
  collapse: state => state.system.collapse,
  tagsView: state => state.system.tagsView,
  menu: state => state.permission.menu,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  token: state => state.user.token
}

export default getters