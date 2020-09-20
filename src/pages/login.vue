<template>
  <div>test</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, inject } from '@nuxtjs/composition-api'
import BaseMounted from '~/composables/BaseMounted'
import AuthKey from '~/store/auth/key'
import { AuthStore } from '~/store/auth'

export default defineComponent({
  setup() {
    const { saveUID } = inject(AuthKey) as AuthStore
    const mountedFunc = onMounted(() => {
      BaseMounted(saveUID)
    })
    return {
      mountedFunc,
    }
  },
})
</script>
