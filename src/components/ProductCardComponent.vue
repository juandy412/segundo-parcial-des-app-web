<!-- Componente reutilizable de tarjeta de producto -->
<!-- Props (padre→hijo) y Eventos (hijo→padre) -->
<!-- Fuente: https://vuejs.org/guide/components/props.html -->
<template>
  <div class="card h-100 shadow-sm product-card border-0">
    <img :src="producto.imagen" class="card-img-top" :alt="producto.nombre"
      onerror="this.src='https://via.placeholder.com/150/003366/ffffff?text=ITAL'" />
    <div class="card-body">
      <span class="badge mb-2" style="background:var(--ital-secondary)">{{ producto.categoria }}</span>
      <h6 class="card-title fw-bold">{{ producto.nombre }}</h6>
      <p class="card-text text-muted small">{{ producto.descripcion }}</p>
    </div>
    <div class="card-footer border-0 bg-white d-flex justify-content-between align-items-center">
      <span class="fw-bold" style="color:var(--ital-primary)">
        ${{ producto.precio.toLocaleString('es-CO') }}
      </span>
      <div class="d-flex gap-2 align-items-center">
        <small class="text-muted">Stock: {{ producto.stock }}</small>
        <button class="btn btn-sm btn-outline-primary" @click="$emit('ver-detalle', producto)">
          <i class="bi bi-eye"></i>
        </button>
        <button v-if="mostrarComprar" class="btn btn-sm btn-ital"
          :disabled="producto.stock === 0" @click="$emit('agregar', producto)">
          <i class="bi bi-cart-plus"></i>
          {{ producto.stock === 0 ? 'Agotado' : 'Comprar' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props: datos que vienen del componente padre
defineProps({
  producto: { type: Object, required: true },
  mostrarComprar: { type: Boolean, default: false }
})
// Eventos que se envían al componente padre
defineEmits(['ver-detalle', 'agregar'])
</script>

<style scoped>
.product-card { border-radius: 12px; transition: transform 0.2s, box-shadow 0.2s; }
.product-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,51,102,0.15) !important; }
.card-img-top { border-radius: 12px 12px 0 0; height: 150px; object-fit: cover; }
</style>