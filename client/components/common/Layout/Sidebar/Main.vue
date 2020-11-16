<template>
  <div
    class="relative duration-300"
    :style="{
      width: sidebarCollapsed ? `${minWidth}px` : `${maxWidth}px`,
    }"
  >
    <el-aside
      class="duration-300 relative h-full w-full flex flex-col"
      :class="{ 'pl-2': sidebarCollapsed }"
    >
      <ul class="overflow-x-hidden overflow-y-scroll flex flex-col">
        <li class="text-center mb-5">
          <!--  -->
          <el-image
            class="mt-3"
            src="https://avatars3.githubusercontent.com/u/60340907?s=200&v=4"
            style="height: 50px"
            fit="contain"
          ></el-image>
        </li>
        <li
          v-for="group in sidebar.groups"
          :key="group.name"
          class="block duration-300 w-full"
          :class="[sidebarCollapsed ? 'p-1' : 'px-5 py-2']"
        >
          <span
            v-if="group.name"
            class="text-2xl mb-3 block duration-300 whitespace-no-wrap text-gray-600"
            :style="{
              opacity: sidebarCollapsed ? '0' : '1',
            }"
          >
            {{ $t('sidebar.' + group.name) }}
          </span>
          <ul
            class="duration-300"
            :class="[sidebarCollapsed ? 'm-1' : 'ml-3 my-1']"
          >
            <el-tooltip
              v-for="component in group.components"
              :key="'sidebar-' + component.module"
              effect="dark"
              :content="$t('sidebar.' + component.module)"
              placement="right"
              :disabled="!sidebarCollapsed"
            >
              <li
                class="mb-5 flex cursor-pointer bg-gray-100 text-gray-600 duration-300 hover:bg-success-200 hover:text-success"
                :class="{
                  'bg-success-200 text-success': $route.name.includes(
                    component.route.name
                  ),
                  'p-3': !sidebarCollapsed,
                  'py-3 px-2': sidebarCollapsed,
                }"
                style="border-radius: 15px"
                @click="$router.push(component.route)"
              >
                <span class="mx-1">
                  <fa :icon="component.icon" />
                </span>
                <span
                  class="whitespace-no-wrap ml-1"
                  :style="{
                    opacity: sidebarCollapsed ? '0' : '1',
                  }"
                >
                  {{ $t('sidebar.' + component.module) }}
                </span>
              </li>
            </el-tooltip>
          </ul>
        </li>
      </ul>
    </el-aside>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { sidebar } from '~/constants/config/base/sidebar'
export default {
  name: 'Sidebar',
  props: {
    minWidth: {
      type: Number,
      default: 70,
    },
    maxWidth: {
      type: Number,
      default: 240,
    },
  },
  data() {
    return {
      sidebar,
    }
  },
  computed: {
    ...mapState({
      sidebarCollapsed: (state) => state.options.sidebarCollapsed,
    }),
  },
}
</script>
