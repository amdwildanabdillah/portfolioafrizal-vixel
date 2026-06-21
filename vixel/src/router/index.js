import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/utils/supabase' // Import supabase client

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // --- PUBLIC ROUTES ---
    {
      path: '/',
      name: 'home',
      component: () => import('../views/public/HomeView.vue')
    },
    {
      path: '/work/:category',
      name: 'category',
      component: () => import('../views/public/CategoryView.vue')
    },
    {
      path: '/project/:id',
      name: 'project-detail',
      component: () => import('../views/public/ProjectDetailView.vue')
    },

    // --- ADMIN ROUTES ---
    {
      path: '/admin',
      name: 'admin-login',
      component: () => import('../views/admin/LoginView.vue')
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/admin/DashboardView.vue'),
      meta: { requiresAuth: true } // Kunci rute ini
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// Pengecekan sesi user sebelum pindah halaman
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const { data: { session } } = await supabase.auth.getSession()

    if (session) {
      next() // User login, silakan masuk
    } else {
      next('/admin') // Belum login, tendang ke halaman login
    }
  } else {
    next() // Halaman public, bebas akses
  }
})

export default router