import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProductView from '../views/ProductView.vue'
import HomeView from '../views/HomeView.vue'

// Guard de navegación: protege rutas privadas
const guard = (to, from, next) => {
  if (localStorage.getItem('isLoggedIn') === 'true') next()
  else next('/login')
}

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  {
    path: '/dashboard',
    component: DashboardView,
    beforeEnter: guard,
    children: [
      { path: '', component: HomeView },
      { path: 'productos', component: ProductView }
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})