import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueSocketIOExt from 'vue-socket.io-extended'
import { io } from 'socket.io-client'

/* eslint-disable */
import JSMpeg from './assets/js/jsmpeg.min1'
import './assets/icon/iconfont.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

const socket = io('http://videostream.fidodarts.com:8005')
//const socket = io('http://127.0.0.1:8005')
Vue.use(VueSocketIOExt, socket)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
/* eslint-enable */
