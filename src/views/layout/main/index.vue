<template>
  <main class="app-main">
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.app-main {
  width: 100%;
  height: calc(100% - 60px);
}
</style>
