export default {
  /**
   * Should be modified base on backend
   * Check if current logged in user is admin or not
   * @param {*} state
   * @returns {Boolean} true or false
   */
  isAdmin(state) {
    return state.data?.role?.includes('ADMIN')
  },
}
