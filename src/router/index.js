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
          path: 'cate/:cateid',
          name: 'catelist',
          component: () => import('@/components/pages/goodslist'),
        },
        {
          path: 'search/:searchtext',
          name: 'searchlist',
          component: () => import('@/components/pages/goodslist'),
        },
        {
          path: 'detail/:id',
          name: 'detaillist',
          component: () => import('@/components/pages/detail'),
        },
        {
          path: 'order',
          name: 'ordergood',
          component: () => import('@/components/pages/order'),
        },
        {
          path: '',
          redirect:'home'
        }        
      ]
    },
    {
      path:'/login',
      component: () => import('@/components/pages/user/login')
    },
    {
      path:'/register',
      component: () => import('@/components/pages/user/register')
    },
    {
      path:'*',
      redirect: '/'
    }
  ],
  // mode:"history",//路由模式 默认hash
})
