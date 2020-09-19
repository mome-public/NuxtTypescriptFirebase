<template>
  <section class="section">
    <div class="columns is-mobile">
      <card title="Free" icon="github">
        Open source on <a href="https://github.com/buefy/buefy"> GitHub </a>
      </card>

      <card title="Responsive" icon="cellphone-link">
        <b class="has-text-grey"> Every </b> component is responsive
      </card>

      <card title="Modern" icon="alert-decagram">
        Built with <a href="https://vuejs.org/"> Vue.js </a> and
        <a href="http://bulma.io/"> Bulma </a>
      </card>

      <card title="Lightweight" icon="arrange-bring-to-front">
        No other internal dependency
      </card>

      <base-button
        class="pagination-button"
        irregular
        icon-right="chevron-down"
        @click="increment"
      >
        Count is: {{ state.count }}, double is: {{ state.double }}
      </base-button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from '@nuxtjs/composition-api'
import Card from '~/components/Card.vue'
import BaseButton from '~/components/atoms/BaseButton.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    Card,
    BaseButton,
  },
  setup() {
    const state: {
      count: number
      double: number
    } = reactive({
      count: 0,
      double: computed(() => state.count * 2),
    })

    const increment = () => {
      state.count++
    }

    return {
      state,
      increment,
    }
  },
})
</script>
