<template>
  <el-main>
    <DataTable
      v-loading="$fetchState.pending"
      :data="data"
      :total="dataTotal"
      :limit="dataQuery.limit"
      :current-page="dataQuery.page"
      :multiple-choice="false"
      @my-table-on-action="handleTableEvents"
      @my-table-edit="onEdit"
      @my-table-delete="onDelete"
      @my-table-add-new="$router.push('/posts/create')"
    >
      <el-table-column type="index" width="50" />
      <el-table-column :label="$t('blogs.index.title')" prop="title" />
      <el-table-column :label="$t('blogs.index.author')" prop="user">
        <template slot-scope="scope">
          {{ scope.row.user.name }}
        </template>
      </el-table-column>
    </DataTable>
  </el-main>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import qs from 'qs'
import { config } from './config'
import { DataTable } from '~/components/common/Templates/Table'
import { blogMutations as moduleMutations } from '~/store/blog/mutations'
import { blogActions as moduleActions } from '~/store/blog/actions'
import dataTableMixin from '~/mixins/components/table'
export default {
  name: 'Home',
  meta: {
    config,
  },
  middleware: [
    'auth',
    ({ store, query }) => {
      if (qs.stringify(query) !== '') {
        // Looking for numeric string and convert them to Number
        Object.keys(query).forEach((key, index) => {
          if (!isNaN(query[key])) {
            query[key] = Number(query[key])
          }
        })
        store.commit(moduleMutations.SET.QUERY, query)
      }
    },
  ],
  components: {
    DataTable,
  },
  mixins: [dataTableMixin],
  data() {
    return {
      moduleMutations,
      moduleActions,
    }
  },
  computed: mapState({
    locale: (state) => state.locale,
    data: (state) => state.blog.data,
    dataQuery: (state) => state.blog.query,
    dataTotal: (state) => state.blog.total,
  }),
  methods: {
    ...mapActions({
      deleteSingle: moduleActions.DELETE.SINGLE,
    }),
    onEdit(payload) {
      this.$router.push(`/blogs/${payload.rowData.id}/edit`)
    },
    onDelete(payload) {
      try {
        this.confirmAction(async () => {
          await this.deleteSingle(payload.rowData.id)
          this.$fetch()
        })
      } catch (error) {
        //
      }
    },
  },
  head() {
    return {
      title: this.$t('home.title'),
    }
  },
}
</script>
