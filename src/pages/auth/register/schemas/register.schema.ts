import { z } from 'zod'

export const registerSchema = z.object({
  full_name: z
    .string()
    .min(1, 'Full name is required')
    .min(3, 'Full name must be at least 3 characters')
    .max(50, 'Full name must be at most 50 characters'),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('The email address you entered is wrong!')
    .transform((val) => val.toLowerCase()),
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
})

export const RegisterFormDefaultValues: RegisterFormInput = {
  full_name: '',
  email: '',
  password: '',
}

export type RegisterFormData = z.infer<typeof registerSchema>
export type RegisterFormInput = z.input<typeof registerSchema>
