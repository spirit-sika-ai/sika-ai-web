<template>
  <el-container style="height: 95vh">
    <Transition>
      <el-aside
        v-if="sideBarStore.open"
        width="200px"
      >
        ElAside
      </el-aside>
    </Transition>
    <Transition>
      <el-main>
        <RouterView/>
      </el-main>
    </Transition>
  </el-container>
</template>

<script setup lang="ts">
import {useSideBarStore} from "@/stores/sideBar.ts";
const sideBarStore = useSideBarStore();
</script>

<style scoped lang="scss">
:deep(.el-main) {
  padding: 0;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>