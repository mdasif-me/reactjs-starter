import React, { Suspense } from 'react'
import { useAuth } from '@/context/auth-context'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { RouteGuard } from './route-guard'
import { RouteRenderer } from './route-renderer'
import { appRoutes } from '@/common/config/routes'
import Loading from '@/shared/components/loading'

export const AppRouter: React.FC = React.memo(() => {
  const { isAuthenticated } = useAuth()

  // prefetch private routes when authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      appRoutes
        .filter((route) => route.protected === 'private' && route.preload)
        .forEach((route) => route.preload?.())
    }
  }, [isAuthenticated])

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {appRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <RouteGuard route={route}>
                  <RouteRenderer route={route} />
                </RouteGuard>
              }
            />
          ))}
          {/* 404 Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
})
