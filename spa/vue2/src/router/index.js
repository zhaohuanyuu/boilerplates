import Vue from 'vue2'
import VueRouter from 'vue-router2'
import { getRoutes } from '@tzt/utils'

const comps = import.meta.glob('../views/**/*.vue')
const routes = getRoutes(comps);

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

export default router;
