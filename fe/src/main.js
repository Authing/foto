// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App"
import router from "./router"
import VueLazyload from "vue-lazyload"

import elementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import "element-ui/lib/theme-chalk/display.css"

import store from "./store/index"

Vue.config.productionTip = false

Vue.use(elementUI)
Vue.use(VueLazyload)

new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
})
