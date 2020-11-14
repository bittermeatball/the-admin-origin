<template>
  <el-container class="default-layout-container h-screen relative">
    <!-- Left side -->
    <Sidebar />
    <!-- Right side -->
    <el-container
      class="flex-col default-page-background h-screen overflow-y-scroll"
    >
      <Navbar />
      <div class="h-full bg-gray-100" style="border-radius: 30px 10px 0 0">
        <!-- el-main -->
        <nuxt class="relative" />
      </div>
    </el-container>
    <!-- Login modal -->
    <Login />
  </el-container>
</template>

<script>
import { Login } from '~/components/common/Auth'
import { Navbar, Sidebar } from '~/components/common/Layout'
export default {
  name: 'Default',
  components: {
    Login,
    Navbar,
    Sidebar,
  },
  methods: {
    triggerLoginForm() {
      this.$root.$emit('my-dialog-show', 'login-form')
    },
  },
}
</script>
