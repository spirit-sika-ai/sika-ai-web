import {computed, ref, useAttrs, watch} from "vue";
import {cloneDeep} from "lodash";

const initBorderStyle = '1px solid #4d6bfe'
const initBxShadowStyle = '1px 2px 5px #4d6bfe'
const disabledBorderStyle = '1px solid #a4b1f2'
const disabledBxShadowStyle = '1px 1px 2px #a4b1f2'
const activeBorderStyle = '1px solid #dbeafe'

export const useButtonHooks = (disabled: boolean) => {
  const borderStyle = ref<string>(cloneDeep(initBorderStyle))
  const boxShadowStyle = ref<string>(cloneDeep(initBxShadowStyle))
  const active = ref(false)
  const attrs = useAttrs()

  const handleKeyDown = () => {
    active.value = true
  }
  const handleKeyUp = () => {
    active.value = false
  }

  watch(
    () => {
      return disabled
    },
    () => {
    borderStyle.value = cloneDeep(initBorderStyle)
    boxShadowStyle.value = cloneDeep(initBxShadowStyle)
    // 禁用状态全部为禁用样式
    if (disabled) {
      borderStyle.value = cloneDeep(disabledBorderStyle)
      boxShadowStyle.value = cloneDeep(disabledBxShadowStyle)
    }
    // 非禁用状态处理激活状态样式
    else {
      if (active) {
        borderStyle.value = cloneDeep(activeBorderStyle)
      }
    }
  })


  const computedClass = computed(() => {
    if (disabled) {
      const sikaClass = attrs?.sikaClass
      const classArray = []
      if (disabled) {
        classArray.push('--sika-button-disabled')
      }
      if (typeof sikaClass === 'string' && sikaClass.length > 0) {
        classArray.push(sikaClass)
      }
      return classArray
    } else {
      return [active.value ? '--sika-button-active' : '--sika-button-unactive']
    }
  })

  return {
    active,
    borderStyle,
    boxShadowStyle,
    computedClass,
    handleKeyDown,
    handleKeyUp
  }
}