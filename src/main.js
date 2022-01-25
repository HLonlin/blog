import { createApp } from 'vue'
import '@/utils/css/normalize.css' // A modern alternative to CSS resets
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(store).use(router).use(ElementUI).mount('#app')