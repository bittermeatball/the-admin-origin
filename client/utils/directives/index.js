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

// Docs: https://vuejs.org/v2/guide/custom-directive.html
// Use with v-something
// Vue.directive('something', {
//   bind(el, binding, vnode, oldVnode) {}, // Called once, when the directive is first bound to the element.
//   inserted(el, binding, vnode, oldVnode) {}, // Has parent node here.
//   update(el, binding, vnode, oldVnode) {}, // Remember to compare the binding’s current and old values to avoid unnecessary updates.
//   componentUpdated(el, binding, vnode, oldVnode) {}, // Called after the containing component’s VNode and the VNodes of its children have updated.
//   unbind(el, binding, vnode, oldVnode) {}, // When component destroyed (when the directive is unbound from the element).
// })
