import Vue from 'vue'

/**
 * Root mutation module's enum
 */
export const rootMutations = {
  SET: {
    LANG: 'SET_LANG',
    SERVER_STATE: 'SET_SERVER_STATE',
  },
  CLEAR: {},
  TOGGLE: {
    SIDEBAR_COLLAPSE: 'TOGGLE_SIDEBAR_COLLAPSE',
  },
  ADD: {},
  REMOVE: {},
  INC: {},
  SUB: {},
}

export default {
  // Communicate with Devtools
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      Vue.set(state, 'locale', locale)
    }
  },
  // Options
  TOGGLE_SIDEBAR_COLLAPSE(state) {
    state.options.sidebarCollapsed = !state.options.sidebarCollapsed
  },
  SET_SERVER_STATE(state, serverReady) {
    Vue.set(state, 'serverReady', serverReady)
  },
}
