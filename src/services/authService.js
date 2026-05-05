import usuarios from '../data/usuarios.json'

export function login(username, password) {
  const found = usuarios.find(
    u => u.username === username && u.password === password
  )
  if (found) {
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('currentUser', username)
    return true
  }
  return false
}

export function logout() {
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('currentUser')
}

export function isAuthenticated() {
  return localStorage.getItem('isLoggedIn') === 'true'
}