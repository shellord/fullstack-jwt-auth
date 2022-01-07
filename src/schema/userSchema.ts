import { z } from 'zod'

export const registerSchema = z.object({
  body: z.object({
    username: z
      .string({ required_error: 'Username is required' })
      .min(4)
      .max(20),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email'),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Invalid  password')
      .max(30, 'Invalid password'),
  }),
})

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Invalid password').max(30, 'Invalid password'),
  }),
})

export const tokenPayloadSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email({ message: 'Invalid email address' }),
})

export type TokenPayloadInput = z.infer<typeof tokenPayloadSchema>
export type RegisterInput = z.infer<typeof registerSchema>['body']
export type LoginInput = z.infer<typeof loginSchema>['body']
