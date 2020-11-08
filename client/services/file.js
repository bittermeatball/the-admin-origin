import { Message } from 'element-ui'
export default function ({ $axios, app, store }, inject) {
  // Must be modified base on backend and storing service
  // This was made for Amazon S3 file uploading with pre-signed url
  const fileApi = {
    put: (signedRequest, file) => {
      try {
        if (process.env.NODE_ENV === 'development') {
          Message('DevOnly | File uploading API executed')
        }
        return $axios.put(signedRequest, file, {
          headers: {
            'Content-Type': file.type,
          },
        })
      } catch (error) {
        Message.error(app.i18n.t('error.FILE_UPLOAD_FAILED'))
      }
    },
    delete: (url, body) => {
      try {
        if (process.env.NODE_ENV === 'development') {
          Message('DevOnly | File deleting API executed')
        }
        // $axios.delete ignores data body, so use axios.request instead
        // In @nuxt/axios, use $axios.$request
        return $axios.$request({
          headers: {
            Authorization: store.state.auth.data.token,
          },
          method: 'delete',
          url,
          data: body,
        })
      } catch (error) {
        Message.error(app.i18n.t('error.FILE_DELETE_FAILED'))
      }
    },
  }
  // Inject to context as $fileApi
  inject('fileApi', fileApi)
}
