import * as z from 'zod'

export const signinSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(8, 'Must be at least 8 characters'),
  remember: z.boolean().optional()
})

export const signupSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

export const forgotSchema = z.object({
  email: z.email('Invalid email format')
})

export type SigninForm = z.output<typeof signinSchema>
export type SignupForm = z.output<typeof signupSchema>
export type ForgotForm = z.output<typeof forgotSchema>
