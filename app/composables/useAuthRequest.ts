type AuthFeedback<TResponse> = {
  successTitle: string
  getSuccessDescription: (result: TResponse) => string
  errorTitle: string
  fallbackError: string
}

export function useAuthRequest() {
  const toast = useToast()
  const loading = ref(false)

  async function submit<TResponse>(
    request: () => Promise<TResponse>,
    feedback: AuthFeedback<TResponse>
  ) {
    loading.value = true

    try {
      const result = await request()

      toast.add({
        title: feedback.successTitle,
        description: feedback.getSuccessDescription(),
        color: 'success'
      })

      return result
    } catch (error) {
      toast.add({
        title: feedback.errorTitle,
        description: error instanceof Error ? error.message : feedback.fallbackError,
        color: 'error'
      })
    } finally {
      loading.value = false
    }
  }

  return {
    loading: readonly(loading),
    submit
  }
}
