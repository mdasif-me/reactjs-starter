'use client'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import SearchBox from './searchbox'
import { useMediaQuery } from '../../hooks/use-media-query'
import Notification from './notification'
import demo_user from '@/assets/images/demo-user.svg'

interface TopbarProps {
  sidebarOpen?: boolean
  onSidebarToggle?: () => void
}

export function Topbar({ onSidebarToggle }: TopbarProps) {
  const isMobile = useMediaQuery('(max-width: 639px)')
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
                className="ring-muted h-8 w-8 shrink-0 rounded-full ring-2"
                alt="Avatar"
              />

              <article className="hidden sm:block">
                <p className="text-sm font-semibold">Keith Kennedy</p>
                <p className="text-muted-fg -mt-0.5 text-xs">@k.kennedy</p>
              </article>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 p-2" align="end" forceMount>
            <DropdownMenuItem className="hover:bg-muted cursor-pointer rounded-md p-3 transition-colors">
              <span className="flex items-center gap-2">👤 Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-muted cursor-pointer rounded-md p-3 transition-colors">
              <span className="flex items-center gap-2">⚙️ Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-muted cursor-pointer rounded-md p-3 transition-colors">
              <span className="flex items-center gap-2">💳 Billing</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuItem className="cursor-pointer rounded-md p-3 text-red-600 transition-colors hover:bg-red-50 hover:text-red-700">
              <span className="flex items-center gap-2">🚪 Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
