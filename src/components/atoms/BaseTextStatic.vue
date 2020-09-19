<template>
  <div>
    <transition name="fade">
      <p :class="['text-static', 'is-inline-block', { empty: isLoading }]">
        <slot />
      </p>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss" scoped>
.text-static {
  opacity: 1;
  transition: opacity 0.1s ease;
  white-space: normal;
  word-break: break-word;
  &.empty {
    opacity: 0;
  }
}
</style>
