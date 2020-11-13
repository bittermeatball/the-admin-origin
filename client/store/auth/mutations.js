import Vue from 'vue'

/**
 * Auth mutation module's enum
 */
export const authMutations = {
  SET: {
    AUTH: 'auth/SET_AUTH',
    AUTH_FULLNAME: 'auth/SET_AUTH_FULLNAME',
    AUTH_AVATAR: 'auth/SET_AUTH_AVATAR',
  },
  CLEAR: {},
  TOGGLE: {},
  ADD: {},
  REMOVE: {},
  INC: {},
  SUB: {},
}

export default {
  SET_AUTH(state, auth) {
    Vue.set(state, 'data', auth)
  },
}
