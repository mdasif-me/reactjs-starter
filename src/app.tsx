import { AppRouter } from '@/components/router/app'
import { AlertProvider } from '@/context/alert-context-provider'
import { AuthProvider } from '@/context/auth-context'
import { AlertDisplay } from '@/shared/components/alert-display'

export default function App() {
  return (
    <AlertProvider>
      <AuthProvider>
        <AppRouter />
        <AlertDisplay />
      </AuthProvider>
    </AlertProvider>
  )
}
