import qs from 'qs'
import { blogMutations } from './mutations'

export const blogActions = {
  FETCH: {
    DATA: 'blog/fetchData',
    MORE: 'blog/fetchMoreData',
    SINGLE: 'blog/fetchSingle',
  },
  SUBMIT: {
    // MULTIPLE: 'blog/submitMultiple',
    SINGLE: 'blog/submitSingle',
  },
  UPDATE: {
    // MULTIPLE: 'blog/updateMultiple',
    SINGLE: 'blog/updateSingle',
  },
  TOGGLE: {},
  ACTIVATE: {},
  DEACTIVATE: {},
  DELETE: {
    // MULTIPLE: 'blog/deleteMultiple',
    SINGLE: 'blog/deleteSingle',
  },
}

export default {
  async fetchData({ state, commit }) {
    const response = await this.$clientApi.get(
      'blogs?' + qs.stringify(state.query, { arrayFormat: 'repeat' })
    )
    commit(blogMutations.SET.DATA, response.data.data, { root: true })
    // Fix total later
    commit(blogMutations.SET.TOTAL, response.data.total, { root: true })
    return response.data
  },
  async fetchMoreData() {
    const response = await this.$clientApi.get('/blogs')
    return response
  },
  async fetchSingle({ rootState }, id) {
    const response = await this.$clientApi.get('/blogs/' + id)
    return response
  },
  async submitSingle({ rootState }, form) {
    const response = await this.$clientApi.post('/blogs', form)
    return response
  },
  async updateSingle({ rootState }, { id, form }) {
    const response = await this.$clientApi.put('/blogs/' + id, form)
    return response
  },
  async deleteSingle({ rootState }, id) {
    const response = await this.$clientApi.delete('/blogs/' + id)
    return response
  },
}
