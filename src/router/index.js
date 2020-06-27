import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

let router =  new Router({
  routes: [
    {
      path:'/login',
      name:'login',
      component: () => import('@/components/pages/user/login')
    },
    {
      path:'/register',
      name:'register',
      component: () => import('@/components/pages/user/register')
    },
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
          meta:{requiresAuth:true},//需要用户登录验证
          component: () => import('@/components/pages/cart'),
        },
        {
          path: 'me',
          name: 'me',
          meta:{requiresAuth:true},//需要用户登录验证
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
          redirect:'/home'
        }        
      ]
    },
    {
      path:'*',
      redirect: '/'
    }
  ],
  // mode:"history",//路由模式 默认hash
})
import store from '../store'
import { Indicator,MessageBox } from "mint-ui";
// 全局守卫
router.beforeEach((to,from,next)=>{
  // 获取厂库的用户信息
  const user = store.state.userinfo;
  console.log('路由地址是否需要验证',to.path,to.matched.some(record => record.meta.requiresAuth))
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(user.token){
      next();
    }else{
      if (to.fullPath == '/login' || to.fullPath == '/register') {
        next();
      } else {
        Indicator.open("请先登录...");
        setTimeout(() => {
          next('/login')
          Indicator.close();
        }, 600);
      }
    }
  }else{
    next();//不验证登录
  }
})

export default router;