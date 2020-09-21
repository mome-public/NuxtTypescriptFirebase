<template>
  <section class="section ntf-area-container ntf-single">
    <login-form></login-form>
    <div class="ntf-block-container has-text-centered">
      <p>
        <base-link to="/login/password-reminder">
          パスワードを忘れた方
        </base-link>
      </p>
    </div>
    <div class="ntf-block-container has-text-centered">
      <p>アカウントをお持ちでない場合</p>
      <p>
        <base-link to="/signup"> 新規登録 </base-link>
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BaseLink from '~/components/atoms/BaseLink.vue'
import LoginForm from '~/components/organisms/LoginForm.vue'

export default defineComponent({
  name: 'TheLoginArea',
  components: {
    BaseLink,
    LoginForm,
  },
})
</script>
