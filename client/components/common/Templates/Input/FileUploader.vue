<template>
  <span>
    <span @click="triggerFileDialog">
      <slot>
        <el-button type="primary" round size="small">Upload</el-button>
      </slot>
    </span>
    <input
      ref="fileInput"
      style="display: none"
      type="file"
      :multiple="multiple"
      @change="handleFileChange"
    />
  </span>
</template>
<script>
// import { random } from '~/utils/functions/random'
const reader = new FileReader()
export default {
  model: {
    prop: 'fileList',
    event: 'my-uploader-change',
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    fileList: [Array, Object],
    multiple: {
      type: Boolean,
      default: false,
    },
    preview: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // file: null,
    }
  },
  created() {
    reader.addEventListener(
      'load',
      () => {
        return reader.result
      },
      false
    )
  },
  methods: {
    triggerFileDialog() {
      this.$refs.fileInput.click()
    },
    readFileTo64Async(file) {
      const base64String = new Promise((resolve) => {
        reader.addEventListener(
          'load',
          (event) => {
            resolve(event.target.result)
          },
          false
        )
      })
      reader.readAsDataURL(file)
      return base64String
    },
    readFileToBlobUrl(file) {
      return URL.createObjectURL(file)
    },
    async handleFileChange(event) {
      const fileArr = await Promise.all(
        Array.from(event.target.files).map(async (file) => {
          /**
           * Return a helpful object instead of a File object
           *
           * Only read the file into base64 string when enable preview mode
           * because base64 is easier to handle
           *
           * There's a uid get from the blob url, use that for unique key binding or whatever
           */
          const fileObj = {
            raw: file,
            url: this.readFileToBlobUrl(file),
            uid: this.readFileToBlobUrl(file).split('/').pop(),
          }
          return this.preview // Read the file into base64 string when enable preview
            ? {
                ...fileObj,
                src: await this.readFileTo64Async(file),
              }
            : fileObj
        })
      )
      if (fileArr.length > 1) {
        this.$emit('my-uploader-change', fileArr)
      } else {
        this.$emit('my-uploader-change', fileArr[0])
      }
    },
  },
}
</script>
