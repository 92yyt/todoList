import { createStore } from 'vuex';
import work from './modules/work'; // 导入 work 模块

const store = createStore({
  modules: {
    work
  }
});

export default store;
