<!-- Vista de productos — CRUD completo -->
<!-- Tabla para profesor, tarjetas para estudiante -->
<!-- Fuente Bootstrap tables: https://getbootstrap.com/docs/5.3/content/tables/ -->
<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
      <h4 class="fw-bold mb-0" style="color:var(--ital-primary)">
        <i class="bi bi-box-seam me-2"></i>
        {{ esProfesor ? 'Gestión de Productos' : 'Productos Disponibles' }}
      </h4>
      <div class="d-flex gap-2">
        <button v-if="esProfesor" class="btn btn-ital" @click="abrirFormulario(null)">
          <i class="bi bi-plus-lg me-1"></i>Agregar producto
        </button>
        <button v-else class="btn btn-outline-primary position-relative" @click="verCarrito = !verCarrito">
          <i class="bi bi-cart3"></i> Carrito
          <span v-if="totalCarrito > 0"
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {{ totalCarrito }}
          </span>
        </button>
      </div>
    </div>

    <!-- Alerta Bootstrap -->
    <div v-if="alerta.visible" :class="`alert alert-${alerta.tipo} alert-dismissible fade show`" role="alert">
      {{ alerta.mensaje }}
      <button type="button" class="btn-close" @click="alerta.visible = false"></button>
    </div>

    <!-- CARRITO estudiante -->
    <div v-if="verCarrito && !esProfesor" class="card mb-4 shadow-sm border-0">
      <div class="card-header fw-bold" style="background:var(--ital-primary);color:#fff">
        <i class="bi bi-cart-check me-2"></i>Mi Carrito
      </div>
      <div class="card-body">
        <div v-if="carrito.length === 0" class="text-muted text-center py-3">El carrito está vacío.</div>
        <table v-else class="table table-sm align-middle">
          <thead><tr><th>Producto</th><th>Cant.</th><th>Precio</th><th>Subtotal</th><th></th></tr></thead>
          <tbody>
            <tr v-for="item in carrito" :key="item.id">
              <td>{{ item.nombre }}</td>
              <td>
                <div class="input-group input-group-sm" style="width:90px">
                  <button class="btn btn-outline-secondary" @click="cambiarCantidad(item,-1)">-</button>
                  <span class="input-group-text">{{ item.cantidad }}</span>
                  <button class="btn btn-outline-secondary" @click="cambiarCantidad(item,1)">+</button>
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
        <div class="text-end">
          <button class="btn btn-success" :disabled="carrito.length===0" @click="confirmarCompra">
            <i class="bi bi-check-circle me-1"></i>Confirmar compra
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL CREAR/EDITAR -->
    <div v-if="mostrarModal" class="modal-overlay" @click.self="cerrarModal">
      <div class="modal-box">
        <div class="modal-header-custom">
          <h5 class="fw-bold mb-0" style="color:var(--ital-primary)">
            {{ productoEditando.id && productos.find(p=>p.id===productoEditando.id) ? 'Editar producto' : 'Nuevo producto' }}
          </h5>
          <button class="btn-close" @click="cerrarModal"></button>
        </div>
        <div class="modal-body-custom">
          <div class="row g-3">
            <div class="col-12">
              <label class="form-label fw-semibold">Nombre</label>
              <input v-model="productoEditando.nombre" type="text" class="form-control" />
            </div>
            <div class="col-6">
              <label class="form-label fw-semibold">Precio ($)</label>
              <input v-model.number="productoEditando.precio" type="number" class="form-control" min="0" />
            </div>
            <div class="col-6">
              <label class="form-label fw-semibold">Stock</label>
              <input v-model.number="productoEditando.stock" type="number" class="form-control" min="0" />
            </div>
            <div class="col-6">
              <label class="form-label fw-semibold">Categoría</label>
              <input v-model="productoEditando.categoria" type="text" class="form-control" />
            </div>
            <div class="col-6">
              <label class="form-label fw-semibold">URL Imagen</label>
              <input v-model="productoEditando.imagen" type="text" class="form-control" />
            </div>
            <div class="col-12">
              <label class="form-label fw-semibold">Descripción</label>
              <textarea v-model="productoEditando.descripcion" class="form-control" rows="2"></textarea>
            </div>
          </div>
        </div>
        <div class="modal-footer-custom">
          <button class="btn btn-secondary" @click="cerrarModal">Cancelar</button>
          <button class="btn btn-ital" @click="guardarProducto">
            <i class="bi bi-floppy me-1"></i>Guardar
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL VER DETALLE -->
    <div v-if="productoDetalle" class="modal-overlay" @click.self="productoDetalle = null">
      <div class="modal-box">
        <div class="modal-header-custom">
          <h5 class="fw-bold mb-0" style="color:var(--ital-primary)">{{ productoDetalle.nombre }}</h5>
          <button class="btn-close" @click="productoDetalle = null"></button>
        </div>
        <div class="modal-body-custom text-center">
          <img :src="productoDetalle.imagen" class="img-fluid rounded mb-3" style="max-height:180px;object-fit:cover"
            onerror="this.src='https://via.placeholder.com/150/003366/ffffff?text=ITAL'" />
          <p><span class="badge" style="background:var(--ital-secondary)">{{ productoDetalle.categoria }}</span></p>
          <p class="text-muted">{{ productoDetalle.descripcion }}</p>
          <h5 class="fw-bold" style="color:var(--ital-primary)">${{ productoDetalle.precio.toLocaleString('es-CO') }}</h5>
          <p class="text-muted small">Stock: {{ productoDetalle.stock }} unidades</p>
        </div>
      </div>
    </div>

    <!-- TABLA PROFESOR — Bootstrap table -->
    <div v-if="esProfesor">
      <div class="table-responsive">
        <table class="table table-hover table-bordered align-middle bg-white rounded shadow-sm">
          <thead style="background:var(--ital-primary);color:#fff">
            <tr>
              <th>#</th><th>Nombre</th><th>Categoría</th>
              <th>Precio</th><th>Stock</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="producto in productos" :key="producto.id">
              <td>{{ producto.id }}</td>
              <td class="fw-semibold">{{ producto.nombre }}</td>
              <td><span class="badge" style="background:var(--ital-secondary)">{{ producto.categoria }}</span></td>
              <td>${{ producto.precio.toLocaleString('es-CO') }}</td>
              <td>
                <span :class="producto.stock < 5 ? 'text-danger fw-bold' : ''">
                  {{ producto.stock }}
                  <i v-if="producto.stock < 5" class="bi bi-exclamation-triangle-fill ms-1"></i>
                </span>
              </td>
              <td>
                <div class="d-flex gap-1">
                  <button class="btn btn-sm btn-outline-primary" @click="productoDetalle = producto" title="Ver">
                    <i class="bi bi-eye"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-warning" @click="abrirFormulario(producto)" title="Editar">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-danger" @click="eliminarProducto(producto.id)" title="Eliminar">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- TARJETAS ESTUDIANTE — usa ProductCardComponent con props y eventos -->
    <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
      <div class="col" v-for="producto in productos" :key="producto.id">
        <ProductCardComponent
          :producto="producto"
          :mostrarComprar="true"
          @ver-detalle="productoDetalle = $event"
          @agregar="agregarAlCarrito($event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getProducts, saveProducts } from '../services/productService'
