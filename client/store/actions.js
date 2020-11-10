import { authMutations } from '~/constants/vuex/auth'
import { rootMutations } from '~/constants/vuex/root'
export default {
  // This will run first when nuxt app init
  // Called manually in middleware in SPA mode
  /**
   * Run as a middleware, used in nuxt.config.js as the first global middleware
   * therefore, this action will run first
   * @param {Object} context Vuex default action's first parameter
   * @returns {void} Return nothing
   */
  async nuxtServerInit({ commit }) {
    let auth = null
    const authString = localStorage.getItem('auth')
    auth = await JSON.parse(authString)
    commit(authMutations.SET.AUTH, auth)
    commit(rootMutations.SET.SERVER_STATE, true) // Server is ready
  },
}
