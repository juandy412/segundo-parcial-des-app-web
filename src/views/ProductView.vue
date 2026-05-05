<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="fw-bold mb-0" style="color: var(--ital-primary);">
        <i class="bi bi-box-seam me-2"></i>
        {{ esProfesor ? 'Gestión de Productos' : 'Productos Disponibles' }}
      </h4>
      <button v-if="!esProfesor" class="btn btn-outline-primary position-relative" @click="verCarrito = !verCarrito">
        <i class="bi bi-cart3"></i> Carrito
        <span v-if="totalCarrito > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {{ totalCarrito }}
        </span>
      </button>
    </div>

    <div v-if="verCarrito && !esProfesor" class="card mb-4 shadow-sm border-0">
      <div class="card-header fw-bold" style="background:var(--ital-primary); color:#fff;">
        <i class="bi bi-cart-check me-2"></i>Mi Carrito
      </div>
      <div class="card-body">
        <div v-if="carrito.length === 0" class="text-muted text-center py-3">
          El carrito está vacío.
        </div>
        <table v-else class="table table-sm align-middle">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cant.</th>
              <th>Precio unit.</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in carrito" :key="item.id">
              <td>{{ item.nombre }}</td>
              <td>
                <div class="input-group input-group-sm" style="width:90px">
                  <button class="btn btn-outline-secondary" @click="cambiarCantidad(item, -1)">-</button>
                  <span class="input-group-text">{{ item.cantidad }}</span>
                  <button class="btn btn-outline-secondary" @click="cambiarCantidad(item, 1)">+</button>
                </div>
              </td>
              <td>${{ item.precio.toLocaleString('es-CO') }}</td>
              <td>${{ (item.precio * item.cantidad).toLocaleString('es-CO') }}</td>
              <td>
                <button class="btn btn-sm btn-outline-danger" @click="quitarDelCarrito(item.id)">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="fw-bold text-end">Total:</td>
              <td colspan="2" class="fw-bold" style="color:var(--ital-primary)">
                ${{ totalPrecio.toLocaleString('es-CO') }}
              </td>
            </tr>
          </tfoot>
        </table>
        <div class="text-end mt-2">
          <button class="btn btn-success" :disabled="carrito.length === 0" @click="confirmarCompra">
            <i class="bi bi-check-circle me-1"></i>Confirmar compra
          </button>
        </div>
      </div>
    </div>

    <div v-if="compraExitosa" class="alert alert-success alert-dismissible fade show" role="alert">
      <i class="bi bi-check-circle me-2"></i>¡Compra realizada con éxito!
      <button type="button" class="btn-close" @click="compraExitosa = false"></button>
    </div>

    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
      <div class="col" v-for="producto in productos" :key="producto.id">
        <div class="card h-100 shadow-sm product-card border-0">
          <img :src="producto.imagen" class="card-img-top" :alt="producto.nombre" />
          <div class="card-body">
            <span class="badge mb-2" style="background:var(--ital-secondary)">
              {{ producto.categoria }}
            </span>
            <h6 class="card-title fw-bold">{{ producto.nombre }}</h6>
            <p class="card-text text-muted small">{{ producto.descripcion }}</p>
          </div>

          <div class="card-footer border-0 bg-white">
            <div v-if="!esProfesor" class="d-flex justify-content-between align-items-center">
              <span class="fw-bold" style="color:var(--ital-primary)">
                ${{ producto.precio.toLocaleString('es-CO') }}
              </span>
              <div class="d-flex align-items-center gap-2">
                <small class="text-muted">Stock: {{ producto.stock }}</small>
                <button
                  class="btn btn-sm btn-ital"
                  :disabled="producto.stock === 0"
                  @click="agregarAlCarrito(producto)"
                >
                  <i class="bi bi-cart-plus"></i>
                  {{ producto.stock === 0 ? 'Agotado' : 'Comprar' }}
                </button>
              </div>
            </div>

            <!-- ===== MODO PROFESOR ===== -->
            <div v-else>
              <!-- Editar precio -->
              <div class="mb-2">
                <label class="form-label small fw-semibold mb-1">Precio ($)</label>
                <div class="input-group input-group-sm">
                  <span class="input-group-text"><i class="bi bi-currency-dollar"></i></span>
                  <input
                    type="number"
                    class="form-control"
                    v-model.number="producto.precio"
                    min="0"
                  />
                </div>
              </div>
              <!-- Editar stock -->
              <div class="mb-2">
                <label class="form-label small fw-semibold mb-1">Stock (unidades)</label>
                <div class="input-group input-group-sm">
                  <span class="input-group-text"><i class="bi bi-archive"></i></span>
                  <input
                    type="number"
                    class="form-control"
                    v-model.number="producto.stock"
                    min="0"
                  />
                </div>
              </div>
              <button class="btn btn-sm btn-ital w-100" @click="guardarCambios(producto)">
                <i class="bi bi-floppy me-1"></i>Guardar cambios
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getProducts, saveProducts } from '../services/productService'
import { getRol } from '../services/authService'

const productos = ref([])
const carrito = ref([])
const verCarrito = ref(false)
const compraExitosa = ref(false)

// Detecta si el usuario es profesor
const esProfesor = computed(() => getRol() === 'profesor')

onMounted(() => {
  productos.value = getProducts()
})

function agregarAlCarrito(producto) {
  const existe = carrito.value.find(i => i.id === producto.id)
  if (existe) {
    if (existe.cantidad < producto.stock) existe.cantidad++
  } else {
    carrito.value.push({ ...producto, cantidad: 1 })
  }
  verCarrito.value = true
}

function cambiarCantidad(item, delta) {
  const producto = productos.value.find(p => p.id === item.id)
  const nuevaCant = item.cantidad + delta
  if (nuevaCant < 1) { quitarDelCarrito(item.id); return }
  if (nuevaCant > producto.stock) return
  item.cantidad = nuevaCant
}

function quitarDelCarrito(id) {
  carrito.value = carrito.value.filter(i => i.id !== id)
}

const totalCarrito = computed(() =>
  carrito.value.reduce((acc, i) => acc + i.cantidad, 0)
)

const totalPrecio = computed(() =>
  carrito.value.reduce((acc, i) => acc + i.precio * i.cantidad, 0)
)

function confirmarCompra() {
  carrito.value.forEach(item => {
    const p = productos.value.find(p => p.id === item.id)
    if (p) p.stock -= item.cantidad
  })
  saveProducts(productos.value)
  carrito.value = []
  verCarrito.value = false
  compraExitosa.value = true
}

function guardarCambios(producto) {
  saveProducts(productos.value)
  alert(`✅ Cambios guardados para "${producto.nombre}"`)
}
</script>

<style scoped>
.product-card {
  border-radius: 12px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,51,102,0.15) !important;
}
.card-img-top {
  border-radius: 12px 12px 0 0;
  height: 150px;
  object-fit: cover;
}
</style>