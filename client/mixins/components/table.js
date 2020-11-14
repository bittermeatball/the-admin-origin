/**
 * Use this mixin if you use DataTable component
 * Modify the onPageChange to suit your need depend on what method does your backend use for pagination (page or offset)
 */
import qs from 'qs'
export default {
  async fetch() {
    await this.$store.dispatch(this.moduleActions.FETCH.DATA)
    this.pushRouterQuery()
  },
  data() {
    return {
      /**
       * Handle events emitted by DataTable
       * This help the handleTableEvents method call the handler ones
       */
      handlers: {
        'limit-change': 'onLimitChange',
        refresh: 'onRefresh',
        'selection-change': 'onSelectionChange',
        'sort-change': 'onSortChange',
        'size-change': 'onSizeChange',
        'page-change': 'onPageChange',
        'page-prev': 'onPagePrev',
        'page-next': 'onPageNext',
      },
    }
  },
  methods: {
    handleTableEvents(event) {
      this[this.handlers[event.action]](event.payload)
    },
    onSizeChange(total) {
      // console.log('Pagination changed to ' + total)
    },
    onPageChange(currentPage) {
      this.$store.commit(this.moduleMutations.SET.QUERY, {
        page: currentPage,
      })
      this.$fetch()
    },
    onPagePrev() {
      this.$store.commit(this.moduleMutations.SUB.QUERY_PAGE)
      this.$fetch()
    },
    onPageNext() {
      this.$store.commit(this.moduleMutations.INC.QUERY_PAGE)
      this.$fetch()
    },
    onSelectionChange(selected) {
      this.selectedItems = selected
    },
    onSortChange(payload) {
      this.$store.commit(this.moduleMutations.SET.QUERY, {
        page: 1,
        orderBy: `${payload.prop} ${
          payload.order === 'ascending' ? 'asc' : 'desc'
        }`,
      })
    },
    onLimitChange(limit) {
      this.$store.commit(this.moduleMutations.SET.QUERY, {
        page: 1,
        limit,
      })
      this.$fetch()
    },
    onRefresh() {
      this.$store.commit(this.moduleMutations.CLEAR.QUERY)
      this.$fetch()
    },
    confirmAction(success, fail = () => {}) {
      this.$confirm(
        this.$t('table.confirm-warning'),
        this.$t('table.confirm-title'),
        {
          confirmButtonText: this.$t('table.confirm-ok'),
          cancelButtonText: this.$t('table.confirm-abort'),
          type: 'warning',
        }
      )
        .then(() => {
          try {
            success()
          } catch (err) {
            throw new Error(
              'The first argument of confirmAction must be function'
            )
          }
        })
        // Choose cancel
        .catch(() => {
          try {
            fail()
          } catch (err) {
            // Nothing happen
          }
        })
    },
    pushRouterQuery() {
      // this.$router.push does change the $route.query,
      // but doesn't change the browser url from the 2nd time above (cache or something, i dunno)
      history.pushState(
        {},
        '',
        this.$route.path +
          '?' +
          qs.stringify(this.dataQuery, { arrayFormat: 'repeat' })
      )
    },
  },
}
