import { createContext } from 'react'

export type AlertType = 'success' | 'error' | 'warning' | 'info' | 'confirm'
export type AlertVariant = 'default' | 'danger' | 'primary'

export interface AlertAction {
  label: string
  onClick: () => void | Promise<void>
  variant?: AlertVariant
  isLoading?: boolean
}

export interface AlertConfig {
  type: AlertType
  title: string
  description?: string
  confirmAction?: AlertAction
  cancelAction?: AlertAction
  icon?: React.ReactNode
  iconSrc?: string
  iconAlt?: string
}

export interface AlertState {
  isOpen: boolean
  config: AlertConfig | null
}

interface AlertContextType {
  state: AlertState
  showAlert: (config: AlertConfig) => void
  hideAlert: () => void
}

export const AlertContext = createContext<AlertContextType | undefined>(undefined)
