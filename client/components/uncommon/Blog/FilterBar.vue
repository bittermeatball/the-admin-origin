<template>
  <div>
    <FormWrapper :model="form">
      <InputWrapper
        rules="required|excluded:HEH;ABC"
        prop="test"
        class="el-default-input"
      >
        <el-input
          v-model="form.test"
          placeholder="yes"
          type="test"
          autocomplete="off"
        ></el-input>
      </InputWrapper>
    </FormWrapper>
  </div>
</template>
<script>
import { FormWrapper, InputWrapper } from '~/components/common/Templates/Form'
export default {
  components: {
    FormWrapper,
    InputWrapper,
  },
  data() {
    return {
      form: {
        test: '',
      },
    }
  },
}
</script>
