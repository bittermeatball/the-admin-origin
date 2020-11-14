import Vue from 'vue'

export const blogMutations = {
  SET: {
    DATA: 'blog/SET_DATA',
    TOTAL: 'blog/SET_TOTAL',
    QUERY: 'blog/SET_QUERY',
  },
  CLEAR: {
    QUERY: 'blog/CLEAR_QUERY',
  },
  TOGGLE: {},
  ADD: {},
  REMOVE: {},
  INC: {
    QUERY_PAGE: 'blog/INC_QUERY_PAGE',
  },
  SUB: {
    QUERY_PAGE: 'blog/SUB_QUERY_PAGE',
  },
}

export default {
  SET_DATA(state, data) {
    Vue.set(state, 'data', data)
  },
  SET_TOTAL(state, total) {
    Vue.set(state, 'total', total)
  },
  SET_QUERY(state, query) {
    Vue.set(state, 'query', { ...state.query, ...query })
  },
  SET_SINGLE_VISIBILITY(state, { rowId, value }) {
    Vue.set(state.data[rowId], 'isVisible', value)
  },
  SET_SINGLE_ISACTIVE(state, { rowId, value }) {
    Vue.set(state.data[rowId], 'isActive', value)
  },
  CLEAR_QUERY(state) {
    Vue.set(state, 'query', {
      page: 1,
      limit: 10,
    })
  },
  INC_QUERY_PAGE(state) {
    Vue.set(state.query, 'page', state.query.page + 1)
  },
  SUB_QUERY_PAGE(state) {
    Vue.set(state.query, 'page', state.query.page - 1)
  },
}
