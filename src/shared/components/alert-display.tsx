import logout from '@/assets/images/alert/logout.svg'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import type { AlertType } from '@/context/alert-context'
import { AlertContext } from '@/context/alert-context'
import { useContext, useState } from 'react'

const defaultIcons: Record<AlertType, { src: string; alt: string }> = {
  success: { src: '/icons/success.svg', alt: 'Success' },
  error: { src: '/icons/error.svg', alt: 'Error' },
  warning: { src: '/icons/warning.svg', alt: 'Warning' },
  info: { src: '/icons/info.svg', alt: 'Information' },
  confirm: { src: logout, alt: 'Confirmation' },
}

function AlertIcon({
  type,
  iconSrc,
  iconAlt,
  customIcon,
}: {
  type: AlertType
  iconSrc?: string
  iconAlt?: string
  customIcon?: React.ReactNode
}) {
  if (customIcon) {
    return <div className="shrink-0">{customIcon}</div>
  }

  const iconConfig = defaultIcons[type]
  if (!iconConfig) {
    return null
  }

  const finalSrc = iconSrc || iconConfig.src
  const finalAlt = iconAlt || iconConfig.alt

  return <img src={finalSrc} alt={finalAlt} className="mx-auto h-24 w-24 shrink-0" />
}

export function AlertDisplay() {
  const context = useContext(AlertContext)
  const [isLoading, setIsLoading] = useState(false)

  if (!context) {
    console.warn('AlertDisplay must be used within an AlertProvider')
    return null
  }

  const { state, hideAlert } = context
  const { isOpen, config } = state

  if (!config) {
    return null
  }

  const handleAction = async (
    action: { label: string; onClick: () => void | Promise<void> } | undefined,
  ) => {
    if (!action) {
      hideAlert()
      return
    }

    setIsLoading(true)
    try {
      await action.onClick()
    } finally {
      setIsLoading(false)
      hideAlert()
    }
  }

  const handleConfirm = () => handleAction(config.confirmAction)
  const handleCancel = () => handleAction(config.cancelAction)

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && hideAlert()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex flex-col gap-3">
            <AlertIcon
              type={config.type}
              iconSrc={config.iconSrc}
              iconAlt={config.iconAlt}
              customIcon={config.icon}
            />
            <div className="flex-1">
              <AlertDialogTitle className="text-center text-2xl leading-8 font-semibold">
                {config.title}
              </AlertDialogTitle>
              {config.description && (
                <AlertDialogDescription className="mt-2 text-center text-base leading-6">
                  {config.description}
                </AlertDialogDescription>
              )}
            </div>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-8">
          {config.cancelAction ? (
            <Button
              className="h-10 w-full"
              intent="outline"
              onClick={handleCancel}
              isDisabled={isLoading}
            >
              {config.cancelAction.label}
            </Button>
          ) : (
            <AlertDialogCancel>Close</AlertDialogCancel>
          )}

          {config.confirmAction && (
            <Button
              intent={
                config.confirmAction.variant === 'danger'
                  ? 'danger'
                  : config.confirmAction.variant === 'default'
                    ? 'outline'
                    : 'primary'
              }
              onClick={handleConfirm}
              isDisabled={isLoading || config.confirmAction.isLoading}
              className="h-10 w-full"
            >
              {config.confirmAction.label}
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
