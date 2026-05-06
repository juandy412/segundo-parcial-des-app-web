<!-- Footer reutilizable con derechos reservados -->
<template>
  <footer class="app-footer">
    <span>
      <i class="bi bi-building me-1"></i>
      © {{ anio }} Instituto Técnico Alfonso López — ITAL. Todos los derechos reservados.
    </span>
    <span class="text-muted small">Desarrollo de Aplicaciones Web</span>
  </footer>
</template>

<script setup>
const anio = new Date().getFullYear()
</script>

<style scoped>
.app-footer {
  background: #fff; border-top: 1px solid #dee2e6;
  padding: 0.85rem 1.5rem;
  display: flex; justify-content: space-between; align-items: center;
  font-size: 0.8rem; color: var(--ital-text);
}
</style>