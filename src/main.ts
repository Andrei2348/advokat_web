import { createApp } from 'vue'
import { router } from './router'
import { createPinia } from 'pinia'
import App from './App/App.vue'
import '@/plugins/axios'
const pinia = createPinia()
const app = createApp(App)
import { vMaska } from 'maska/vue'
import globalComponents from '@/plugins/globalComponents'

globalComponents(app)

async function initApp() {
  app.use(pinia)
  app.directive('maska', vMaska)

  // some logic with store data before mount
  app.use(router).mount('#app')
}

window.addEventListener('load', initApp)
