import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Redirect from '@/views/Redirect.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/redirect',
    name: 'Redirect',
    component: Redirect,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
