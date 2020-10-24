<template>
  <el-main>
    <el-button size="mini" type="warning" @click="$router.push('/secret')">
      {{ $t('home.to-secret') }}
    </el-button>
    <transition name="slide-fade" mode="out-in">
      <el-button
        v-if="!$store.state.auth.data"
        :key="'login-button'"
        size="mini"
        type="success"
        @click="$root.$emit('my-dialog-show', 'login-form')"
      >
        {{ $t('home.login') }}
      </el-button>
      <el-button
        v-else
        :key="'logout-button'"
        size="mini"
        type="danger"
        @click="logout"
      >
        {{ $t('home.logout') }}
      </el-button>
    </transition>
    <ExampleComponent />
    <transition name="slide-fade" mode="out-in">
      <el-button
        v-if="locale === 'en'"
        :key="'locale-button-vi'"
        size="mini"
        type="danger"
        class="text-yellow"
        @click="$changeLocale('vi')"
      >
        Đổi sang vi
      </el-button>
      <el-button
        v-else
        :key="'locale-button-en'"
        size="mini"
        type="primary"
        @click="$changeLocale('en')"
      >
        Change to en
      </el-button>
    </transition>
  </el-main>
</template>
<script>
import { mapState } from 'vuex'
import { authActions } from '~/constants/vuex/auth'
import { ExampleComponent } from '~/components/uncommon/Home'
export default {
  name: 'Home',
  meta: {
    config: {
      auth: false,
      permission: ['ALL'],
    },
  },
  middleware: ['auth'],
  components: {
    ExampleComponent,
  },
  computed: mapState({
    locale: (state) => state.locale,
  }),
  methods: {
    async logout() {
      await this.$store.dispatch(authActions.LOGOUT)
      this.$router.push('/')
    },
  },
  head() {
    return {
      title: this.$t('home.title'),
    }
  },
}
</script>
