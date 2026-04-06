<script setup lang="ts">
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import { signinSchema, type SigninForm } from '~/utils/auth.schemas'

type SigninResponse = {
  username: string
  accessToken: string
  refreshToken: string
}

const { loading, submit } = useAuthRequest()

const fields: AuthFormField[] = [{
    name: 'username',
    type: 'text',
    label: 'Username',
    placeholder: 'Enter your username',
    required: true
}, {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true
}, {
    name: 'remember',
    label: 'Remember me',
    type: 'checkbox'
}]

async function onSubmit({ data }: FormSubmitEvent<SigninForm>) {
  await submit(
    () => $fetch<SigninResponse>('/api/auth/signin', {
      method: 'POST',
      body: data
    }),
    {
      successTitle: 'Signin successful',
      getSuccessDescription: () => `User ${data.username} successfully signed in.`,
      errorTitle: 'Signin failed',
      fallbackError: 'Signin failed'
    }
  )
}
</script>

<template>
  <AuthPageCard>
    <UAuthForm
      :schema="signinSchema"
      :fields="fields"
      :loading="loading"
      title="Welcome back!"
      icon="i-lucide-lock"
      @submit="onSubmit"
    >
      <template #description>
        Don't have an account? <ULink to="http://localhost:3000/signup" class="text-primary font-medium">Sign up</ULink>.
      </template>
      <template #password-hint>
        <ULink to="http://localhost:3000/forgot" class="text-primary font-medium" tabindex="-1">Forgot password?</ULink>
      </template>
    </UAuthForm>
  </AuthPageCard>
</template>
