import './assets/main.css'
// ep 暗黑主题样式
import 'element-plus/theme-chalk/dark/css-vars.css';


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
