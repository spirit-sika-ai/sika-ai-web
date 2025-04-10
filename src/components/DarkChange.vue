<template>
  <el-switch
    v-model="isDark"
    style="
      --el-switch-off-color: #2c2c2c;
      --el-switch-on-color: #eff0f3;
      --el-switch-border-color: #f7f7f7;
    "
    size="large"
    class="no-cursor"
  >
    <template v-slot:active-action>
      <el-icon>
        <Moon color="#000000"/>
      </el-icon>
    </template>
    <template v-slot:inactive-action>
      <el-icon>
        <Sunny/>
      </el-icon>
    </template>
  </el-switch>
</template>

<script setup lang="ts">
import {useDark} from '@vueuse/core'
import {Sunny, Moon} from '@element-plus/icons-vue'

const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: ''
})
</script>

<style scoped lang="scss">
/* 让滑块滑动时平滑过渡 */
:deep(.el-switch__action) {
  transition: left 0.3s ease-in-out !important;
}
</style>