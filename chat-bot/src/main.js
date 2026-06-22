import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import './styles/index.css'
import 'flyonui/flyonui.js'

const storedTheme = window.localStorage.getItem('theme')
if (storedTheme === 'light' || storedTheme === 'dark') {
  document.documentElement.dataset.theme = storedTheme
  document.documentElement.classList.toggle('dark', storedTheme === 'dark')
} else {
  document.documentElement.dataset.theme = 'dark'
  document.documentElement.classList.add('dark')
}

const app = createApp(App)
app.use(router)
app.mount('#app')
