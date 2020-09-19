<template>
  <div v-auto-link class="content text-formatted">
    <p>{{ text }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    text: {
      type: String,
      default: '',
    },
  },
})
</script>

<style scoped>
.text-formatted {
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
