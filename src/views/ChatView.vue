<template>
  <header class="no-cursor">
    <SideBarSwitch/>
    <DarkChange/>
  </header>
  <div class="char-container-wrapper no-cursor">
    <div class="char-container">
      <div style="width: 300px; height: 1200px; background-color: black;"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBarSwitch from "@/components/SideBarSwitch.vue";
import DarkChange from "@/components/DarkChange.vue";
</script>

<style scoped lang="scss">
header {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //background: linear-gradient(to right, rgb(165, 180, 252), rgb(192, 132, 252));
  background: #FFF;
  line-height: 1.5;
  min-height: 50px;
  max-height: 100vh;
  padding: 0 10px;
  border-radius: 10px;
}
.char-container-wrapper {
  display: flex;
  justify-content: center;

}
</style>