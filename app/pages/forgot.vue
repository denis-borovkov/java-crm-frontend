<script setup lang="ts">
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import { forgotSchema, type ForgotForm } from '~/utils/auth.schemas'

type ForgotRequest = {
  email: string
}

const { loading, submit } = useAuthRequest()

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    required: true
  }
]

async function onSubmit({ data }: FormSubmitEvent<ForgotForm>) {
  await submit(
    () => $fetch<ForgotRequest>('/api/auth/forgot', {
      method: 'POST',
      body: data
    }),
    {
      successTitle: 'Success',
      getSuccessDescription: () => `User with email ${data.email} successfully reset password.`,
      errorTitle: 'Reset failed',
      fallbackError: 'Password reset request failed'
    }
  )
}
</script>

<template>
  <AuthPageCard>
    <UAuthForm
      :schema="forgotSchema"
      title="Password recovery"
      class="text-primary font-medium"
      :fields="fields"
      :loading="loading"
      @submit="onSubmit"
    />
  </AuthPageCard>
</template>
