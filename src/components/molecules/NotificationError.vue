<template>
  <b-notification
    :active="active"
    :closable="false"
    class="has-text-danger is-size-7"
  >
    <b-icon pack="fas" icon="exclamation-circle" size="is-small"> </b-icon>
    <slot />
  </b-notification>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'NotificationError',
  props: {
    active: {
      type: Boolean,
      required: true,
    },
  },
})
</script>
