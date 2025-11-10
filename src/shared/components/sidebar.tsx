/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { cn } from '@/lib/utils'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import logo from '/logo.svg'
import { useState } from 'react'
import type { IDropdownItemProps, ISidebarData, ISidebarGroup, ISidebarItem } from '../interface'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Building02Icon,
  DollarCircleIcon,
  Home07Icon,
  LogoutSquare01Icon,
  Settings01Icon,
  UserMultipleIcon,
} from '@hugeicons-pro/core-stroke-rounded'
import sidebar_bottom_card from '@/assets/images/sidebar-bottom-card.svg.svg'
import call_center from '@/assets/images/call-center.svg'

import { Button } from '@/components/ui/button'
import { useAlert } from '@/shared'

const sidebarData: ISidebarData = [
  {
    title: 'Dashboard',
    href: '/',
    icon: Home07Icon,
  },
  {
    title: 'Projects',
    href: '/projects',
    icon: Building02Icon,
  },
  {
    title: 'Investors',
    href: '/investors',
    icon: UserMultipleIcon,
  },
  {
    title: 'Transactions',
    href: '/transactions',
    icon: DollarCircleIcon,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings01Icon,
  },
]

function SidebarIcon({
  icon,
  isActive,
  className,
}: {
  icon: any
  isActive?: boolean
  className?: string
}) {
  return (
    <HugeiconsIcon
      icon={icon}
      size={20}
      color="currentColor"
      strokeWidth={2}
      className={cn('shrink-0', isActive ? 'text-white' : 'text-muted-fg', className)}
    />
  )
}

function DropdownItem({ item, onMobileClose }: IDropdownItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = useLocation().pathname
  const Icon = item.icon

  const hasChildren = item.items && item.items.length > 0

  const handleLinkClick = () => {
    if (!hasChildren) {
      onMobileClose?.()
    }
  }

  if (!hasChildren) {
    const isActive = pathname === item.href
    return (
      <div className="relative">
        <Link
          to={item.href}
          onClick={handleLinkClick}
          className={cn(
            'flex items-center gap-2 rounded-xl px-3 py-2',
            isActive ? 'bg-primary text-white shadow-md' : 'text-muted-fg',
          )}
        >
          <SidebarIcon icon={Icon} isActive={isActive} />
          <p className="leading-7 font-medium">{item.title}</p>
          {item.badge && (
            <p className="bg-primary text-primary-foreground ml-auto rounded-full px-2 py-1 text-xs">
              {item.badge}
            </p>
          )}
        </Link>
        {isActive && (
          <div className="bg-primary absolute top-2 -left-[19px] h-7 w-1 rounded-tr-xl rounded-br-xl" />
        )}
      </div>
    )
  }

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-muted-fg hover:bg-muted hover:text-foreground flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200"
      >
        <SidebarIcon icon={Icon} />
        <span className="flex-1 text-left">{item.title}</span>
        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>

      {isOpen && (
        <div className="border-muted ml-6 space-y-1 border-l-2 pl-3">
          {item.items?.map((child) => {
            const ChildIcon = child.icon
            return (
              <Link
                key={child.href}
                to={child.href}
                onClick={() => onMobileClose?.()}
                className={cn(
                  'hover:bg-muted flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all duration-200',
                  pathname === child.href
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md'
                    : 'text-muted-fg hover:text-foreground',
                )}
              >
                <SidebarIcon icon={ChildIcon} isActive={pathname === child.href} />
                <span>{child.title}</span>
                {child.badge && (
                  <span className="bg-primary text-primary-foreground ml-auto rounded-full px-2 py-1 text-xs">
                    {child.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

interface SidebarProps {
  onMobileClose?: () => void
}

export function Sidebar({ onMobileClose }: SidebarProps) {
  const isGrouped = sidebarData.length > 0 && 'items' in sidebarData[0]

  const alert = useAlert()

  const handleLogoutClick = () => {
    alert.show({
      type: 'confirm',
      title: 'Logout',
      description: 'Are you sure you want to logout?',
      iconAlt: 'Logout confirmation',
      confirmAction: {
        label: 'Logout',
        onClick: async () => {
          console.log('User logged out')
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
    <div className={cn('flex h-full w-64 flex-col border-r bg-white transition-all duration-300')}>
      <div className="flex h-16 items-center justify-between border-b px-5">
        <img src={logo} alt="Logo" className="h-[32.939px] w-[89.926px]" />
      </div>
      <nav className="flex-1 space-y-6 p-5">
        {isGrouped ? (
          (sidebarData as ISidebarGroup[]).map((group, groupIndex) => (
            <div key={group.title || groupIndex} className="space-y-3">
              {group.title && (
                <h3 className="text-muted-fg mb-4 px-3 text-xs font-semibold tracking-wider uppercase">
                  {group.title}
                </h3>
              )}

              <div className="space-y-2">
                {group.items.map((item) => (
                  <DropdownItem key={item.href} item={item} onMobileClose={onMobileClose} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="space-y-2">
            {(sidebarData as ISidebarItem[]).map((item) => (
              <DropdownItem key={item.href} item={item} onMobileClose={onMobileClose} />
            ))}
          </div>
        )}
      </nav>
      <div>
        <div className="relative w-full overflow-hidden rounded-lg p-5">
          <img
            src={sidebar_bottom_card}
            alt="Sidebar Banner"
            className="h-full w-full object-cover"
          />

          <div className="absolute top-9 right-9 left-9">
            <img src={call_center} alt="Call Center" className="h-9 w-9" />

            <h4 className="mt-2.5 text-base font-semibold text-white">Contact Support</h4>

            <p className="mt-1 text-xs text-white/80">
              Get help with your projects and your account
            </p>

            <Button
              intent="secondary"
              className="border-primary text-primary mt-2.5 w-full border bg-white text-sm font-semibold transition-all duration-300 hover:bg-white/80"
            >
              Contact Now
            </Button>
          </div>
        </div>
        {alert.AlertComponent}
        <div className="relative w-full overflow-hidden rounded-lg p-5">
          <button
            onClick={handleLogoutClick}
            className="text-muted-fg hover:text-danger hover:bg-danger/10 flex w-full items-center gap-2 rounded-lg p-3 font-semibold transition-all duration-300 ease-in hover:cursor-pointer"
          >
            <HugeiconsIcon strokeWidth={2} icon={LogoutSquare01Icon} />
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
