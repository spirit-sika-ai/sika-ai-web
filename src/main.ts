import './assets/main.css'
// ep 暗黑主题样式
// import 'element-plus/theme-chalk/dark/css-vars.css';
// import '@/assets/styles/dark/css-vars.css'

// md代码高亮
// import 'highlight.js/styles/base16/darcula.css'
// import 'highlight.js/styles/base16/apprentice.css'
// import 'highlight.js/styles/base16/ashes.css'
import 'highlight.js/styles/base16/atelier-cave-light.css'
// import 'highlight.js/styles/github-dark-dimmed.css'


import {createApp} from 'vue'
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
