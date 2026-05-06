<!-- Sidebar reutilizable — Fuente Vue Router: https://router.vuejs.org -->
<template>
  <nav class="sidebar">
    <div class="sidebar-brand">
      <div class="brand-escudo">ITAL</div>
      <div>
        <span class="brand-name">Alfonso López</span>
        <span class="brand-sub">Inst. Técnico</span>
      </div>
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
    <button class="btn-logout" @click="$emit('logout')">
      <i class="bi bi-box-arrow-left"></i> Cerrar sesión
    </button>
  </nav>
</template>

<script setup>
defineEmits(['logout'])
</script>

<style scoped>
.sidebar {
  width: 230px; background: var(--ital-primary);
  display: flex; flex-direction: column;
  padding: 1.5rem 1rem; gap: 1rem;
  position: fixed; height: 100vh;
  top: 0; left: 0; z-index: 200;
}
.sidebar-brand {
  display: flex; align-items: center; gap: 10px;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.15);
}
.brand-escudo {
  width: 40px; height: 40px; border-radius: 50%;
  background: var(--ital-accent); color: var(--ital-primary);
  font-weight: 700; font-size: 0.75rem;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.brand-name { color: #fff; font-size: 0.8rem; font-weight: 600; display: block; }
.brand-sub { color: rgba(255,255,255,0.6); font-size: 0.7rem; display: block; }
.sidebar-menu { list-style: none; padding: 0; margin: 0; flex: 1; }
.sidebar-menu li a {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 14px; border-radius: 8px;
  color: rgba(255,255,255,0.75); text-decoration: none;
  font-size: 0.9rem; transition: background 0.2s; margin-bottom: 4px;
}
.sidebar-menu li a:hover,
.sidebar-menu li a.active { background: rgba(255,255,255,0.15); color: #fff; }
.btn-logout {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff; border-radius: 8px;
  padding: 8px 14px; font-size: 0.85rem;
  cursor: pointer; text-align: left;
  transition: background 0.2s; width: 100%;
}
.btn-logout:hover { background: rgba(220,53,69,0.6); }
</style>