import { reactive } from '@nuxtjs/composition-api'

export default function useProcessing() {
  // state
  const authState = reactive<{
    processing: boolean
  }>({
    processing: false,
  })

  // logics
  const startProcessing = () => {
    authState.processing = true
  }
  const endProcessing = () => {
    authState.processing = false
  }
  const isProcessing = () => {
    return authState.processing
  }

  return {
    authState,
    startProcessing,
    endProcessing,
    isProcessing,
  }
}

export type ProcessingStore = ReturnType<typeof useProcessing>
