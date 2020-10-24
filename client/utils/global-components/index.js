import Vue from 'vue'

const requireModule = require.context('./', true, /\.js$/)
requireModule.keys().forEach(requireModule)
requireModule.keys().forEach((fileName) => {
  if (!fileName.includes('index.js')) {
    const temp = fileName.replace(/(\.\/|\.js)/g, '').split('/')
    const moduleName = temp.length > 1 ? temp[temp.length - 1] : temp[0]
    Vue.component(moduleName, requireModule(fileName).default)
  }
})
