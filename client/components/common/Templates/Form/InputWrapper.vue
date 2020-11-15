<template>
  <el-form-item :label="label" :prop="prop" :rules="processedRules">
    <slot />
    <template v-slot:error="error">
      <transition-group name="el-zoom-in-top">
        <span key="error-name" class="text-danger">{{
          $t(error.error.split(':')[0])
        }}</span>
        <span
          v-if="error.error.split(':')[1]"
          key="error-value"
          class="text-danger"
        >
          {{ ': ' + error.error.split(':')[1] }}
        </span>
      </transition-group>
    </template>
  </el-form-item>
</template>
<script>
import { availableRules } from '~/constants/config/base/validation'
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    /**
     * In order for the validator to work
     * Prop must be the same as its binded key in v-model
     *
     * Example:
     *
     *   <InputWrapper rules="required|number" prop="test"
     *
     *     <el-input v-model="form.test"
     */
    prop: {
      type: String,
      required: true,
    },
    /**
     * Inspired by vee-validate and Laravel validator
     * Pass a string to validate the input
     */
    rules: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      availableRules,
    }
  },
  computed: {
    /**
     * Split the rule string and map it into an rule array for elForm
     */
    processedRules() {
      return this.rules.split('|').map((rule) => {
        /**
         * If passing a param through the rule
         * The validator must be a function
         * Else, it's just a validate object
         */
        if (rule.includes(':')) {
          // Format: rules="something:value|other_rule|another_rule"
          const key = rule.split(':')[0] // Get the rule's name
          const value = rule.split(':')[1] // Get the rule's param
          // Check if rule exist
          if (Object.keys(this.availableRules).includes(key)) {
            return this.availableRules[key](value)
          } else {
            throw new Error(`Rule '${key}' is not exist in availableRules!`)
          }
          // Check if rule exist
        } else if (Object.keys(this.availableRules).includes(rule)) {
          return this.availableRules[rule]
        } else {
          throw new Error(`Rule '${rule}' is not exist in availableRules!`)
        }
      })
    },
  },
}
</script>
