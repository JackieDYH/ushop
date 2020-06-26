// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入mint-ui库全部组件
import Mint from 'mint-ui';
Vue.use(Mint);
import "mint-ui/lib/style.css"

// 引入axios
import axios from 'axios'
Vue.prototype.$axios = axios

// 引入api接口文件
import apis from './common/js/apis'
Vue.prototype.$apis = apis

// 引入阿里iconfont图标库
import './assets/iconfont/iconfont.css'

// 引入状态管理器
import store from './store'

// 引入 封装的http请求 携带token信息
import http from './common/js/http'
Vue.prototype.$http = http;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
