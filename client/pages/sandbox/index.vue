<template>
  <el-main>
    <p>Trang để anh em vọc code</p>
    <p>Trang này chỉ chạy được trong dev</p>
    <p>Test your code here</p>
    <p>This page only available in dev mode</p>
    <div>
      <!-- Your test code here -->
      <FileUploader v-model="file" :multiple="true" />
      <!-- Just don't ruin the whole project, LOL :D -->
    </div>
  </el-main>
</template>
<script>
import { FileUploader } from '~templates/Input'
export default {
  name: 'Home',
  meta: {
    config: {
      auth: false,
      permission: ['ALL'],
    },
  },
  middleware: [
    ({ isDev, redirect }) => {
      if (!isDev) {
        redirect('/')
      }
    },
    'auth',
  ],
  components: {
    FileUploader,
  },
  data() {
    return {
      file: null,
    }
  },
  head() {
    return {
      title: this.$t('sandbox.title'),
    }
  },
}
</script>
