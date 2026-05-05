import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProductView from '../views/ProductView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  {
    path: '/dashboard',
    component: DashboardView,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('isLoggedIn') === 'true') next()
      else next('/login')
    },
    children: [
      {
        path: 'productos',
        component: ProductView
      }
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})