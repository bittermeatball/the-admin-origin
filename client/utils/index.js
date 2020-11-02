import Vue from 'vue'

// Setup all utilities
// Only filters, directives and global components are setup, helper functions must be imported manually
const requireModule = require.context('./', true, /\.js$/)
requireModule.keys().forEach(requireModule)
requireModule.keys().forEach((fileName) => {
  if (!fileName.includes('index.js')) {
    const temp = fileName.replace(/(\.\/|\.js)/g, '').split('/')
    const moduleName = temp.length > 1 ? temp[temp.length - 1] : temp[0]
    if (fileName.includes('/filters')) {
      Vue.filter(moduleName, requireModule(fileName).default)
    } else if (fileName.includes('/directives')) {
      Vue.directive(moduleName, requireModule(fileName).default)
    } else if (fileName.includes('/global-components')) {
      Vue.component(moduleName, requireModule(fileName).default)
    }
  }
})

// Setup event bus
const eventBus = {}

eventBus.install = (Vue) => {
  Vue.prototype.$bus = new Vue()
}

Vue.use(eventBus)
