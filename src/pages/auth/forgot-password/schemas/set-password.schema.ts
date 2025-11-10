import { z } from 'zod'

export const setPasswordSchema = z
  .object({
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

    confirmPassword: z.string().min(1, 'Confirm Password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type SetPasswordFormData = z.infer<typeof setPasswordSchema>
export type SetPasswordFormInput = z.input<typeof setPasswordSchema>

export const SetPasswordFormDefaultValues: SetPasswordFormInput = {
  password: '',
  confirmPassword: '',
}
