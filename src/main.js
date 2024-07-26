import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import store from './store'; // 导入 Vuex store

createApp(App).use(Antd).use(store).mount('#app')
