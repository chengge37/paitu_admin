import '@babel/polyfill'
import Vue from 'vue'
import VueAMap from 'vue-amap'
import Element from 'element-ui'
import App from './App.vue'
import router from './router'
import filters from './filter'
import './util/httpUtil.js';
// import 'element-ui/lib/theme-chalk/index.css';
import './theme/index.css'
import AliSvgIcon from './components/SvgIcon'

import shnUI from 'shn-vue-ui'

import store from './store'

import * as qiniu from 'qiniu-js'

//导入全局公共函数
import * as util from './common/function/util.js'
//导入全局验证函数
import * as validate from './util/validate.js'
//导入全局变量
import * as config from './config/config.js'

import './util/progress'
import './style/index.scss'


Vue.prototype.$qiniuHost = config.qiniuHost;
Vue.prototype.util = util;
Vue.prototype.config = config;
Vue.prototype.validate = validate;

Vue.prototype.$qiniu = qiniu;

//过滤器统一处理加载
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)


import vRometeJs from 'v-remote-js'
Vue.use(vRometeJs)

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'f95c3466594d19fa1c152220e0492fe4',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.Geolocation', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Weather', 'AMap.Marker'],
  v: '1.4.15',
  uiVersion: '1.0.11'
});

Vue.use(shnUI);
Vue.use(Element);
Vue.component('ali-svg-icon', AliSvgIcon)

window.$vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})