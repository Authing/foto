import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  routes: [
    { path: '*', redirect: '/' },

    {
      path: '/',
      name: '首页',
      meta: {
        title: '首页'
      },
      component: () => import('@/pages/index')
    },

    {
      path: '/login',
      name: '登录',
      meta: {
        title: '登录'
      },
      component: () => import('@/pages/login')
    },

    {
      path: '/user',
      name: '我的资料',
      meta: {
        title: '我的资料'
      },
      component: () => import('@/pages/user')
    },

    {
      path: '/goods/:id',
      name: '商品详情',
      meta: {
        title: '商品详情'
      },
      component: () => import('@/pages/goods')
    }
  ]
})

router.beforeEach((to, from, next) => {
  //beforeEach是router的钩子函数，在进入路由前执行

  if (to.meta.title) {
    //判断是否有标题

    document.title = to.meta.title + ' - Foto'
  }

  next() //执行进入路由，如果不写就不会进入目标页
})

export default router
