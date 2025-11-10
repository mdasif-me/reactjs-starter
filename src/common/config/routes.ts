import {
  Dashboard,
  ForgotPassword,
  Investors,
  Login,
  Projects,
  Register,
  Settings,
  Transactions,
} from '@/pages'
import { prefetchComponents } from '@/pages'
import { GuestLayout } from '@/components/layouts/guest-layout'
import type { IRouteConfig } from '@/components/router/interface'
import PrivateLayout from '@/components/layouts/private-layout'

export const appRoutes: IRouteConfig[] = [
  // auth routes
  {
    name: 'Login',
    path: '/login',
    component: Login,
    protected: 'guest-only',
    layout: GuestLayout,
  },
  {
    name: 'Register',
    path: '/register',
    component: Register,
    protected: 'guest-only',
    layout: GuestLayout,
  },
  {
    name: 'Forgot Password',
    path: '/forgot-password',
    component: ForgotPassword,
    protected: 'guest-only',
    layout: GuestLayout,
  },
  // app routes
  {
    name: 'Dashboard',
    path: '/',
    component: Dashboard,
    protected: 'private',
    layout: PrivateLayout,
    preload: prefetchComponents.dashboard,
  },
  {
    name: 'Projects',
    path: '/projects',
    component: Projects,
    protected: 'private',
    layout: PrivateLayout,
    preload: prefetchComponents.projects,
  },
  {
    name: 'Investors',
    path: '/investors',
    component: Investors,
    protected: 'private',
    layout: PrivateLayout,
    preload: prefetchComponents.investors,
  },
  {
    name: 'Transactions',
    path: '/transactions',
    component: Transactions,
    protected: 'private',
    layout: PrivateLayout,
    preload: prefetchComponents.transactions,
  },
  {
    name: 'Settings',
    path: '/settings',
    component: Settings,
    protected: 'private',
    layout: PrivateLayout,
    preload: prefetchComponents.settings,
  },
]
