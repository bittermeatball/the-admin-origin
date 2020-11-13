import { authMutations } from './mutations'

/**
 * Auth action module's enum
 */
export const authActions = {
  LOGIN: 'auth/login',
  LOGOUT: 'auth/logout',
}

export default {
  /**
   * Login action
   * @param {Object} context Vuex default action's first parameter
   * @param {Object} form Get from login form
   * @param {String} form.email
   * @param {String} form.password
   * @returns {void} Return nothing
   */
  login({ commit }, form) {
    let auth = null
    // Faking auth data
    auth = {
      ...form,
      role: 'ADMIN',
      accessToken: 'yourAccessTokenFromBackend',
    }
    localStorage.setItem('auth', JSON.stringify(auth))
    commit(authMutations.SET.AUTH, auth, { root: true }) // Mutating to store for client rendering
  },
  /**
   * Logout action
   * @param {Object} context Vuex default action's first parameter
   * @returns {void} Return nothing
   */
  logout({ commit }) {
    localStorage.removeItem('auth')
    commit(authMutations.SET.AUTH, null, { root: true })
  },
}
