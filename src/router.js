import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Project from './views/Project.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import UserInfo from './components/UserInfo.vue'
import LoginRegisterDialog from './views/LoginRegisterDialog.vue'
import IssueIndex from './views/IssueIndex.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/project',
      name: 'project',
      component: Project
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: UserInfo
    },    {
      path: '/LoginRegisterDialog',
      name: 'LoginRegisterDialog',
      component: LoginRegisterDialog
    },
    {
      path: '/issue',
      name: 'IssueIndex',
      component: IssueIndex
    }
  ]
})