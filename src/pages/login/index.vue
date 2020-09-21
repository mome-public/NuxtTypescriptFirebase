<template>
  <main>
    <h-title-page>ログイン</h-title-page>
    <the-login-area />
  </main>
</template>

<script lang="ts">
import {
  defineComponent,
  useAsync,
  onMounted,
  inject,
  useContext,
} from '@nuxtjs/composition-api'
import HTitlePage from '~/components/atoms/HTitlePage.vue'
import TheLoginArea from '~/components/organisms/TheLoginArea.vue'
import AuthKey from '~/store/auth/key'
import { AuthStore } from '~/store/auth'

export default defineComponent({
  name: 'LoginIndexPage',
  components: {
    HTitlePage,
    TheLoginArea,
  },
  head() {
    return {
      title: 'ログイン',
      meta: [{ hid: 'og:title', property: 'og:title', content: 'ログイン' }],
    }
  },
  setup() {
    const { isAuthenticated } = inject(AuthKey) as AuthStore

    const { redirect } = useContext()
    const asyncData = useAsync(() => {
      if (isAuthenticated()) {
        redirect('/')
      }
    })

    const mountedFunc = onMounted(() => {
      window.scrollTo(0, 0)
    })
    return {
      asyncData,
      mountedFunc,
    }
  },
})
</script>
