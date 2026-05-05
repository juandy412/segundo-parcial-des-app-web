import productosIniciales from '../data/products.json'

const KEY = 'productos_ital'

export function getProducts() {
  const data = localStorage.getItem(KEY)
  if (!data) {
    localStorage.setItem(KEY, JSON.stringify(productosIniciales))
    return productosIniciales
  }
  return JSON.parse(data)
}

export function saveProducts(lista) {
  localStorage.setItem(KEY, JSON.stringify(lista))
}