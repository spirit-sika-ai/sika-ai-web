<template>
  <div
    role="button"
    class="--sika-button"
    :class="computedClass"
    @mousedown.left="handleKeyDown"
    @mouseup.left="handleKeyUp"
    @mouseleave="handleKeyUp"
    @click="handleClick"
  >
    <slot name="icon-left"></slot>

    <slot>{{active}}</slot>

    <slot name="icon-right"></slot>
  </div>
</template>

<script setup lang="ts">
import type {SikaButtonProps} from "@/components/SikaButton/Button.ts";
import {useButtonHooks} from "@/components/SikaButton/hooks/UseButtonHooks.ts";

defineOptions({
  name: 'SikaButton'
})

const emit = defineEmits({
  click: (evt: MouseEvent) => evt instanceof MouseEvent
})

const {
  theme = 'default',
  type = '',
  disabled = false,
  isSwitch = false,
  sikaBtnClass = '',
  circle = false,
  round = true,
} = defineProps<SikaButtonProps>()

const {
  active,
  computedClass,
  borderStyle,
  boxShadowStyle,
  handleKeyDown,
  handleKeyUp
} = useButtonHooks(disabled)

/**
 * @description disabled 时阻止点击事件触发
 * @param evt 点击事件对象
 */
const handleClick = (evt: MouseEvent) => {
  if (disabled) {
    evt.stopPropagation()
    return
  }
  if (isSwitch) {
    // 改变按钮状态
    evt.stopPropagation()
    return;
  }
  emit('click', evt)
}
</script>

<style scoped lang="scss">
.--sika-button-disabled {
  color: rgba(0, 0, 0, .3);
  cursor: not-allowed;
}

.--sika-button-active {
  background-color: #4d6bfe;
  color: #2944c7;
}
.--sika-button-unactive {
  background-color: #dbeafe;
  color: #4d6bfe;
  &:hover {
    background-color: #c5daf6;
  }
}
.--sika-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: v-bind(borderStyle);
  border-radius: 15px;
  height: 30px;
  min-width: 10px;
  max-height: 30px;
  margin-right: 10px;
  padding: 0 10px;
  box-shadow: v-bind(boxShadowStyle);
  transition: background-color .3s ease;
}
</style>