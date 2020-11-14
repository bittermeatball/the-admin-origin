<template>
  <div class="datatable">
    <div class="mb-5">
      <el-select
        :value="limit"
        size="mini"
        class="select-none datatable-limit-select"
        style="width: 80px"
        @input="
          (e) => {
            $emit('my-table-on-action', {
              action: 'limit-change',
              payload: {
                e,
              },
            })
          }
        "
      >
        <el-option
          v-for="paginateLimit in [10, 25, 50, 100]"
          :key="'paginate-limit-' + paginateLimit"
          :label="paginateLimit"
          :value="paginateLimit"
          class="select-none"
        >
        </el-option>
      </el-select>
      <el-button
        circle
        size="mini"
        icon="el-icon-refresh"
        class="ml-1 select-none border-none duration-150 focus:bg-success focus:text-light shadow hover:bg-success hover:text-light"
        @click="
          $emit('my-table-on-action', {
            action: 'refresh',
            payload: null,
          })
        "
      >
      </el-button>
      <slot name="button">
        <el-button
          class="float-right border-0 bg-success hover:bg-success-600 text-light select-none rounded-lg"
          size="large"
          icon="el-icon-plus"
          @click="
            $emit('my-table-on-action', {
              action: 'add-new',
              payload: null,
            })
          "
        >
          {{ $t('components.table.data.add-new') }}
        </el-button>
      </slot>
    </div>
    <hr />
    <el-table
      ref="dataTable"
      class="w-full"
      :height="height"
      :data="data"
      @selection-change="
        (selected) => {
          $emit('my-table-on-action', {
            action: 'selection-change',
            payload: {
              selected,
            },
          })
        }
      "
      @sort-change="
        (payload) => {
          $emit('my-table-on-action', {
            action: 'sort-change',
            payload: {
              payload,
            },
          })
        }
      "
    >
      <el-table-column
        v-if="multipleChoice"
        type="selection"
        width="55"
        class="select-none"
      />
      <slot></slot>
      <slot name="tableActions">
        <el-table-column width="40" align="right">
          <template slot-scope="scope">
            <el-dropdown trigger="click" @command="handleActionCommand">
              <span class="el-dropdown-link text-xl text-dark">
                <fa :icon="['fas', 'cog']" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="action in actions"
                  :key="`${action.name}:${scope.$index}`"
                  :command="`${action.name}:${scope.$index}`"
                >
                  <!-- If using 'SELF' permission, authorId and authId (userId in currentUser) are required for comparison -->
                  <auth
                    :allow="action.permission"
                    :auth-id="$store.state.auth.data.id"
                    :author-id="scope.row[authKeyForItem]"
                  >
                    <b v-if="action.name === 'delete'" class="text-danger">{{
                      $t(action.label)
                    }}</b>
                    <span v-else>{{ $t(action.label) }}</span>
                  </auth>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </slot>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      class="my-5 text-center select-none"
      :total="total"
      :current-page="currentPage"
      :page-size="limit"
      @size-change="
        (total) => {
          $emit('my-table-on-action', {
            action: 'size-change',
            payload: {
              total,
            },
          })
        }
      "
      @current-change="
        (currentPage) => {
          $emit('my-table-on-action', {
            action: 'page-change',
            payload: {
              currentPage,
            },
          })
        }
      "
      @prev-click="
        (currentPage) => {
          $emit('my-table-on-action', {
            action: 'page-prev',
            payload: {
              currentPage,
            },
          })
        }
      "
      @next-click="
        (currentPage) => {
          $emit('my-table-on-action', {
            action: 'page-next',
            payload: {
              currentPage,
            },
          })
        }
      "
    />
    <div></div>
  </div>
</template>
<script>
export default {
  props: {
    height: {
      type: Number,
      default: 400,
    },
    multipleChoice: {
      type: Boolean,
      default: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    actions: {
      type: Array,
      default() {
        return [
          {
            name: 'view',
            label: 'table.data.view',
            permission: ['ALL'],
          },
          {
            name: 'edit',
            label: 'table.data.edit',
            permission: ['SELF'],
          },
          {
            name: 'delete',
            label: 'table.data.delete',
            permission: ['EDITOR'],
          },
        ]
      },
    },
    authKeyForItem: {
      type: Number || String,
      default: 'authorId',
    },
  },
  methods: {
    handleActionCommand(command) {
      const actionHandler = command.split(':')
      this.$emit('my-table-' + actionHandler[0], {
        rowID: actionHandler[1],
        rowData: this.data[actionHandler[1]],
      })
    },
  },
}
</script>
<style lang="scss">
.datatable {
  .el-table__header-wrapper {
    th {
      background-color: #e9ecf4;
      font-weight: bolder;
      font-size: 14px;
      line-height: 19px;
      color: var(--color-theme-1);
    }
  }
  .el-table__body-wrapper {
    td {
      color: var(--color-theme-1);
      font-size: 14px;
      line-height: 17px;
    }
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: var(--color-theme-1);
  }
  .datatable-limit-select {
    // width: 200px;
    height: 28px;
    background: #eff0f3;
    border-radius: 22.5px;
    input {
      height: 28px;
      background: none;
      border-radius: 22.5px;
      color: var(--color-theme-1);
      font-weight: bold;
      border: none;
    }
  }
}
</style>
