<template>
  <div class="p-0 w-full">
    <Navbar @signInDialogTrigger="dialogVisible = true" />
    <nuxt keep-alive />
  </div>
</template>

<script>
import { Navbar } from '~/components/common/Layout'
export default {
  name: 'Default',
  components: {
    Navbar,
  },
}
</script>