import { getRol } from '../services/authService'
import ProductCardComponent from '../components/ProductCardComponent.vue'

const productos = ref([])
const carrito = ref([])
const verCarrito = ref(false)
const mostrarModal = ref(false)
const productoDetalle = ref(null)
const productoEditando = ref({})
const esProfesor = computed(() => getRol() === 'profesor')
const alerta = ref({ visible: false, tipo: 'success', mensaje: '' })

function mostrarAlerta(mensaje, tipo = 'success') {
  alerta.value = { visible: true, tipo, mensaje }
  setTimeout(() => alerta.value.visible = false, 3000)
}

onMounted(() => { productos.value = getProducts() })

function abrirFormulario(producto) {
  productoEditando.value = producto
    ? { ...producto }
    : { id: Date.now(), nombre: '', precio: 0, stock: 0, categoria: '', imagen: '', descripcion: '' }
  mostrarModal.value = true
}

function cerrarModal() { mostrarModal.value = false; productoEditando.value = {} }

function guardarProducto() {
  const idx = productos.value.findIndex(p => p.id === productoEditando.value.id)
  if (idx !== -1) {
    productos.value[idx] = { ...productoEditando.value }
    mostrarAlerta(`✅ "${productoEditando.value.nombre}" actualizado.`)
  } else {
    productos.value.push({ ...productoEditando.value })
    mostrarAlerta(`✅ "${productoEditando.value.nombre}" creado.`)
  }
  saveProducts(productos.value)
  cerrarModal()
}

function eliminarProducto(id) {
  if (!confirm('¿Seguro que deseas eliminar este producto?')) return
  const nombre = productos.value.find(p => p.id === id)?.nombre
  productos.value = productos.value.filter(p => p.id !== id)
  saveProducts(productos.value)
  mostrarAlerta(`🗑️ "${nombre}" eliminado.`)
}

function agregarAlCarrito(producto) {
  const existe = carrito.value.find(i => i.id === producto.id)
  if (existe) { if (existe.cantidad < producto.stock) existe.cantidad++ }
  else carrito.value.push({ ...producto, cantidad: 1 })
  verCarrito.value = true
}

function cambiarCantidad(item, delta) {
  const prod = productos.value.find(p => p.id === item.id)
  const nueva = item.cantidad + delta
  if (nueva < 1) { quitarDelCarrito(item.id); return }
  if (nueva > prod.stock) return
  item.cantidad = nueva
}

function quitarDelCarrito(id) { carrito.value = carrito.value.filter(i => i.id !== id) }

const totalCarrito = computed(() => carrito.value.reduce((a, i) => a + i.cantidad, 0))
const totalPrecio = computed(() => carrito.value.reduce((a, i) => a + i.precio * i.cantidad, 0))

function confirmarCompra() {
  carrito.value.forEach(item => {
    const p = productos.value.find(p => p.id === item.id)
    if (p) p.stock -= item.cantidad
  })
  saveProducts(productos.value)
  carrito.value = []
  verCarrito.value = false
  mostrarAlerta('🎉 ¡Compra realizada con éxito!')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 999; padding: 1rem;
}
.modal-box {
  background: #fff; border-radius: 14px;
  width: 100%; max-width: 500px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}
.modal-header-custom {
  padding: 1.25rem 1.5rem; border-bottom: 1px solid #dee2e6;
  display: flex; justify-content: space-between; align-items: center;
}
.modal-body-custom { padding: 1.25rem 1.5rem; }
.modal-footer-custom {
  padding: 1rem 1.5rem; border-top: 1px solid #dee2e6;
  display: flex; justify-content: flex-end; gap: 0.5rem;
}
</style>