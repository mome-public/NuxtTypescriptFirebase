import { InjectionKey } from '@vue/composition-api'
import { TransitionSourceStore } from './index'

const TransitionSourceKey: InjectionKey<TransitionSourceStore> = Symbol(
  'TransitionSourceStore'
)
export default TransitionSourceKey
