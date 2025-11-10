import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import logout from '@/assets/images/alert/logout.svg'

export type AlertType = 'success' | 'error' | 'warning' | 'info' | 'confirm'

export interface AlertAction {
  label: string
  onClick: () => void | Promise<void>
  variant?: 'default' | 'danger' | 'primary'
  isLoading?: boolean
}

export interface AlertDialogProps {
  type: AlertType
  title: string
  description?: string
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  confirmAction?: AlertAction
  cancelAction?: AlertAction
  children?: React.ReactNode
  icon?: React.ReactNode
  iconSrc?: string
  iconAlt?: string
}

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

export function Alert({
  type,
  title,
  description,
  isOpen,
  onOpenChange,
  confirmAction,
  cancelAction,
  children,
  icon,
  iconSrc,
  iconAlt,
}: AlertDialogProps) {
  // State management - O(1)
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const open = isOpen ?? internalIsOpen
  const setOpen = onOpenChange ?? setInternalIsOpen

  // Action handlers - O(1)
  const handleAction = async (action?: AlertAction) => {
    if (!action) {
      setOpen(false)
      return
    }

    setIsLoading(true)
    try {
      await action.onClick()
      setOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirm = () => handleAction(confirmAction)
  const handleCancel = () => handleAction(cancelAction)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {children && <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>}

      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex flex-col gap-3">
            {' '}
            <AlertIcon type={type} iconSrc={iconSrc} iconAlt={iconAlt} customIcon={icon} />
            <div className="flex-1">
              <AlertDialogTitle className="text-center text-2xl leading-8 font-semibold">
                {title}
              </AlertDialogTitle>
              {description && (
                <AlertDialogDescription className="mt-2 text-center text-base leading-6">
                  {description}
                </AlertDialogDescription>
              )}
            </div>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-8">
          {cancelAction ? (
            <Button
              className={'h-14 w-full'}
              intent="outline"
              onClick={handleCancel}
              isDisabled={isLoading}
            >
              {cancelAction.label}
            </Button>
          ) : (
            <AlertDialogCancel>Close</AlertDialogCancel>
          )}

          {confirmAction && (
            <Button
              intent={
                confirmAction.variant === 'danger'
                  ? 'danger'
                  : confirmAction.variant === 'default'
                    ? 'outline'
                    : 'primary'
              }
              onClick={handleConfirm}
              isDisabled={isLoading || confirmAction.isLoading}
              className={'h-14 w-full'}
            >
              {confirmAction.label}
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
