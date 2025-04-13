<template>
  <header class="no-cursor">
    <SideBarSwitch/>
    <div style="display: flex; align-items: center; margin-top: 5px">
      <Avatar style="margin-right: 10px"/>
      <DarkChange/>
    </div>
  </header>
  <div class="char-container-wrapper no-cursor">
    <div class="char-container">
      <Chat />
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBarSwitch from "@/components/SideBarSwitch.vue";
import DarkChange from "@/components/DarkChange.vue";
import Chat from "@/components/chat/Chat.vue";
import Avatar from "@/components/Avatar.vue";
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1.5;
  min-height: 50px;
  padding: 0 10px;
}
.char-container-wrapper {
  display: flex;
  justify-content: center;

}
</style>