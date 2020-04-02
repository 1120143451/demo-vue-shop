import Vue from 'vue'
import App from './App'
import router from './router'
/* 引入 ElementUI */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/style.css'
import myAxios from './assets/js/myAxios.js'
// 引入 Vue 插件
Vue.use(myAxios)
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
