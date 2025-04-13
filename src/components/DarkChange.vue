<template>
  <el-switch
    ref="darkChangeSwitch"
    v-model="isDark"
    style="
      --el-switch-off-color: #2c2c2c;
      --el-switch-on-color: #eff0f3;
      --el-switch-border-color: #f7f7f7;
    "
    size="large"
    class="no-cursor"
    :before-change="handDarkChange"
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
import {ref} from "vue";

const darkChangeSwitch = ref<typeof import('element-plus')['ElSwitch']>()

const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light'
})

const handDarkChange = () => {
  if (!document.startViewTransition) return true

  return new Promise(resolve => {
    // 获取组件主题切换位置并计算动画圆形半径
    const posInfo = darkChangeSwitch.value?.$el?.getBoundingClientRect()
    const x = posInfo.left + posInfo.width / 2
    const y = posInfo.top + posInfo.height / 2
    // hypot:平方和的平方根, max: 切换主题的按钮可能在左边，也可能在右边，按钮离哪边远，动画就向那边扩散的多，取最长的半径
    const radius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )

    const transition = document.startViewTransition(() => {
      resolve(true)
    })

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${radius}px at ${x}px ${y}px)`
      ]

      document.documentElement.animate(
        {
          clipPath: clipPath
        },
        {
          duration: 700,
          direction: 'reverse',
          fill: 'backwards',
          easing: 'ease-in',
          pseudoElement: '::view-transition-new(root)'
        }
      )
    })
  })
}

</script>

<style scoped lang="scss">
/* 让滑块滑动时平滑过渡 */
:deep(.el-switch__action) {
  transition: left 0.3s ease-in-out !important;
}

</style>