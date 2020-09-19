<template>
  <nuxt-link :to="to" class="link">
    <slot />
  </nuxt-link>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true,
    },
  },
})
</script>

<style scoped>
.link {
  text-decoration: underline;
}
</style>
