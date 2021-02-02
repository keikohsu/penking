import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import VuePageTransition from 'vue-page-transition'

Vue.use(VueRouter)
Vue.use(VuePageTransition)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '筆王官方網站',
      login: false,
      transition: 'flip-x'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../components/Login.vue'),
    meta: {
      title: '筆王|登入',
      login: false
    }
  },
  {
    path: '/sign',
    name: 'Sign',
    component: () => import(/* webpackChunkName: "Sign" */ '../components/Sign.vue'),
    meta: {
      title: '筆王|註冊',
      login: false,
      transition: 'flip-x'
    }
  },
  {
    path: '/product/:filter',
    name: 'Product',
    component: () => import(/* webpackChunkName: "product" */ '../views/Product.vue'),
    meta: {
      title: '筆王|產品',
      transition: 'flip-x'
    }
  },
  {
    path: '/Productpag:number',
    name: 'Productpag',
    component: () => import(/* webpackChunkName: "Productpag" */ '../views/Productpag.vue'),
    meta: {
      title: '筆王|產品',
      transition: 'flip-x'
    }
  },
  {
    path: '/Back',
    component: () => import(/* webpackChunkName: "Back" */ '../views/Back.vue'),
    meta: {
      login: true,
      right: true,
      title: '筆王|後台'
    },
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "push" */ '../components/Back2.vue'),
        login: true,
        right: true,
        title: '筆王|後台'
      },
      {
        path: '/push',
        component: () => import(/* webpackChunkName: "push" */ '../components/push.vue'),
        login: true,
        right: true,
        title: '筆王|後台'
      },
      {
        path: '/UserList',
        name: 'UserList',
        title: '筆王|後台',
        component: () => import(/* webpackChunkName: "UserList" */ '../components/UserList.vue')
      },
      {
        path: '/CheckOrder',
        name: 'CheckOrder',
        title: '筆王|後台',
        component: () => import(/* webpackChunkName: "CheckOrder" */ '../components/CheckOrder.vue')
      },
      {
        path: '/Back2',
        name: 'Back2',
        title: '筆王|後台',
        component: () => import(/* webpackChunkName: "Back2" */ '../components/Back2.vue')
      },
      {
        path: '/OrderForm',
        name: 'OrderForm',
        title: '筆王|後台',
        component: () => import(/* webpackChunkName: "OrderForm" */ '../components/OrderForm.vue')
      },
      {
        path: '/ConnectionList',
        name: 'ConnectionList',
        title: '筆王|後台',
        component: () => import(/* webpackChunkName: "ConnectionList" */ '../components/ConnectionList.vue')
      }
    ]
  },
  {
    path: '/AppImageCard',
    name: 'AppImageCard',
    component: () => import(/* webpackChunkName: "AppImageCard" */ '../components/AppImageCard.vue'),
    meta: {
      title: '筆王|註冊',
      login: false
    }
  },
  {
    path: '/Check',
    name: 'Check',
    component: () => import(/* webpackChunkName: "Check" */ '../views/Check.vue')
  },
  {
    path: '/CheckiList',
    name: 'CheckiList',
    component: () => import(/* webpackChunkName: "CheckList" */ '../components/CheckiList.vue')
  },
  {
    path: '/About',
    name: 'About',
    component: () => import(/* webpackChunkName: "About" */ '../views/About.vue'),
    meta: {
      title: '筆王|關於我們'
    }
  },
  {
    path: '/Connection',
    name: 'Connection',
    component: () => import(/* webpackChunkName: "Connection" */ '../components/connection.vue')
  },
  {
    path: '/Apprecommend',
    name: 'Apprecommend',
    component: () => import(/* webpackChunkName: "Apprecommend" */ '../components/Apprecommend.vue')
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.login && !store.state.user.id) {
    next('/login')
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  let title = ''
  if (to.name === 'Album') {
    title = store.state.user.name + '會員'
  } else {
    title = to.meta.title
  }

  document.title = title
})

export default router
