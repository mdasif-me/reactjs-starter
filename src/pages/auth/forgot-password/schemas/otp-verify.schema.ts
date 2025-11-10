import z from 'zod'

export const otpVerifySchema = z.object({
  otp: z
    .string()
    .min(1, 'OTP is required')
    .regex(/^\d{5}$/, 'OTP must be a 5-digit number'),
})
// forgot password form default values
export const OTPVerifyDefaultValues: OTPVerifyInput = {
  otp: '',
}
// forgot password data type
export type OTPVerifyData = z.infer<typeof otpVerifySchema>
// forgot password input type
export type OTPVerifyInput = z.input<typeof otpVerifySchema>
