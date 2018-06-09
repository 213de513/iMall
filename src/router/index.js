import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Search from "@/views/search"
import DaoHang from "@/views/daohang"
Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/daohang',
      name: 'daohang',
      component: DaoHang
    }
  ]
})
