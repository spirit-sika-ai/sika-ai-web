<template>
  <div @click="toLogin">
    <el-avatar :size="50" />
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter()

function toLogin () {
  router.push({name: 'login'})
}
</script>

<style scoped lang="scss">

</style>