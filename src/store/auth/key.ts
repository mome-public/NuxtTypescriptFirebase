import { InjectionKey } from '@vue/composition-api'
import { AuthStore } from './index'

const AuthKey: InjectionKey<AuthStore> = Symbol('AuthStore')
export default AuthKey
