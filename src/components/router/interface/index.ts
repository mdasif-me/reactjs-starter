/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { type LazyExoticComponent, type ComponentType } from 'react'

export interface IRouteConfig {
  name: string
  path: string
  component?: ComponentType<any>
  lazyComponent?: LazyExoticComponent<ComponentType<any>>
  protected: 'private' | 'guest-only'
  layout?: ComponentType<{ children: React.ReactNode }>
  permissions?: string[]
  preload?: () => Promise<any>
}

export interface IRouteParams {
  [key: string]: string | number
}

export interface IRouterState {
  currentPath: string
  previousPath: string
  isLoading: boolean
}

export interface IRouteRendererProps {
  route: IRouteConfig
}
