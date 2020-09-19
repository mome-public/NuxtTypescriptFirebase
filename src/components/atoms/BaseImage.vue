<template>
  <img :src="src" class="image" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    src: {
      type: String,
      required: true,
    },
  },
})
</script>

<style scoped>
.image {
  overflow: hidden;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
