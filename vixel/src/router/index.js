import { createRouter, createWebHistory } from 'vue-router'

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
      component: () => import('../views/admin/DashboardView.vue')
    }
  ],
  // Fitur untuk otomatis scroll ke atas setiap pindah halaman
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

export default router
