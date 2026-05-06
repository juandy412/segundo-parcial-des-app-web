import usuarios from '../data/usuarios.json'

export function login(username, password) {
  const found = usuarios.find(
    u => u.username === username && u.password === password
  )
  if (found) {
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('currentUser', username)
    localStorage.setItem('userRol', found.rol)
    return true
  }
  return false
}

export function logout() {
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('currentUser')
  localStorage.removeItem('userRol')
}

export function isAuthenticated() {
  return localStorage.getItem('isLoggedIn') === 'true'
}

export function getRol() {
  return localStorage.getItem('userRol')
}