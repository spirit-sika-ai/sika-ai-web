import { defineStore } from 'pinia'
import {computed, ref} from 'vue'

export const useSideBarStore = defineStore(
  'sideBar', () => {
  const open = ref<boolean>(true)
  const tips = computed(() => open.value ? '关闭边栏' : '打开边栏')
  const location = computed(() => open.value ? 'right' : 'bottom')
  function toggleSideBar() {
    open.value = !open.value
  }

  return { open, tips, location, toggleSideBar }
})