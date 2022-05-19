import { IRouteMeta } from './index'
import { ROUTE_AUTHORITY } from './../config/index'
import { RouteLocationNormalized, Router } from 'vue-router'
import usePermission from '@/hooks/permission'

function setPageTitle(to: RouteLocationNormalized) {
  document.title = to.meta.title as string
}

/**
 * 设置页面守卫
 * @param router
 */
function setupPageGuard(router: Router) {
  router.beforeEach(to => {
    setPageTitle(to)
  })
}

/**
 * 设置权限守卫
 * @param router
 */
function setPermissionGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    const { accessRouter } = usePermission()
    const userRouteAuths = [ROUTE_AUTHORITY.USER]
    if (!accessRouter(to)) {
      // 当前登录用户拥有的路由权限
      const meta = to.meta as IRouteMeta
      console.log(meta)

      const isNeedPermission = userRouteAuths.some(item => meta.authority.includes(item))

      if (!isNeedPermission) {
        next('/401')
        return
      }

      next()
      return
    }
    next()
  })
}

/**
 * 创建路由守卫
 * @param router
 */
export function createRouteGuard(router: Router) {
  setupPageGuard(router)
  setPermissionGuard(router)
}
