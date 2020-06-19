import layout from '@/layout/index.vue'

const basicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }, {
    path: '/',
    component: layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      meta: { title: '首页' },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/dashboard/index.vue')
    }]
  }
]

export default basicRoutes