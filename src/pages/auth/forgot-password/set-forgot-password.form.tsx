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
  SetPasswordFormDefaultValues,
  setPasswordSchema,
  type SetPasswordFormInput,
} from './schemas/set-password.schema'

function SetForgotPasswordForm({
  onSuccess,
  loading,
}: {
  onSuccess: (newPassword: string) => void
  loading?: boolean
}) {
  const { control, watch, handleSubmit } = useForm<SetPasswordFormInput>({
    resolver: zodResolver(setPasswordSchema),
    mode: 'onChange',
    defaultValues: SetPasswordFormDefaultValues,
  })

  const onSubmit = (data: SetPasswordFormInput) => {
    onSuccess(data.password)
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
              <CardTitle className="text-2xl font-bold">Create New Password</CardTitle>
              <CardDescription className="text-muted-fg text-base">
                {`Please enter a new password. Your new password must be different from previous password.`}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className={`space-y-4 px-6`}>
            <FormInput
              name="password"
              type="password"
              label="New Password"
              placeholder="Enter your new password"
              control={control}
              required
            />
            <FormInput
              name="confirmPassword"
              type="password"
              label="Confirm New Password"
              placeholder="Re-enter your new password"
              control={control}
              required
            />
          </CardContent>
          <CardFooter className={`flex-col space-y-8 px-6 py-2`}>
            <Button
              isDisabled={loading || !watch('password') || !watch('confirmPassword')}
              type="submit"
              className="h-[52px] w-full"
              size="lg"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default SetForgotPasswordForm
