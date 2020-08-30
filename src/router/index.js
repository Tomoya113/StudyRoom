import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Studyrooms from '../views/Studyrooms.vue'
import Studyroom from '../views/Studyroom.vue'
import User from '../views/User.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/studyrooms',
    name: 'Studyrooms',
    component: Studyrooms,
  },
  {
    path: '/studyroom/:studyroom_id',
    name: 'Studyroom',
    component: Studyroom,
  },
  {
    path: '/user',
    name: 'User',
    component: User,
  },
  {
    path: '/about',
    name: 'About',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
