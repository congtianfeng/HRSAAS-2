import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import * as directives from '@/directives'
import Component from '@/components'
import * as filters from '@/filters'
import checkPermissions from '@/mixin/checkpermissions'
Vue.mixin(checkPermissions)
//  统一全局注册过滤器
Object.keys(filters).forEach(item => Vue.filter(item, filters[item]))
//  统一注册自定义指令
Object.keys(directives).forEach(item => Vue.directive(item, directives[item]))
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false
//  统一全局注册组件
Vue.use(Component)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
