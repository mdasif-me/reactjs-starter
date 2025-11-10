import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('The email address you entered is wrong!')
    .transform((val) => val.toLowerCase())
    .refine((val) => val.endsWith('@gmail.com'), {
      message: 'Email must end with @gmail.com',
    }),

  /**
   * password must contain at least:
   * - 8 characters
   * - one uppercase letter
   * - one lowercase letter
   * - one number
   * - one special character
   */
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .refine((val) => /[a-z]/.test(val), {
      message: 'Password must contain at least one lowercase letter',
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine((val) => /[0-9]/.test(val), {
      message: 'Password must contain at least one number',
    })
    .refine((val) => /[^a-zA-Z0-9]/.test(val), {
      message: 'Password must contain at least one special character',
    }),
  isKeepLogin: z.boolean().optional().default(false),
})
export const LoginFormDefaultValues: LoginFormInput = {
  email: '',
  password: '',
  isKeepLogin: false,
}
export type LoginFormData = z.infer<typeof loginSchema>
export type LoginFormInput = z.input<typeof loginSchema>
