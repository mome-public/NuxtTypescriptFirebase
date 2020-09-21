import { reactive } from '@nuxtjs/composition-api'

export default function useTransitionStore() {
  // state
  const sourceState = reactive<{
    source: string
  }>({
    source: '',
  })

  // logics
  const saveSource = (source: string) => {
    sourceState.source = source
  }
  const clearSource = () => {
    sourceState.source = ''
  }

  return {
    sourceState,
    saveSource,
    clearSource,
  }
}

export type TransitionSourceStore = ReturnType<typeof useTransitionStore>
