import demo_user from '@/assets/images/demo-user.svg'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/context/auth-context'
import { useAlert } from '@/hooks/use-alert'
import { LogoutCircle02Icon, Setup01Icon, UserSharingIcon } from '@hugeicons-pro/core-solid-rounded'
import { HugeiconsIcon } from '@hugeicons/react'
import { Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '../../hooks/use-media-query'
import Notification from './notification'
import SearchBox from './searchbox'

interface TopbarProps {
  sidebarOpen?: boolean
  onSidebarToggle?: () => void
}

export function Topbar({ onSidebarToggle }: TopbarProps) {
  const { showAlert } = useAlert()
  const { logout } = useAuth()

  const isMobile = useMediaQuery('(max-width: 639px)')

  /**
   * Shows a confirmation dialog to logout the user.
   * When the user clicks the 'Logout' button, the logout function is called.
   * If the user clicks the 'Cancel' button, a message 'Cancelled' is logged to the console.
   */
  const handleLogout = () => {
    showAlert({
      type: 'confirm',
      title: 'Logout',
      description: 'Are you sure you want to logout?',
      iconAlt: 'Logout confirmation',
      confirmAction: {
        label: 'Logout',
        onClick: async () => {
          logout()
        },
        variant: 'danger',
      },
      cancelAction: {
        label: 'Cancel',
        onClick: () => console.log('Cancelled'),
      },
    })
  }

  return (
    <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-2 md:px-5">
      {/* left section - menu button for mobile/tablet */}
      <div className="mr-2 flex items-center gap-4 lg:hidden">
        <Button
          onClick={onSidebarToggle}
          size={isMobile ? 'sq-xs' : 'sq-sm'}
          className={'rounded-md'}
          aria-label="Toggle Sidebar"
        >
          <Menu className="shrink-0" />
        </Button>
      </div>

      {/* search */}
      <div className="flex max-w-2xl flex-1 items-center">
        <SearchBox />
      </div>

      {/* right section */}
      <div className="flex items-center gap-4">
        <Notification />
        <hr className="bg-muted-fg/30 h-7 w-0.5 rounded-xl" />

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex cursor-pointer items-center gap-2">
              <img
                src={demo_user}
                className="ring-muted h-8 w-8 shrink-0 rounded ring-2"
                alt="Avatar"
              />

              <article className="hidden sm:block">
                <p className="text-sm font-semibold">Keith Kennedy</p>
                <p className="text-muted-fg -mt-0.5 text-xs">@k.kennedy</p>
              </article>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 p-2" align="end" forceMount>
            <Link to="/profile">
              <DropdownMenuItem className="text-muted-fg flex cursor-pointer items-center text-base">
                <HugeiconsIcon className="size-5 shrink-0" icon={UserSharingIcon} />
                <p>Profile</p>
              </DropdownMenuItem>
            </Link>
            <Link to="/settings">
              <DropdownMenuItem className="text-muted-fg flex cursor-pointer items-center text-base">
                <HugeiconsIcon className="size-5 shrink-0" icon={Setup01Icon} />
                <p>Settings</p>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-danger bg-danger/5 hover:text-danger! hover:bg-danger/5! flex cursor-pointer items-center text-base"
            >
              <HugeiconsIcon className="size-5 shrink-0" icon={LogoutCircle02Icon} />
              <p>Logout</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
