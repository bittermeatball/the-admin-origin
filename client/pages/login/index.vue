<template>
  <el-main class="container mx-auto">
    <h1 class="text-2xl my-3">
      {{ $t('login.title') }}
    </h1>
    <el-button
      class="mb-3"
      size="mini"
      type="primary"
      @click="$router.push('/')"
    >
      {{ $t('secret.to-home') }}
    </el-button>
    <div>
      <FormWrapper ref="loginForm" @onSubmit="postLogin">
        <InputWrapper rules="required|email">
          <!--  -->
          <el-input
            v-model="form.email"
            type="email"
            :placeholder="$t('login.email')"
          ></el-input>
        </InputWrapper>
        <InputWrapper rules="required">
          <el-input
            v-model="form.password"
            type="password"
            :placeholder="$t('login.password')"
          ></el-input>
        </InputWrapper>
        <el-button native-type="submit" type="success">
          {{ $t('login.button') }}
        </el-button>
      </FormWrapper>
    </div>
  </el-main>
</template>

<script>
import { authActions } from '~/constants/vuex/auth'
import { FormWrapper, InputWrapper } from '~/components/common/Templates/Form'
export default {
  layout: 'unauth',
  meta: {
    config: {
      authNotRequired: true,
    },
  },
  middleware: 'auth',
  components: {
    FormWrapper,
    InputWrapper,
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async postLogin() {
      await this.$store.dispatch(authActions.LOGIN, this.form)
      this.$router.push('/')
      this.$refs.loginForm.reset()
    },
  },
}
</script>
