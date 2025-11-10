import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/auth-context'
import type { IRouteConfig } from './interface'
import Loading from '@/shared/components/loading'

interface IRouteGuardProps {
  route: IRouteConfig
  children: React.ReactElement
}

export const RouteGuard: React.FC<IRouteGuardProps> = React.memo(({ route, children }) => {
  const { isAuthenticated, hasPermission, isLoading } = useAuth()
  const location = useLocation()

  // show loading state
  if (isLoading) {
    return <Loading />
  }

  // guest-only routes (login, register) - redirect to dashboard if authenticated
  if (route.protected === 'guest-only' && isAuthenticated) {
    return <Navigate to="/dashboard" replace state={{ from: location }} />
  }

  // private routes - redirect to login-page if not authenticated
  if (route.protected === 'private' && !isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  // check for required permissions
  if (route.protected === 'private' && route.permissions) {
    const hasRequiredPermissions = route.permissions.some((permission: string) =>
      hasPermission(permission),
    )

    if (!hasRequiredPermissions) {
      return <Navigate to="/unauthorized" replace />
    }
  }

  return children
})

RouteGuard.displayName = 'RouteGuard'
