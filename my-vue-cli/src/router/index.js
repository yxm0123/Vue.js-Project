import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Vip from '@/components/Vip'
import Cart from '@/components/Cart'
import Search from '@/components/Search'
import Newslist from '@/components/news/list'

import NewsInfo from '@/components/news/Info'
import PhotoList from '@/components/photos/List'
import Photoinfo from '@/components/photos/Info'
import goodList from '@/components/goods/List'
import goodInfo from '@/components/goods/Info'

Vue.use(Router)

export default new Router({
  linkActiveClass:"mui-active",

  routes: [
    { path: '/', redirect: '/home' },

    {
      path: '/home',
      component: Home
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/vip',
      component: Vip
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/home/list',
      component: Newslist
    },
    {
      path: '/home/info:id',
      component: NewsInfo 
    },
    {
      path: '/home/photolist',
      component: PhotoList 
    },
    {
      path: '/home/infolist',
      component: Photoinfo
    },
   
    {
      path: '/home/goodslist',
      component: goodList 
    },
    {
      path: '/home/goodsinfo/:id',
      component: goodInfo
    }
  ]
})
