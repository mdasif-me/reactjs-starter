'use client'

import { useState } from 'react'
import { BellIcon } from 'lucide-react'
import { DynamicIcon } from 'lucide-react/dynamic'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const initialNotifications = [
  {
    id: 1,
    icon: 'users',
    title: 'New Investor Registered',
    message: 'Jonathan Cruz has registered as a new investor. Awaiting approval.',
    time: '2 minute ago',
    unread: true,
  },
  {
    id: 2,
    icon: 'alert-triangle',
    title: 'High-Interest Property Alert',
    message: 'Sunset Villa Bali has received 120 views and 18 leads in the past 24 hours,',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: 3,
    icon: 'file-check',
    title: 'Property Listing Expired',
    message: 'Listing for "Maplewood Townhouse" has expired. Please review or renew.',
    time: 'Yesterday, 4:35 PM',
    unread: true,
  },
  {
    id: 4,
    icon: 'files',
    title: 'Document Approved',
    message: 'The financial report for Q2 has been approved by the compliance team.',
    time: '10 minutes ago',
    unread: false,
  },
  {
    id: 5,
    icon: 'alert-circle',
    title: 'System Alert',
    message: 'Unusual login activity detected from a new device.',
    time: '30 minutes ago',
    unread: false,
  },
]

function Dot({ className }: { className?: string }) {
  return (
    <svg
      width="6"
      height="6"
      fill="currentColor"
      viewBox="0 0 6 6"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="3" cy="3" r="3" />
    </svg>
  )
}

export default function Notification() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const unreadCount = notifications.filter((n) => n.unread).length

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        unread: false,
      })),
    )
  }

  const handleNotificationClick = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, unread: false } : notification,
      ),
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sq-sm"
          className="text-secondary-fg relative rounded-full bg-white hover:bg-white/70"
          aria-label="Open notifications"
        >
          <BellIcon size={16} aria-hidden="true" />
          {unreadCount > 0 && (
            <Badge className="bg-danger absolute -top-1 left-full h-4 min-w-4 -translate-x-1/2 px-0.5 text-white">
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-white p-1 shadow-none" align="end">
        <div className="flex items-baseline justify-between gap-4 px-3 py-2">
          <div className="text-sm font-semibold">Notifications</div>
          {unreadCount > 0 && (
            <button
              className="text-primary text-xs font-semibold hover:underline"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </button>
          )}
        </div>
        <div
          role="separator"
          aria-orientation="horizontal"
          className="bg-border -mx-1 my-1 h-px"
        ></div>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="hover:bg-muted/70 rounded-md px-3 py-2 text-sm transition-colors"
          >
            <div className="relative flex items-start pe-3">
              <div className="flex-1 space-y-1">
                <button
                  className="text-foreground/80 text-left after:absolute after:inset-0"
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <article className="flex items-start gap-2">
                    <div className="bg-muted/70 w-fit rounded-sm p-1.5">
                      <DynamicIcon name={notification.icon as never} color="#0CA655" size={20} />
                    </div>
                    <article className="space-y-0.5">
                      <p className="text-foreground text-sm font-semibold">{notification.title}</p>
                      <p className="text-muted-fg text-xs font-normal">{notification.message}</p>
                      <p className="text-muted-fg text-xs font-normal">{notification.time}</p>
                    </article>
                  </article>
                </button>
              </div>
              {notification.unread && (
                <div className="absolute end-0 self-center">
                  <span className="sr-only">Unread</span>
                  <Dot className="text-danger" />
                </div>
              )}
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}
