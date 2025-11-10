// lazy all components for loading smoother user
import { lazy } from 'react'
export { Login } from './auth/login/login'
export { Dashboard } from './dashboard'
export { Projects } from './projects'
export { Settings } from './settings'
export { Transactions } from './transactions'
export { Register } from './auth/register/register'
export { ForgotPassword } from './auth/forgot-password/forgot-password'
export { Investors } from './investors'

// authentication
export const LazyLogin = lazy(() =>
  import('./auth/login/login').then((m) => ({ default: m.Login })),
)
export const LazyRegister = lazy(() =>
  import('./auth/register/register').then((m) => ({ default: m.Register })),
)
export const LazyForgotPassword = lazy(() =>
  import('./auth/forgot-password/forgot-password').then((m) => ({ default: m.ForgotPassword })),
)

// application pages
export const LazyDashboard = lazy(() =>
  import('./dashboard').then((m) => ({ default: m.Dashboard })),
)
export const LazyProjects = lazy(() => import('./projects').then((m) => ({ default: m.Projects })))
export const LazyTransactions = lazy(() =>
  import('./transactions').then((m) => ({ default: m.Transactions })),
)
export const LazySettings = lazy(() => import('./settings').then((m) => ({ default: m.Settings })))

// prefetch functions for eager loading
export const prefetchComponents = {
  // authentication & authorization
  login: () => import('./auth/login/login'),
  register: () => import('./auth/register/register'),
  forgotPassword: () => import('./auth/forgot-password/forgot-password'),
  // application pages
  dashboard: () => import('./dashboard'),
  projects: () => import('./projects'),
  investors: () => import('./investors'),
  transactions: () => import('./transactions'),
  settings: () => import('./settings'),
}
