import { useState } from 'react'
import ForgotPasswordForm from './forgot-password.form'
import OTPVerify from './otp-verify.form'
import SetForgotPasswordForm from './set-forgot-password.form'
import { toast } from 'sonner'
// If you use a router, import it here (e.g., useNavigate from react-router-dom)
// import { useNavigate } from 'react-router-dom'

type ForgotPasswordStep = 'email' | 'otp' | 'reset'

export const ForgotPassword = () => {
  const [step, setStep] = useState<ForgotPasswordStep>('email')
  const [field, setField] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // const navigate = useNavigate(); // Uncomment if using react-router

  // Async: Send OTP to email
  const handleEmailSubmit = async (submittedEmail: string) => {
    setLoading(true)
    setError(null)
    try {
      // TODO: Replace with your real API call
      // await api.sendOtp({ email: submittedEmail })
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success('OTP sent successfully!')
      setField(submittedEmail)
      setStep('otp')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Async: Verify OTP
  const handleOTPVerify = async (otp: string) => {
    setLoading(true)
    setError(null)
    try {
      // TODO: Replace with your real API call
      // await api.verifyOtp({ email: field, otp })
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStep('reset')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Async: Reset password
  const handlePasswordReset = async (newPassword: string) => {
    setLoading(true)
    setError(null)
    try {
      // TODO: Replace with your real API call
      // await api.resetPassword({ email: field, password: newPassword })
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network
      // Show success toast or navigate
      // navigate('/auth/login')
      toast.success('Password reset successful!')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to reset password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="mx-auto h-auto max-w-md">
        {error && <div className="text-danger mb-4 text-center">{error}</div>}
        {step === 'email' && <ForgotPasswordForm onSuccess={handleEmailSubmit} loading={loading} />}
        {step === 'otp' && (
          <OTPVerify field={field} onSuccess={handleOTPVerify} loading={loading} />
        )}
        {step === 'reset' && (
          <SetForgotPasswordForm onSuccess={handlePasswordReset} loading={loading} />
        )}
      </div>
    </div>
  )
}
