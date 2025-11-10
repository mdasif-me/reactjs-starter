import { useCallback, useReducer } from 'react'
import { AlertContext, type AlertConfig, type AlertState } from './alert-context'

type AlertActionType = { type: 'SHOW'; payload: AlertConfig } | { type: 'HIDE' }

const initialState: AlertState = {
  isOpen: false,
  config: null,
}

function alertReducer(state: AlertState, action: AlertActionType): AlertState {
  switch (action.type) {
    case 'SHOW':
      return {
        isOpen: true,
        config: action.payload,
      }
    case 'HIDE':
      return {
        isOpen: false,
        config: null,
      }
    default:
      return state
  }
}

export interface AlertProviderProps {
  children: React.ReactNode
}

export function AlertProvider({ children }: AlertProviderProps) {
  const [state, dispatch] = useReducer(alertReducer, initialState)

  const showAlert = useCallback((config: AlertConfig) => {
    dispatch({ type: 'SHOW', payload: config })
  }, [])

  const hideAlert = useCallback(() => {
    dispatch({ type: 'HIDE' })
  }, [])

  const value = {
    state,
    showAlert,
    hideAlert,
  }

  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
}
