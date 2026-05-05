<template>
  <div class="dashboard-layout">

    <nav class="sidebar">
      <div class="sidebar-brand">
        <div class="brand-escudo">ITAL</div>
        <span class="brand-name">Alfonso López</span>
      </div>
      <ul class="sidebar-menu">
        <li>
          <router-link to="/dashboard" exact-active-class="active">
            <i class="bi bi-grid-fill"></i> Dashboard
          </router-link>
        </li>
        <li>
          <router-link to="/dashboard/productos" active-class="active">
            <i class="bi bi-box-seam"></i> Productos
          </router-link>
        </li>
      </ul>
      <button class="btn-logout" @click="cerrarSesion">
        <i class="bi bi-box-arrow-left"></i> Cerrar sesión
      </button>
    </nav>

    <div class="main-content">
      <header class="top-navbar">
        <span class="navbar-title">
          <i class="bi bi-mortarboard-fill me-2"></i>
          Sistema de Gestión — ITAL
        </span>
        <span class="navbar-user">
          <i class="bi bi-person-circle me-1"></i>
          {{ usuario }}
        </span>
      </header>

      <div class="content-area">
        <router-view />
      </div>
    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { logout } from '../services/authService'

const router = useRouter()
const usuario = localStorage.getItem('currentUser') || 'Usuario'

function cerrarSesion() {
  logout()
  router.push('/login')
}
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: #f0f4f8;
}

.sidebar {
  width: 230px;
  background: var(--ital-primary);
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  gap: 1rem;
  position: fixed;
  height: 100vh;
  top: 0; left: 0;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.15);
}

.brand-escudo {
  width: 40px; height: 40px;
  border-radius: 50%;
  background: var(--ital-accent);
  color: var(--ital-primary);
  font-weight: 700; font-size: 0.75rem;
  display: flex; align-items: center; justify-content: center;
}

.brand-name {
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1.2;
}

.sidebar-menu {
  list-style: none;
  padding: 0; margin: 0;
  flex: 1;
}

.sidebar-menu li a {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 8px;
  color: rgba(255,255,255,0.75);
  text-decoration: none;
  font-size: 0.9rem;
  transition: background 0.2s;
  margin-bottom: 4px;
}

.sidebar-menu li a:hover,
.sidebar-menu li a.active {
  background: rgba(255,255,255,0.15);
  color: #fff;
}

.btn-logout {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 0.85rem;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s;
}
.btn-logout:hover { background: rgba(220,53,69,0.6); }

.main-content {
  margin-left: 230px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.top-navbar {
  background: #fff;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dee2e6;
  font-size: 0.9rem;
}

.navbar-title {
  font-weight: 600;
  color: var(--ital-primary);
}

.navbar-user {
  color: var(--ital-muted);
}

.content-area {
  padding: 1.5rem;
}
</style>