import LoginForm from './login.form'
import home from '@/assets/images/auth/minimalist-home.svg'

export const Login = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="mx-auto w-full max-w-5xl 2xl:max-w-6xl">
        <div className="grid items-center gap-3 lg:grid-cols-2">
          <div className="mx-auto w-full max-w-[500px]">
            <LoginForm />
          </div>

          <div className="hidden lg:block">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={home}
                alt="Login page"
                className="h-auto max-h-[95vh] w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
