import layout from '@/layout/index.vue'

const asyncRoutes = [
  {
    path: '/system',
    name: 'system',
    meta: { icon: 'setting', title: '系统管理' },
    component: layout,
    redirect: '/system/user',
    children: [{
      path: '/system/user',
      name: 'user',
      meta: { roles: ['admin'], icon: 'user', title: '用户管理' },
      component: () => import('@/views/system/user')
    }]
  }
]

export default asyncRoutes