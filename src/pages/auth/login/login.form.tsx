import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormInput, FormCheckbox } from '../../../components/ui/form'
import user from '@/assets/images/auth/user.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from '../../../context/auth-context'

import { Button } from '../../../components/ui/button'
import { LoginFormDefaultValues, loginSchema, type LoginFormInput } from './schemas/login.schema'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'
import { Link } from 'react-router-dom'

// Hardcoded credentials for design/testing purposes
// TODO: Remove these when API integration is implemented
const DEMO_EMAIL = 'asif@gmail.com'
const DEMO_PASSWORD = 'Asif@123'

function LoginForm() {
  const { control, watch, handleSubmit } = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: LoginFormDefaultValues,
  })

  const navigate = useNavigate()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: LoginFormInput) => {
    setLoading(true)
    try {
      if (data.email === DEMO_EMAIL && data.password === DEMO_PASSWORD) {
        await login(data.email, data.password)
        toast.success('Login successful!')
        navigate('/dashboard')
      } else {
        toast.error('Invalid email or password')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
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
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <CardDescription className="text-muted-fg text-base">
                Glad to see you again. Log in to your account.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className={`space-y-4 px-6`}>
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
            <div className={`flex items-center justify-between`}>
              <FormCheckbox name="isKeepLogin" label="Keep me login" control={control} />
              <Link
                to="/forgot-password"
                className="text-primary text-sm font-medium hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </CardContent>
          <CardFooter className={`flex-col space-y-8 px-6 py-2`}>
            <Button
              isDisabled={!watch('email') || !watch('password') || loading}
              type="submit"
              className="h-[52px] w-full"
              size="lg"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <article className="flex items-center gap-1 font-medium">
              <p className="text-muted-fg">{`Don’t have an account?`}</p>{' '}
              <Link to="/register" className="text-primary hover:underline">
                Register
              </Link>
            </article>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default LoginForm
