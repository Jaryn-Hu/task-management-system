import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()
  
  app.use(pinia)
  
  return {
    app,
    pinia // 导出 pinia 实例，以便在其他地方使用
  }
}
