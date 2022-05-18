import { IRouteMeta } from './../router/index'
import { RouteLocationNormalized } from 'vue-router'

interface IUiPermission {
  accessRouter: (to: RouteLocationNormalized) => boolean
}

export default function usePermission(): IUiPermission {
  function accessRouter(to: RouteLocationNormalized) {
    const meta = to.meta as IRouteMeta
    return !meta.requiresAuth
  }

  return {
    accessRouter
  }
}
