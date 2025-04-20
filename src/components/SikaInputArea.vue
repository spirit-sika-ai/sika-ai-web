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
              <el-button type="primary" plain>think</el-button>
              <el-button type="primary" plain>search</el-button>
            </div>
          </slot>
          <slot name="right">
            <div class="right-area">
              <el-button
                type="success"
                plain
                :disabled="disabledSend"
                @click="clickSend"
              >
                send
              </el-button>
            </div>
          </slot>
        </div>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import {ref, watch, useAttrs, computed, onMounted} from 'vue'
import {cloneDeepExclude} from "@/util/TypeUtil.ts";
import {requestStreamMessage} from "@/api/chat.ts";
import {useMarkedHooks} from "@/hooks/useMarkedHooks.ts";
import type {ChatResponse, R} from "@/type/BaseType.ts";
defineOptions({
  name: 'SikaInputArea'
})
const emit = defineEmits(['update:modelValue', 'show'])
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
const {marked} = useMarkedHooks()
const internalValue = ref<string>('')

const disabledSend = computed(
  () => {
    return internalValue.value.length === 0
  })

const clickSend = () => {
  let reply = ''
  requestStreamMessage(internalValue.value)
    .then(e => {
      e.onmessage = (messageEvent: MessageEvent) => {
        const data = JSON.parse(messageEvent.data) as R<ChatResponse>
        if (data.result.result.metadata.finishReason === "STOP") {
          e.close()
        }
        else {
          const {text} = data.result.result.output
          // TODO think标签中的内容, 每一行都需要加上>
          if (text?.length > 0) {
            reply += text
            const htmlStr = marked.parse(reply)
            console.log(htmlStr);
            emit('show', htmlStr)
          }
        }
      }
    })
    .catch(ElMessage.error)
}

watch(
  () => internalValue.value,
  (newValue) => {
    emit('update:modelValue', newValue)
  }
)

const resizeStyle = computed(() => {
  return props.resize ? 'both' : 'none'
})

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