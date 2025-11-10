import register from '@/assets/images/auth/register.svg'
import RegisterForm from './register.form'

export const Register = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="mx-auto w-full max-w-5xl 2xl:max-w-6xl">
        <div className="grid items-center gap-3 lg:grid-cols-2">
          <div className="hidden lg:block">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={register}
                alt="Register page"
                className="h-auto max-h-[95vh] w-full object-contain"
              />{' '}
            </div>
          </div>
          <div className="mx-auto w-full max-w-[500px]">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  )
}
