<template>
  <div class="sidebar-wrapper">
    <ul class="sidebar-menu-wrapper">
      <li
        class="sidebar-menu-item"
        :class="{ active: item.name === selectedRouteKey }"
        v-for="item in routes"
        :id="(item.name as string)"
        @click="handleRouteClick(item)"
      >
        {{ item?.meta?.menu }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { IRouteMeta, dynamicRoutes } from '@/router'
import { ref } from 'vue'
import { RouteRecordRaw, useRouter } from 'vue-router'
import { ROUTE_AUTHORITY } from '@/config'

const showInMenuRoutes: RouteRecordRaw[] = dynamicRoutes.filter(
  item => !(item?.meta as IRouteMeta)?.hideInMenu
)

const router = useRouter()

// 选中的路由 key
const selectedRouteKey = ref<string>('')

// 过滤掉该用户未拥有权限访问的路由
const routes: RouteRecordRaw[] = showInMenuRoutes[0].children!.filter(route => {
  const userRouteAuths = [ROUTE_AUTHORITY.USER]
  const meta = route.meta as IRouteMeta

  return !meta.requiresAuth || userRouteAuths.some(auth => meta.authority.includes(auth))
})

// 默认第一个路由为当前选中路由
selectedRouteKey.value = showInMenuRoutes[0].children![0].name as string

/**
 * 选中menu 进行路由跳转
 * @param {RouteRecordRaw} route 点击的路由
 */
const handleRouteClick = (route: RouteRecordRaw) => {
  selectedRouteKey.value = route.name as string
  router.push(route.path)
}
</script>

<style lang="scss" scoped>
.sidebar-wrapper {
  width: 200px;
  height: 100vh;
  background: #2c3e50;
  .sidebar-menu-wrapper {
    list-style: none;
    margin-block: 0;
    padding-inline-start: 0;
    color: #fff;

    .sidebar-menu-item {
      padding: 10px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background: #5e84aa;
      }

      &.active {
        background: #5e84aa;
      }
    }
  }
}
</style>
