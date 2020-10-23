import Vue from 'vue'

const requireModule = require.context('./modules', false, /\.js$/)
requireModule.keys().forEach((fileName) => {
  const moduleName = fileName.replace(/(\.\/|\.js)/g, '')
  Vue.directive(moduleName, requireModule(fileName))
})

// Vue.directive('something', {
//   bind(el, binding, vnode, oldVnode) {},
//   inserted(el, binding, vnode, oldVnode) {},
//   update(el, binding, vnode, oldVnode) {},
//   componentUpdated(el, binding, vnode, oldVnode) {},
//   unbind(el, binding, vnode, oldVnode) {},
// })
