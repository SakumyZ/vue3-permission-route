import { ROUTE_AUTHORITY } from './../config/index'
import { createRouter, createWebHistory, RouteMeta, RouteRecordRaw } from 'vue-router'
import BasicLayout from '@/views/layout/basic-layout.vue'
import { createRouteGuard } from './permission'

export interface IRouteMeta extends RouteMeta {
  title: string
  menu: string
  requiresAuth?: boolean
  authority: ROUTE_AUTHORITY[]
}

const baseRouts: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: 'Login', requiresAuth: false },
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/401',
    name: '401',
    meta: { title: '401', requiresAuth: false },
    component: () => import('@/views/exception/401/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    meta: { title: '404', requiresAuth: false },
    component: () => import('@/views/exception/404/index.vue')
  }
]

const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    component: BasicLayout,
    children: [
      {
        path: 'home',
        name: 'home',
        meta: { title: 'Home', menu: 'Dashboard', requiresAuth: false },
        component: () => import('@/views/home/index.vue')
      },
      {
        path: 'system',
        name: 'system',
        meta: {
          title: 'Dashboard',
          menu: 'Dashboard',
          requiresAuth: true,
          authority: [ROUTE_AUTHORITY.ADMIN]
        },

        component: () => import('@/views/system/index.vue')
      }
    ]
  }
]

const routes = [...baseRouts, ...dynamicRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createRouteGuard(router)

export default router
