<template>
  <div class="wrapper">
    <Sidebar />
    <div class="main">
      <Header />
      <Main />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/views/layout/header/index.vue'
import Sidebar from '@/views/layout/sidebar/index.vue'
import Main from '@/views/layout/main/index.vue'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
}
.main {
  height: 100vh;
  width: calc(100% - 200px);
}
</style>
