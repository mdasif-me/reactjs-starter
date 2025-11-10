import z from 'zod'

export const forgotPasswordSchema = z
  .object({
    email: z
      .string()
      .email('The email address you entered is wrong!')
      .transform((val) => val.toLowerCase())
      .optional(),
    phone: z
      .string()
      .regex(/^01[3-9]\d{8}$/, 'Invalid Bangladeshi phone number')
      .optional()
      .or(z.literal('')),
  })
  .refine((data) => data.email || data.phone, {
    message: 'Please provide either email or phone number',
    path: ['email'], // or use ['phone'] or [] for form-level error
  })
// forgot password form default values
export const ForgotPasswordFormDefaultValues: ForgotPasswordFormInput = {
  email: '',
  phone: '',
}
// forgot password data type
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
// forgot password input type
export type ForgotPasswordFormInput = z.input<typeof forgotPasswordSchema>
