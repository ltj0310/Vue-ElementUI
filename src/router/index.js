import Vue from 'vue'
import VueRouter from 'vue-router'
import basicRoutes from './routes/basicRoutes'

Vue.use(VueRouter)

const routes = [...basicRoutes]

const createRouter = () => new VueRouter({
  routes
})

const router = createRouter()

/**
 * 重置路由
 */
export const resetRouter = () => {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
