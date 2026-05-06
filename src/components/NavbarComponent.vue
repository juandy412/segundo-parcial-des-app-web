<!-- Navbar superior reutilizable -->
<!-- Fuente Bootstrap: https://getbootstrap.com/docs/5.3/components/navbar/ -->
<template>
  <header class="top-navbar">
    <span class="navbar-title">
      <i class="bi bi-mortarboard-fill me-2"></i>Sistema de Gestión — ITAL
    </span>
    <div class="d-flex align-items-center gap-3">
      <span class="badge" :style="esProfesor ? 'background:var(--ital-accent);color:#000' : 'background:var(--ital-secondary)'">
        <i :class="esProfesor ? 'bi bi-person-workspace' : 'bi bi-mortarboard'" class="me-1"></i>
        {{ esProfesor ? 'Profesor' : 'Estudiante' }}
      </span>
      <span class="navbar-user">
        <i class="bi bi-person-circle me-1"></i>{{ usuario }}
      </span>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { getRol } from '../services/authService'

const usuario = localStorage.getItem('currentUser') || 'Usuario'
const esProfesor = computed(() => getRol() === 'profesor')
</script>

<style scoped>
.top-navbar {
  background: #fff;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dee2e6;
  font-size: 0.9rem;
  position: sticky;
  top: 0; z-index: 100;
}
.navbar-title { font-weight: 600; color: var(--ital-primary); }
.navbar-user { color: var(--ital-muted); }
</style>