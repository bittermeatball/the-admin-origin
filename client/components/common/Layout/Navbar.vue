<template>
  <nav class="navbar bg-white flex justify-end px-6" style="height: 60px">
    <div class="flex items-center mx-6">
      <el-avatar
        size="medium"
        icon="el-icon-user-solid"
        class="bg-gray-300"
      ></el-avatar>
    </div>
    <div class="flex items-center">
      <el-badge :is-dot="hasNotifications">
        <fa :icon="['fas', 'bell']" class="text-success text-2xl" />
      </el-badge>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Navbar',
  computed: {
    ...mapState({
      locale: (state) => state.locale,
      hasNotifications: (state) => state.hasNotifications,
    }),
  },
}
</script>
<style lang="scss">
.navbar {
  .el-badge__content {
    border: none;
    display: flex;
    line-height: 1rem;
    height: 10px !important;
    width: 10px !important;
  }
}
</style>
<style lang="scss" scoped>
.navbar {
  height: 50px;
}
</style>
