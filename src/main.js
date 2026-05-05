// Fuente: https://vuejs.org/guide/essentials/application.html
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Bootstrap CSS — https://getbootstrap.com/docs/5.3/
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Bootstrap Icons — https://icons.getbootstrap.com/
import 'bootstrap-icons/font/bootstrap-icons.css'

// Estilos institucionales ITAL
import './assets/styles/main.css'

createApp(App).use(router).mount('#app')