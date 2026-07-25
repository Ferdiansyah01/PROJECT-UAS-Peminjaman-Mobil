import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { title: 'Beranda - Peminjaman Mobil' }
  },
  {
    path: '/cars/:id',
    name: 'CarDetail',
    component: () => import('../views/CarDetailView.vue'),
    meta: { title: 'Detail Mobil - Peminjaman Mobil' }
  },
  {
    path: '/borrowed',
    name: 'Borrowed',
    component: () => import('../views/BorrowedView.vue'),
    meta: { title: 'Daftar Peminjaman - Peminjaman Mobil' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    meta: { title: 'Tentang - Peminjaman Mobil' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Peminjaman Mobil'
  next()
})

export default router
