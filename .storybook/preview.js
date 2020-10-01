import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import Vue from 'vue'

Vue.use(Buefy)

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
