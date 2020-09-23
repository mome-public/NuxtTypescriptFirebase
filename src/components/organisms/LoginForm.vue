<template>
  <div class="container ntf-block-container">
    <notification-error :active="isErrorMessageActive">
      {{ errorMessage }}
    </notification-error>
    <Form
      v-slot="{ errors }"
      :validation-schema="schema"
      @submit.prevent="doLogin"
    >
      <Field v-slot="{ field }" name="email">
        <b-field
          :type="{ 'is-danger': !!errors.email }"
          :message="errors.email"
        >
          <template slot="label"> メールアドレス </template>
          <b-input
            v-bind="field"
            type="email"
            :has-counter="false"
            placeholder="example@mome.fan"
            maxlength="256"
            icon="envelope"
            :disabled="processing"
          />
        </b-field>
      </Field>
      <Field v-slot="{ field }" name="password">
        <b-field
          :type="{ 'is-danger': !!errors.password }"
          :message="errors.password"
        >
          <template slot="label"> パスワード </template>
          <b-input
            ref="password"
            v-bind="field"
            type="password"
            placeholder="パスワード"
            icon="key"
            password-reveal
            :disabled="processing"
          />
        </b-field>
      </Field>
      <b-field class="ntf-button-field">
        <base-button
          native-type="submit"
          size="is-medium"
          :disabled="processing"
        >
          ログイン
        </base-button>
      </b-field>
    </Form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  useContext,
  ref,
  onMounted,
} from '@nuxtjs/composition-api'
import { Field, Form } from 'vee-validate'
import * as yup from 'yup'
import firebase from '~/plugins/firebase'
import BaseButton from '~/components/atoms/BaseButton.vue'
import RequireLabel from '~/components/atoms/RequireLabel.vue'
import NotificationError from '~/components/molecules/NotificationError.vue'
import ErrorLog from '~/composables/ErrorLog'
import AuthKey from '~/store/auth/key'
import { AuthStore } from '~/store/auth'
import TransitionSourceKey from '~/store/transitionSource/key'
import { TransitionSourceStore } from '~/store/transitionSource'
import { USER_STATUSES } from '~/services/nuxt-typescript-firebase/invariables'
import { User } from '~/services/nuxt-typescript-firebase/models/user'
import {
  LoginLog,
  blankLoginLog,
} from '~/services/nuxt-typescript-firebase/models/login_log'

const db = firebase.firestore()
const className = 'LoginForm'

export default defineComponent({
  name: 'LoginForm',
  components: {
    Field,
    Form,
    BaseButton,
    RequireLabel,
    NotificationError,
  },
  setup() {
    // State
    const email = ref<string>('')
    const password = ref<string>('')
    const isErrorMessageActive = ref<boolean>(false)
    const errorMessage = ref<string>('')
    const processing = ref<boolean>(false)

    const schema = yup.object().shape({
      email: yup.string().required().email(),
      name: yup.string().required(),
      password: yup.string().required().min(8),
    })

    // Stores
    const { login } = inject(AuthKey) as AuthStore
    const { sourceState, clearSource } = inject(
      TransitionSourceKey
    ) as TransitionSourceStore

    // Context
    const { redirect, error } = useContext()
    const observer = ref<InstanceType<typeof Form>>()

    // Logics
    const mounted = onMounted(() => {
      console.log(observer)
    })

    const doLogin = async () => {
      const funcName = 'doLogin'

      processing.value = true
      const isValid = await observer.value!.validate()
      if (isValid) {
        const authUser = await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value)
          .catch((error) => {
            if (error.code !== undefined) {
              switch (error.code) {
                case 'auth/wrong-password':
                case 'auth/user-not-found':
                case 'auth/user-disabled':
                case 'auth/invalid-email':
                case 'auth/network-request-failed':
                  errorMessage.value = 'ログインに失敗しました。'
                  break
                default:
                  errorMessage.value = ''
              }

              if (errorMessage.value) {
                isErrorMessageActive.value = true
                processing.value = false
                return true
              }
            }

            let message = 'Unknown error has occurred. : '
            message += error.code ? ` ${error.code} ` : ''
            message += error.message ? `${error.message}` : ''
            error({
              statusCode: 503,
              message: ErrorLog(className, funcName, 1, message),
            })
            return true
          })

        if (typeof authUser === 'boolean') {
          return // end
        }

        if (!authUser || authUser.user === null) {
          // 503
          const message = 'Firebase Error: Not found user in authUserData.'
          error({
            statusCode: 503,
            message: ErrorLog(className, funcName, 2, message),
          })
          return
        }

        const uid = authUser.user.uid

        login(uid).catch((error: any) => {
          let message = 'Unknown error has occurred. : '
          message += error.code ? ` ${error.code} ` : ''
          message += error.message ? `${error.message}` : ''
          error({
            statusCode: 503,
            message: ErrorLog(className, funcName, 3, message),
          })
        })

        const doc = await db
          .collection('users')
          .doc(uid)
          .get()
          .catch((error) => {
            let message = 'Unknown error has occurred. : '
            message += error.code ? ` ${error.code} ` : ''
            message += error.message ? `${error.message}` : ''
            error({
              statusCode: 503,
              message: ErrorLog(className, funcName, 4, message),
            })
            return true
          })

        if (typeof doc === 'boolean') {
          return // end
        }

        if (!doc) {
          // 503
          const message = 'Firebase Error: Not found user in Users Collection.'
          error({
            statusCode: 503,
            message: ErrorLog(className, funcName, 5, message),
          })
          return
        }

        const user = doc.data() as User
        if (user.status === USER_STATUSES.PRE_SIGNUP) {
          redirect('/signup/profile')
        } else {
          const source = sourceState.source
          clearSource()
          redirect(source || '/')
        }

        const loginLog: LoginLog = { ...blankLoginLog }
        loginLog.userId = uid
        loginLog.userAgent = window.navigator.userAgent

        const currentTime = firebase.firestore.FieldValue.serverTimestamp()
        db.collection('login_logs')
          .add({
            ...loginLog,
            createdAt: currentTime,
            updatedAt: currentTime,
          })
          .catch((error) => {
            let message = 'Login logs error. : '
            message += error.code ? ` ${error.code} ` : ''
            message += error.message ? `${error.message}` : ''
            console.log(message)
          })
      } else {
        processing.value = false
      }
    }

    return {
      email,
      password,
      isErrorMessageActive,
      errorMessage,
      processing,
      schema,
      mounted,
      doLogin,
    }
  },
})
</script>
