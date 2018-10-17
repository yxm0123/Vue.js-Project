// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
import './filters'
import VuePreview from 'vue-preview'

import store from "./store"

import './libs/mui/css/mui.css'
import './libs/mui/css/icons-extra.css'
import './assets/css/index.css'



Vue.prototype.$http = axios

axios.defaults.baseURL = "http://www.liulongbin.top:3005"


import { Header,Button, Swipe, SwipeItem,Switch } from 'mint-ui';


Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Switch.name, Switch)

Vue.use(VuePreview)

// Vue.use(Lazyload)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
