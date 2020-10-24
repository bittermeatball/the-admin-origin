export default {
  // Should be modified base on backend
  isAdmin(state) {
    return state.data?.role?.includes('ADMIN')
  },
}
