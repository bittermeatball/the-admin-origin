<template>
  <el-main>
    <h1 class="text-purple">
      {{ $t('secret.text') }}
    </h1>
    <auth :allow="['ADMIN']">
      <h2>This text's only shown to ADMIN</h2>
    </auth>
    <el-button v-auth:allow.active="['EDITOR']">
      <!--  -->
      Disabled via directive
    </el-button>
    <el-button size="mini" type="primary" @click="$router.push('/')">
      {{ $t('secret.to-home') }}
    </el-button>
    <el-button size="mini" type="danger" @click="logout">
      {{ $t('secret.logout') }}
    </el-button>
  </el-main>
</template>
<script>
import { config } from './config'
import { authActions } from '~/store/auth/actions'
export default {
  meta: {
    config,
  },
  middleware: ['auth'],
  methods: {
    async logout() {
      await this.$store.dispatch(authActions.LOGOUT)
      this.$router.push('/')
    },
  },
}
</script>
