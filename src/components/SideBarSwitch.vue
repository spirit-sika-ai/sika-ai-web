<template>
  <ElTooltip
    :content="sideBarStore.tips"
    :placement="sideBarStore.location"
  >
    <div class="img-container" @click="sideBarStore.toggleSideBar">
      <img :src="sidebarImg" alt="" />
    </div>
  </ElTooltip>
</template>

<script setup lang="ts">
import sidebarImg from '@/assets/img/sidebar.png'
import {useSideBarStore} from "@/stores/sideBar.ts";
const sideBarStore = useSideBarStore();
</script>

<style scoped lang="scss">
.img-container {
  display: flex;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    vertical-align: center;
  }
}
</style>