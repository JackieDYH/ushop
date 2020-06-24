import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/components/pages/index'),
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/components/pages/home'),
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('@/components/pages/cart'),
        },
        {
          path: 'me',
          name: 'me',
          component: () => import('@/components/pages/me'),
        },
        {
          path: 'cate',
          name: 'cate',
          component: () => import('@/components/pages/cate'),
        },
        {
          path: '',
          redirect:'home'
        }        
      ]
    }
  ],
  // mode:"history",//路由模式 默认hash
})
