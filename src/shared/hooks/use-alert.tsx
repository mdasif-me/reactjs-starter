/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Alert } from '../components/alert'

export function useAlert() {
  const [alertState, setAlertState] = useState<{
    isOpen: boolean
    props: any
  }>({ isOpen: false, props: {} })

  const show = (props: any) => {
    setAlertState({ isOpen: true, props })
  }

  const hide = () => {
    setAlertState({ isOpen: false, props: {} })
  }

  return {
    show,
    hide,
    AlertComponent:
      alertState.isOpen && alertState.props ? (
        <Alert
          {...alertState.props}
          isOpen={alertState.isOpen}
          onOpenChange={(open: boolean) => !open && hide()}
        />
      ) : null,
  }
}
