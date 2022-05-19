import { IRouteMeta } from './../router/index'
import { RouteLocationNormalized } from 'vue-router'

interface IUiPermission {
  accessRouter: (to: RouteLocationNormalized) => boolean
}

/**
 * 路由权限 hook
 */
export default function usePermission(): IUiPermission {
  /**
   * 判断用户是否有权限访问当前路由
   * @param to 将要跳转的路由
   */
  function accessRouter(to: RouteLocationNormalized) {
    const meta = to.meta as IRouteMeta
    return !meta.requiresAuth
  }

  return {
    accessRouter
  }
}
