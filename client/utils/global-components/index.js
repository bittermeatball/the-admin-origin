import Vue from 'vue'

const requireModule = require.context('./modules', false, /\.js$/)
requireModule.keys().forEach((fileName) => {
  const moduleName = fileName.replace(/(\.\/|\.js)/g, '')
  Vue.component(moduleName, requireModule(fileName))
})
