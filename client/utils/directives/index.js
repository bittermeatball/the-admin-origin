import Vue from 'vue'

const requireModule = require.context('./', true, /\.js$/)
requireModule.keys().forEach(requireModule)
requireModule.keys().forEach((fileName) => {
  if (!fileName.includes('index.js')) {
    const temp = fileName.replace(/(\.\/|\.js)/g, '').split('/')
    const moduleName = temp.length > 1 ? temp[temp.length - 1] : temp[0]
    Vue.directive(moduleName, requireModule(fileName).default)
  }
})

// Vue.directive('something', {
//   bind(el, binding, vnode, oldVnode) {},
//   inserted(el, binding, vnode, oldVnode) {},
//   update(el, binding, vnode, oldVnode) {},
//   componentUpdated(el, binding, vnode, oldVnode) {},
//   unbind(el, binding, vnode, oldVnode) {},
// })
