import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/months',
      name: 'months',
      // route level code-splitting
      // this generates a separate chunk (Months.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MonthsView.vue')
    },
    {
      path: '/confidants',
      name: 'confidants',
      // route level code-splitting
      // this generates a separate chunk (Confidants.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ConfidantsView.vue')
    }
  ]
})

export default router
