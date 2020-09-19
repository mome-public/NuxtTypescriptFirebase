<template>
  <h1 class="title is-4 has-text-centered has-text-info title-page">
    <slot />
  </h1>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({})
</script>

<style lang="scss" scoped>
.title-page {
  margin-top: 3rem;
  margin-bottom: 0 !important;
}
</style>
