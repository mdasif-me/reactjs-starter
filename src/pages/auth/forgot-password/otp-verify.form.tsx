import { useForm, Controller } from 'react-hook-form'
import { useState, useEffect, useRef } from 'react'
import {
  OTPVerifyDefaultValues,
  otpVerifySchema,
  type OTPVerifyInput,
} from './schemas/otp-verify.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import mail from '@/assets/images/auth/mail.svg'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'

const OTPVerify = ({
  field,
  onSuccess,
  loading,
}: {
  field: string
  onSuccess: (otp: string) => void
  loading?: boolean
}) => {
  const { control, watch, handleSubmit, formState } = useForm<OTPVerifyInput>({
    resolver: zodResolver(otpVerifySchema),
    mode: 'onChange',
    defaultValues: OTPVerifyDefaultValues,
  })

  // Timer state - starts at 60 seconds (1 minute)
  const [remainingSeconds, setRemainingSeconds] = useState(60)
  const [isResendDisabled, setIsResendDisabled] = useState(true)
  const intervalRef = useRef<number | null>(null)

  // Format seconds as MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Start or restart the timer
  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setIsResendDisabled(true)
    setRemainingSeconds(60)
    intervalRef.current = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setIsResendDisabled(false)
          if (intervalRef.current) clearInterval(intervalRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  // On mount, start timer
  useEffect(() => {
    startTimer()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const handleResendOTP = () => {
    // TODO: Implement API call to resend OTP
    // Reset timer
    startTimer()
  }

  const onSubmit = (data: OTPVerifyInput) => {
    onSuccess(data.otp)
  }

  return (
    <div className={`w-full rounded-2xl`}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-2xl">
        <Card className="rounded-2xl border-0 bg-white shadow-none">
          <CardHeader className="space-y-4 pb-2">
            <div className="flex justify-center">
              <img src={mail} alt="login icon" className="h-[84px] w-[84px]" />
            </div>
            <div className="space-y-2 text-center">
              <CardTitle className="text-2xl font-bold">OTP Verification</CardTitle>
              <CardDescription className="text-muted-fg text-base">
                <article className="flex flex-col">
                  <p>{`We have sent a verification code`}</p>
                  <p className="text-fg font-medium"> {field}</p>
                </article>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className={`space-y-4 px-6`}>
            <div className="space-y-2">
              <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col items-center gap-2">
                    <InputOTP
                      maxLength={5}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                      </InputOTPGroup>
                    </InputOTP>
                    {formState.errors.otp && (
                      <p className="text-danger mt-1 text-sm">{formState.errors.otp.message}</p>
                    )}
                  </div>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className={`flex-col space-y-8 px-6 py-2`}>
            <Button
              isDisabled={loading || !watch('otp')}
              type="submit"
              className="h-[52px] w-full"
              size="lg"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </Button>
            <article className="flex flex-col items-center gap-1 font-medium">
              {isResendDisabled ? (
                <p className="text-muted-fg">
                  {`Resend code in`}{' '}
                  <span className="text-primary">{formatTime(remainingSeconds)}</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-primary hover:cursor-pointer hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </article>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default OTPVerify
