<!-- Vista de bienvenida del Dashboard -->
<template>
  <div>
    <div class="bienvenida-card mb-4">
      <div class="bienvenida-icon">
        <i :class="esProfesor ? 'bi bi-person-workspace' : 'bi bi-mortarboard-fill'"></i>
      </div>
      <div>
        <h4 class="fw-bold mb-1">
          Bienvenido, <span style="color:var(--ital-accent)">{{ usuario }}</span> 👋
        </h4>
        <p class="mb-0 text-white-50">
          {{ esProfesor
            ? 'Sesión como Profesor — puedes gestionar productos, precios y stock.'
            : 'Sesión como Estudiante — explora los productos y realiza compras.' }}
        </p>
      </div>
    </div>

    <!-- Resumen — Bootstrap grid -->
    <div class="row g-3 mb-4">
      <div class="col-sm-6 col-md-4">
        <div class="resumen-card">
          <div class="resumen-icon" style="background:#e8f0fb;color:var(--ital-primary)">
            <i class="bi bi-box-seam-fill"></i>
          </div>
          <div>
            <p class="resumen-label">Productos</p>
            <h3 class="resumen-valor">{{ totalProductos }}</h3>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-md-4">
        <div class="resumen-card">
          <div class="resumen-icon" style="background:#fff3cd;color:#856404">
            <i class="bi bi-archive-fill"></i>
          </div>
          <div>
            <p class="resumen-label">Unidades en stock</p>
            <h3 class="resumen-valor">{{ totalStock }}</h3>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-md-4">
        <div class="resumen-card">
          <div class="resumen-icon" style="background:#d1e7dd;color:#0a3622">
            <i class="bi bi-tags-fill"></i>
          </div>
          <div>
            <p class="resumen-label">Categorías</p>
            <h3 class="resumen-valor">{{ totalCategorias }}</h3>
          </div>
        </div>
      </div>
    </div>

    <h6 class="fw-bold mb-3" style="color:var(--ital-primary)">Acceso rápido</h6>
    <div class="row g-3">
      <div class="col-sm-6 col-md-4">
        <router-link to="/dashboard/productos" class="acceso-card text-decoration-none">
          <i class="bi bi-box-seam fs-2 mb-2" style="color:var(--ital-primary)"></i>
          <span class="fw-semibold">{{ esProfesor ? 'Gestionar Productos' : 'Ver Productos' }}</span>
          <small class="text-muted">{{ esProfesor ? 'Editar precios y stock' : 'Explorar y comprar' }}</small>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getProducts } from '../services/productService'
import { getRol } from '../services/authService'

const usuario = localStorage.getItem('currentUser') || 'Usuario'
const esProfesor = computed(() => getRol() === 'profesor')
const productos = ref([])
onMounted(() => { productos.value = getProducts() })

const totalProductos = computed(() => productos.value.length)
const totalStock = computed(() => productos.value.reduce((a, p) => a + p.stock, 0))
const totalCategorias = computed(() => new Set(productos.value.map(p => p.categoria)).size)
</script>

<style scoped>
.bienvenida-card {
  background: linear-gradient(135deg, var(--ital-primary), var(--ital-secondary));
  border-radius: 14px; padding: 1.5rem;
  display: flex; align-items: center; gap: 1.25rem; color: #fff;
}
.bienvenida-icon {
  font-size: 2.5rem; width: 64px; height: 64px;
  background: rgba(255,255,255,0.15); border-radius: 50%;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.resumen-card {
  background: #fff; border-radius: 12px; padding: 1.25rem;
  display: flex; align-items: center; gap: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
}
.resumen-icon {
  width: 50px; height: 50px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.4rem; flex-shrink: 0;
}
.resumen-label { font-size: 0.78rem; color: #6c757d; margin: 0; }
.resumen-valor { font-size: 1.6rem; font-weight: 700; color: var(--ital-text); margin: 0; }
.acceso-card {
  background: #fff; border-radius: 12px; padding: 1.25rem;
  display: flex; flex-direction: column;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  transition: transform 0.2s; color: var(--ital-text);
}
.acceso-card:hover { transform: translateY(-3px); }
</style>
