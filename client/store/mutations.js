import Vue from 'vue'
export default {
  // Communicate with Devtools
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      Vue.set(state, 'locale', locale)
    }
  },
  SET_SERVER_STATE(state, serverReady) {
    Vue.set(state, 'serverReady', serverReady)
  },
}
