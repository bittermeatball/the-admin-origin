<template>
  <DialogWrapper id="login-form" title="Sign in to access the secret page">
    <FormWrapper ref="loginForm" @onSubmit="postLogin">
      <InputWrapper rules="required|email">
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
      <el-button native-type="submit">
        {{ $t('login.button') }}
      </el-button>
    </FormWrapper>
  </DialogWrapper>
</template>
<script>
import { authActions } from '~/store/auth/actions'
export default {
  components: {
    // Just an example for dynamically import
    DialogWrapper: () =>
      import('~/components/common/Templates/Dialog/DialogWrapper.vue'),
    FormWrapper: () =>
      import('~/components/common/Templates/Form/FormWrapper.vue'),
    InputWrapper: () =>
      import('~/components/common/Templates/Form/InputWrapper.vue'),
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
      this.$root.$emit('my-dialog-hide', 'login-form')
    },
  },
}
</script>
