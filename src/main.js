import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import GlobalComponents from '@/custom-component' // 注册自定义组件



const app = createApp(App)
GlobalComponents(app)
app.use(Antd).use(store).use(router).mount('#app')
