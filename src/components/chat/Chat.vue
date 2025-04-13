<template>
  <div>
    <el-form>
      <el-form-item>
        <el-input
          type="textarea"
          resize="none"
          class="sika-textarea"
          :autosize="{ minRows: 4, maxRows: 19 }"
          :input-style="{
            borderRadius: '25px',
            padding: '20px',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.sika-textarea {
  width: 50vw;
}
</style>