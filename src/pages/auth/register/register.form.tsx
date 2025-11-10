import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormInput } from '../../../components/ui/form'
import user from '@/assets/images/auth/user.svg'

import { Button } from '../../../components/ui/button'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'
import { Link } from 'react-router-dom'
import {
  RegisterFormDefaultValues,
  registerSchema,
  type RegisterFormInput,
} from './schemas/register.schema'

function RegisterForm() {
  const { control, watch, handleSubmit } = useForm<RegisterFormInput>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: RegisterFormDefaultValues,
  })

  const onSubmit = (data: RegisterFormInput) => {
    console.log('data', data)
  }

  return (
    <div className={`w-full rounded-2xl`}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-2xl">
        <Card className="rounded-2xl border-0 bg-white shadow-none">
          <CardHeader className="space-y-4 pb-6">
            <div className="flex justify-center">
              <img src={user} alt="login icon" className="h-[84px] w-[84px]" />
            </div>
            <div className="space-y-2 text-center">
              <CardTitle className="text-2xl font-bold">Create New Account</CardTitle>
              <CardDescription className="text-muted-fg text-base">
                Enter your details to sign up{' '}
              </CardDescription>{' '}
            </div>
          </CardHeader>
          <CardContent className={`space-y-4 px-6`}>
            <div>
              <FormInput
                name="full_name"
                type="text"
                label="Full Name"
                placeholder="Enter your full name"
                control={control}
                required
              />
            </div>
            <div>
              <FormInput
                name="email"
                type="email"
                label="Email Address"
                placeholder="Enter your email address"
                control={control}
                required
              />
            </div>
            <div>
              <FormInput
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                control={control}
                required
              />
            </div>
          </CardContent>
          <CardFooter className={`flex-col space-y-8 px-6 py-2`}>
            <Button
              isDisabled={!watch('email') || !watch('password') || !watch('full_name')}
              type="submit"
              className="h-[52px] w-full"
              size="lg"
            >
              Register
            </Button>
            <article className="flex items-center gap-1 font-medium">
              <p className="text-muted-fg">{`Already have an account?`}</p>{' '}
              <Link to="/login" className="text-primary hover:underline">
                Login
              </Link>
            </article>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default RegisterForm
