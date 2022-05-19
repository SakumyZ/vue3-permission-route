<template>
  <h1>401</h1>
  <button @click="goHome">Back To Home</button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => {
  router.push('/home')
}
</script>

<style scoped></style>
