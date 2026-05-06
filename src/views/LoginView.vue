<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <div class="login-escudo" ></div>
        <link rel="stylesheet" href="/src/assets/LOGO-ALFONSO.jpeg">
        <h1 class="login-title">Instituto Técnico</h1>
        <p class="login-subtitle">Alfonso López</p>
        <p class="login-system">Sistema de Gestión Académica</p>
      </div>

      <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Credenciales incorrectas.</strong> Verifica tu usuario y contraseña.
        <button type="button" class="btn-close" @click="error = false"></button>
      </div>

      <div class="mb-3">
        <label for="username" class="form-label fw-semibold">Usuario</label>
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-person-fill"></i></span>
          <input id="username" v-model="form.username" type="text"
            class="form-control" placeholder="Ingresa tu usuario" @keyup.enter="handleLogin" />
        </div>
      </div>

      <div class="mb-4">
        <label for="password" class="form-label fw-semibold">Contraseña</label>
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
          <input id="password" v-model="form.password"
            :type="showPass ? 'text' : 'password'"
            class="form-control" placeholder="Ingresa tu contraseña" @keyup.enter="handleLogin" />
          <button class="btn btn-outline-secondary" type="button" @click="showPass = !showPass">
            <i :class="showPass ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
          </button>
        </div>
      </div>

      <button class="btn btn-ital w-100 py-2" @click="handleLogin" :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
        {{ loading ? 'Verificando...' : 'Ingresar al sistema' }}
      </button>

      <p class="login-disclaimer mt-3">
        * Esta validación es solo educativa y no representa un sistema de autenticación real.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../services/authService'

const router = useRouter()
const error = ref(false)
const loading = ref(false)
const showPass = ref(false)
const form = ref({ username: '', password: '' })

async function handleLogin() {
  error.value = false
  loading.value = true
  await new Promise(r => setTimeout(r, 700))
  const ok = login(form.value.username, form.value.password)
  loading.value = false
  if (ok) router.push('/dashboard')
  else error.value = true
}
</script>