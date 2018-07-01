// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Toasted from 'vue-toasted';
import axiox from "axios";
import store from './store/store'
import VueLazyload from 'vue-lazyload'
Vue.use(Toasted);
Vue.use(VueLazyload,{
  loading: 'static/goodsImg/loading-svg/loading-spinning-bubbles.svg'
});
Vue.config.productionTip = false;
Vue.prototype.$http = axiox;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
