import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import AdminList from '@/components/AdminList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/auth',
      name: 'Login',
      component: Login,
      meta: {
        unauth: true,
      },
    },
    {
      path: '/admins',
      name: 'Admin',
      component: AdminList,
      meta: {
        admin: true,
      },
    },
  ]
})
