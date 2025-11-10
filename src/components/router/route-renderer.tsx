import React from 'react'
import { RouteErrorBoundary } from './error-boundary'
import type { IRouteRendererProps } from './interface'

export const RouteRenderer: React.FC<IRouteRendererProps> = React.memo(({ route }) => {
  const Component = route.component!
  const Layout = route.layout || React.Fragment

  return (
    <RouteErrorBoundary>
      <Layout>
        <Component />
      </Layout>
    </RouteErrorBoundary>
  )
})

RouteRenderer.displayName = 'RouteRenderer'
