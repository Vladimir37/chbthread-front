import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import ServerError from '@/components/errors/ServerError'
import NotFoundError from '@/components/errors/NotFoundError'
import Login from '@/components/Login'
import AdminList from '@/components/AdminList'
import ProfileList from '@/components/ProfileList'
import provider from '../utils/provider'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/error',
      name: 'ServerError',
      component: ServerError
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
      name: 'AdminList',
      component: AdminList,
      meta: {
        admin: true,
        layout: 'admin'
      },
    },
    {
      path: '/profiles',
      name: 'ProfileList',
      component: ProfileList,
      meta: {
        auth: true,
        layout: 'admin'
      },
    },
    {
      path: '*',
      name: 'Error404',
      component: NotFoundError,
    },
  ]
});

router.beforeEach(async (to, from, next) => {
  let response;
  try {
    const res = await provider.get('/auth/status');
    response = res.data;
  } catch (err) {
    console.log(err);
    next({
      path: '/error',
    });
  }
  if (to.matched.some(record => record.meta.admin)) {
    if (!response.logged) {
      next({
        path: '/auth',
      })
    } else if (response.user.status != 0) {
      next({
        path: '/profiles',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.unauth)) {
    if (response.logged) {
      next({
        path: '/profiles',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.auth)) {
    if (!response.logged) {
      next({
        path: '/auth',
      })
    }
    next()
  } else {
    next()
  }
});

export default router;