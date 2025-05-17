import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/register/:role',
      name: 'Register',
      component: RegisterView,
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPasswordView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFoundView,
    },
  ],
})

//* Navigation Guard
router.beforeEach(async (to, from, next) => {
  const role = localStorage.getItem('userRole')
  const token = localStorage.getItem('authToken')

  //? Jika halaman membutuhkan otentikasi dan token tidak ada
  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  //? Jika mengakses halaman "/" dan pengguna sudah login, arahkan ke dashboard role mereka
  if (to.path === '/' && role) {
    return next(`/dashboard/${role}`)
  }

  //? Jika mengakses halaman dashboard tanpa login, arahkan ke halaman "/"
  if (to.path.startsWith('/dashboard') && !role) {
    return next('/')
  }

  //? Jika mengakses halaman dashboard dengan role yang tidak cocok
  if (to.path.startsWith('/dashboard')) {
    const expectedRole = to.params.role

    if (role && expectedRole !== role) {
      const newPath = `/dashboard/${role}${to.path.replace(`/dashboard/${expectedRole}`, '')}`
      return next(newPath)
    }
  }

  //? Cek apakah route yang diakses adalah /register/:role
  if (to.path.startsWith('/register')) {
    // Jika role tidak cocok, tidak perlu redirect ke dashboard
    return next()
  }

  //? Jika role ada dan tidak sesuai dengan URL
  if (to.params.role && to.params.role !== role) {
    return next(`/dashboard/${role}`)
  }

  //? Default, lanjutkan ke halaman yang diminta
  next()
})

export default router
