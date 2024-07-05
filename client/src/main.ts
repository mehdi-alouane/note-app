import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'
import routes from './router'

const app = createApp(App)

app.use(createPinia())
app.use(routes)

app.mount('#app')