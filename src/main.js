// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
// Vue.use(VueRouter);
import router from './router/router'
import store from 'store/store'


Vue.use(VueRouter)

import { sync } from 'vuex-router-sync'

import i18n from 'i18n'

sync(store, router)

// ElementUI 样式的引入
import ElementUI from 'element-ui'
Vue.use(ElementUI)

// 注册 valid 方法
import { note, valid, rules, format } from 'assets/js/tool'
Vue.prototype.$note = note
Vue.prototype.$valid = valid
Vue.prototype.$rules = rules
Date.prototype.format = format

// CSS样式重置方案
import 'normalize.css'
import './../theme/index.css'

// 引入 项目预设样式
import 'assets/css/common.scss'

// 引入 ICONFONT
import 'assets/font/iconfont/iconfont.css'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
