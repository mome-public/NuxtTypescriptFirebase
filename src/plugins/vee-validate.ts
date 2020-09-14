import Vue from 'vue'
import { ValidationProvider, extend, setInteractionMode } from 'vee-validate'
import {
  required,
  email,
  min,
  max,
  confirmed,
  mimes,
  size,
  required_if, // eslint-disable-line camelcase
  oneOf,
  max_value, // eslint-disable-line camelcase
  min_value, // eslint-disable-line camelcase
  regex,
} from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: '{_field_}を入力してください。',
})
extend('select_required', {
  ...required,
  message: '{_field_}を選択してください。',
})
extend('agreement_required', {
  ...required,
  message: '利用規約に同意の上、チェックを入れてください。',
})
extend('email', {
  ...email,
  message: '正しい形式のメールアドレスを入力してください。',
})
extend('min', {
  ...min,
  message: '{_field_}は{length}文字以上で入力してください。',
})
extend('max', {
  ...max,
  message: '{_field_}は{length}文字以内で入力してください。',
})
extend('confirmed', {
  ...confirmed,
  message: 'パスワードが一致しません。もう一度お確かめください。',
})
extend('mimes', {
  ...mimes,
  message: 'JPGまたはPNG形式の画像ファイルを選択してください。',
})
extend('size', {
  ...size,
  message: '{size}KB以内の画像ファイルを選択してください。',
})
extend('required_if', {
  ...required_if, // eslint-disable-line camelcase
  message: '{_field_}を入力してください。',
})
extend('oneOf', {
  ...oneOf,
  message: '有効な値が選択されていません。',
})
extend('max_value', {
  ...max_value, // eslint-disable-line camelcase
  message: '{_field_}は{max}以下で入力してください。',
})
extend('min_value', {
  ...min_value, // eslint-disable-line camelcase
  message: '{_field_}は{min}以上で入力してください。',
})
extend('url', {
  validate(value) {
    return regex.validate(value, {
      regex: /^(https?:\/\/[a-zA-Z0-9\-_.:@!~*'(¥);/?&=+$,%#]+)/,
    })
  },
  message: '正しい形式のURLを入力してください。',
})
extend('twitter_name', {
  validate(value) {
    return regex.validate(value, { regex: /^[0-9a-zA-Z_]+$/ })
  },
  message: '英数字、アンダースコア（_）のみで入力してください。',
})
extend('instagram_name', {
  validate(value) {
    return regex.validate(value, { regex: /^[0-9a-zA-Z_.]+$/ })
  },
  message: '英数字、アンダースコア（_）、ピリオド（.）のみで入力してください。',
})
extend('facebook_name', {
  validate(value) {
    return regex.validate(value, { regex: /^[0-9a-zA-Z.]+$/ })
  },
  message: '英数字、ピリオド（.）のみで入力してください。',
})
extend('note_id', {
  validate(value) {
    return regex.validate(value, { regex: /^[0-9a-z_]+$/ })
  },
  message: '小文字の英数字、アンダースコア（_）のみで入力してください。',
})

setInteractionMode('eager')

// Register it globally
Vue.component('ValidationProvider', ValidationProvider)
