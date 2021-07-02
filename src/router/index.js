import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Test from '../views/Test.vue'
import Test2 from '../views/Test2.vue'

import Work from '../views/Work.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: (route) => ({ no: route.query.no, url: route.query.url })
  },
  {
    path: '/work',
    name: 'Work',
    component: Work,
    props: (route) => ({ id: route.query.id, usb: route.query.usb })
  },
  {
    path: '/view',
    name: 'Test2',
    component: Test2,
    props: (route) => ({ port: route.query.port, port1: route.query.port1, port2: route.query.port2, url: route.query.url, pi_id: route.query.pi })
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
    props: (route) => ({ port: route.query.port, port1: route.query.port1, port2: route.query.port2, url: route.query.url, pi_id: route.query.pi })
  },
  {
    path: '/test2',
    name: 'Test2',
    component: Test2,
    props: (route) => ({ port: route.query.port, port1: route.query.port1, port2: route.query.port2, url: route.query.url, pi_id: route.query.pi })
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
