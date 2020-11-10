import { rootActions } from '~/constants/vuex/root'
/**
 * Run as a middleware, used in nuxt.config.js as the first global middleware
 * therefore, this action will run first
 * @param {Object} context Vuex default action's first parameter
 * @returns {void} Return nothing
 */
export default async function ({ store }) {
  // console.log(store.state.message)
  if (!store.state.serverReady) {
    await store.dispatch(rootActions.NUXT_SERVER_INIT)
  }
}
