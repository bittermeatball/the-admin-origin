<template>
  <span v-if="isAllowed">
    <slot v-for="role in allow" :name="role" />
    <slot />
  </span>
</template>
<script>
import { roles } from '~/constants/config/base/auth'
export default {
  props: {
    allow: {
      type: Array,
      default() {
        return ['ALL']
      },
    },
    // eslint-disable-next-line vue/require-default-prop
    authorId: {
      type: Number || String,
      required: false,
    },
    // eslint-disable-next-line vue/require-default-prop
    authId: {
      type: Number || String,
      required: false,
    },
  },
  computed: {
    isAllowed() {
      // If using 'SELF' permission, authorId and authId (userId in currentUser) are required for comparison
      if (this.allow.includes('SELF') && !this.authorId && !this.authId) {
        throw new Error(
          "Please pass props authorId and authId once you use 'SELF' permission"
        )
      }
      return (
        this.allow.includes(this.$store.state.auth.data?.role) ||
        this.allow.includes('ALL') ||
        this.authorId === this.authId
      )
    },
  },
  created() {
    if (process.env.NODE_ENV === 'development') {
      // Check if role is valid
      this.allow.forEach((role) => {
        if (!roles.includes(role)) {
          throw new Error(
            `"${role}" is not in the roles collection in ~/constants/config/base/roles, must be included in ${JSON.stringify(
              roles
            )}`
          )
        }
      })
    }
  },
}
</script>
