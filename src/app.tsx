import { AuthProvider } from '@/context/auth-context'
import { AppRouter } from '@/components/router/app'

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}
