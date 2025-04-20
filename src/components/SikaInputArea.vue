<template>
  <div class="sika-input-area-wrapper">
    <textarea
      ref="sika-textarea"
      class="sika-input-area"
      v-bind="inputProps"
      v-model="internalValue"
    />
    <slot>
      <div class="text-area-bottom">
        <div class="flex-wrapper">
          <slot name="left">
            <div class="left-area">
              <SikaButton is-switch>think</SikaButton>
              <SikaButton>search</SikaButton>
            </div>
          </slot>
          <slot name="right">
            <div class="right-area">
              <SikaButton>
              </SikaButton>
              <SikaButton :disabled="true">send</SikaButton>
            </div>
          </slot>
        </div>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import {ref, watch, useAttrs, computed, onMounted, useTemplateRef} from 'vue'
import {cloneDeepExclude} from "@/util/TypeUtil.ts";
import SikaButton from "@/components/SikaButton/SikaButton.vue";

const textarea = useTemplateRef<HTMLTextAreaElement>('sika-textarea')
const internalValue = ref<string>('')

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  row: {
    type: Number,
    default: 4
  },
  col: {
    type: Number,
    default: 30
  },
  resize: {
    type: Boolean,
    default: false
  },
  fSize: {
    type: String,
    default: '18px'
  },
  width: {
    type: String,
    default: '100%'
  },
  type: {
    type: String,
    default: 'textarea'
  },
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '咨询任何问题'
  }
})

// 透传所有props并排除type
const inputProps = {
  ...useAttrs(),
  ...cloneDeepExclude(props, ['type']),
  type: 'textarea',
}

const resizeStyle = computed(() => {
  return props.resize ? 'both' : 'none'
})

watch(
  () => internalValue.value,
  (newValue) => {
    emit('update:modelValue', newValue)
  }
)

onMounted(() => {
  // resetInputSize()
})
</script>

<style scoped lang="scss">
.sika-input-area-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .sika-input-area {
    box-sizing: border-box;
    padding: 10px 8px;
    resize: v-bind(resizeStyle);
    border: 0;
    background-color: #f2f0f0;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    height: 210px;
    width: 1000px;
    line-height: v-bind(fSize);
    font-size: v-bind(fSize);
    font-family: "Helvetica Neue",
    Helvetica,
    "PingFang SC",
    "Hiragino Sans GB",
    "Microsoft YaHei",
    "微软雅黑",
    Arial,
    sans-serif;
  }

  .text-area-bottom {
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    padding: 10px;
    box-sizing: border-box;
    background-color: #f2f0f0;
    height: 70px;
    max-height: 70px;
    overflow: hidden;
    width: 1000px;

    .flex-wrapper {
      display: flex;
      flex: 1;
      justify-content: space-between;
      align-items: center;
      flex-wrap: nowrap;
      height: 50px;

      .left-area {
        justify-content: start;
        display: flex;
        align-items: center;
      }

      .right-area {
        justify-content: end;
        display: flex;
        align-items: center;
      }

    }

  }
}

textarea {
  &:focus, &:focus-visible {
    outline: none;
  }
}
</style>