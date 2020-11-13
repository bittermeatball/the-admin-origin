<template>
  <div
    class="relative duration-300"
    :style="{
      width: sidebarCollapsed ? '65px' : '240px',
    }"
  >
    <span
      class="block absolute default-sidebar-toggle z-20 duration-300"
      style="top: 30px; right: -30px; transform: translate(50%, -50%)"
      @click="TOGGLE_SIDEBAR_COLLAPSE()"
    >
      <fa
        :icon="['fas', 'bars']"
        class="text-gray-200 text-3xl cursor-pointer"
      />
    </span>
    <el-aside class="duration-300 relative h-full w-full">
      <!--  -->
    </el-aside>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { rootMutations } from '~/store/mutations'
export default {
  name: 'Sidebar',
  computed: {
    ...mapState({
      sidebarCollapsed: (state) => state.options.sidebarCollapsed,
    }),
  },
  methods: {
    ...mapMutations({
      // SET_LANG: rootMutations.SET.LANG,
      TOGGLE_SIDEBAR_COLLAPSE: rootMutations.TOGGLE.SIDEBAR_COLLAPSE,
    }),
  },
}
</script>
