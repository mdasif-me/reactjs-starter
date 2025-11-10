import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormInput } from '@/components/ui/form'
import security from '@/assets/images/auth/security.svg'

import { Button } from '@/components/ui/button'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ForgotPasswordFormDefaultValues,
  forgotPasswordSchema,
  type ForgotPasswordFormInput,
} from './schemas/forgot.schema'
import { useState } from 'react'
import { toast } from 'sonner'

function ForgotPasswordForm({
  onSuccess,
  loading,
}: {
  onSuccess: (email: string) => void
  loading?: boolean
}) {
  const { control, watch, handleSubmit } = useForm<ForgotPasswordFormInput>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
    defaultValues: ForgotPasswordFormDefaultValues,
  })
  const [forgotBy, setForgotBy] = useState<'email' | 'phone'>('email')
  // handle change field
  const handleChange = (field: keyof ForgotPasswordFormInput) => {
    setForgotBy(field)
  }

  const onSubmit = (data: ForgotPasswordFormInput) => {
    if (!data.email && !data.phone) {
      toast.warning('Please provide either email or phone number')
      return
    }
    const identifier = forgotBy === 'email' ? data.email || '' : data.phone || ''
    onSuccess(identifier)
  }

  return (
    <div className={`w-full rounded-2xl`}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-2xl">
        <Card className="rounded-2xl border-0 bg-white shadow-none">
          <CardHeader className="space-y-4 pb-6">
            <div className="flex justify-center">
              <img src={security} alt="login icon" className="h-[84px] w-[84px]" />
            </div>
            <div className="space-y-2 text-center">
              <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
              <CardDescription className="text-muted-fg text-base">
                {`Enter your email address and we’ll send you password reset instructions.`}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className={`space-y-4 px-6`}>
            {forgotBy === 'phone' ? (
              <FormInput
                name="phone"
                type="tel"
                label="Phone Number"
                placeholder="Enter your phone number"
                control={control}
                required
              />
            ) : (
              <FormInput
                name="email"
                type="email"
                label="Email Address"
                placeholder="Enter your email address"
                control={control}
                required
              />
            )}{' '}
          </CardContent>
          <CardFooter className={`flex-col space-y-8 px-6 py-2`}>
            <Button
              isDisabled={loading || !watch(forgotBy === 'phone' ? 'phone' : 'email')}
              type="submit"
              className="h-[52px] w-full"
              size="lg"
            >
              {loading ? 'Sending...' : 'Forgot Password'}
            </Button>
            <article className="flex flex-col items-center gap-1 font-medium">
              <p className="text-muted-fg">{`Don’t have access anymore?`}</p>{' '}
              <button
                type="button"
                onClick={() => handleChange(forgotBy === 'phone' ? 'email' : 'phone')}
                className="text-primary hover:cursor-pointer hover:underline"
              >
                Try another method
              </button>
            </article>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default ForgotPasswordForm
