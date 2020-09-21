import { InjectionKey } from '@vue/composition-api'
import { ProcessingStore } from './index'

const ProcessingKey: InjectionKey<ProcessingStore> = Symbol('AuthStore')
export default ProcessingKey
