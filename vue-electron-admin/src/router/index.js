import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/Home.vue'
import LoginPage from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'  // 将根路径重定向到登录页
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: { requiresAuth: false }
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  if (to.meta.requiresAuth) {
    if (!token) {
      next('/login')
    } else {
      next()
    }
  } else {
    if (token && to.path === '/login') {
      next('/home')  // 已登录时重定向到home
    } else {
      next()
    }
  }
})

export default router 