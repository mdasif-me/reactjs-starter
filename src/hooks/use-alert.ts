import { AlertContext } from '@/context/alert-context'
import { useContext } from 'react'

export function useAlert() {
  const context = useContext(AlertContext)

  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider')
  }

  return context
}
