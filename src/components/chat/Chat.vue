<template>
  <div class="chat-wrapper">
    <el-form>
      <el-form-item>
        <SikaInputArea
          v-model="mdStr"
          :f-size="size"
          @show="showMd"
        />
      </el-form-item>
    </el-form>
    <!--md效果预览-->
    <div class="md-wrapper">
      <div v-html="htmlStr"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useMarkedHooks} from "@/hooks/useMarkedHooks.ts";
import SikaInputArea from "@/components/SikaInputArea.vue";
const size = ref<string>('18px');
const {mdStr} = useMarkedHooks();

const htmlStr = ref<string>('')
const showMd = (reply: string) => {
  htmlStr.value = reply
}
</script>

<style scoped lang="scss">
/* markdown代码块圆角 */
:deep(.hljs) {
  border-radius: 10px !important;
}

.md-wrapper {
  border-radius: 10px;
}

.chat-wrapper {
  max-width: 70vw;
  width: 70vw;
}
</style>