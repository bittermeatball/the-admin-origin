import { authMutations } from '~/constants/vuex/auth'
export default {
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
  logout({ commit }) {
    localStorage.removeItem('auth')
    commit(authMutations.SET.AUTH, null, { root: true })
  },
}
