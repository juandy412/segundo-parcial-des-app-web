<!-- Dashboard: contenedor principal con layout -->
<!-- Usa componentes reutilizables NavbarComponent, SidebarComponent, FooterComponent -->
<template>
  <div class="dashboard-layout">
    <SidebarComponent @logout="cerrarSesion" />
    <div class="main-content">
      <NavbarComponent />
      <div class="content-area">
        <router-view />
      </div>
      <FooterComponent />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { logout } from '../services/authService'
import SidebarComponent from '../components/SidebarComponent.vue'
import NavbarComponent from '../components/NavbarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'

const router = useRouter()
function cerrarSesion() {
  logout()
  router.push('/login')
}
</script>

<style scoped>
.dashboard-layout { display: flex; min-height: 100vh; background: #f0f4f8; }
.main-content { margin-left: 230px; flex: 1; display: flex; flex-direction: column; }
.content-area { padding: 1.5rem; flex: 1; }
</style>