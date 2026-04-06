type SignupRequest = {
  username: string
  email: string
  password: string
}

type BackendError = {
  message?: string
}

type FetchErrorLike = {
  statusCode?: number
  statusMessage?: string
  data?: BackendError
}

export default defineEventHandler(async (event) => {
  const body = await readBody<SignupRequest>(event)
  const config = useRuntimeConfig(event)

  try {
    return await $fetch('/api/v1/auth/signup', {
      baseURL: config.crmApiBase,
      method: 'POST',
      body
    })
  } catch (error) {
    const fetchError = error as FetchErrorLike

    throw createError({
      statusCode: fetchError.statusCode || 400,
      statusMessage: fetchError.data?.message || fetchError.statusMessage || 'Signup failed'
    })
  }
})
