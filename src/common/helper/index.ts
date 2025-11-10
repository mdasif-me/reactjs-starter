import type { IRouteConfig } from '../../components/router/interface'
import { appRoutes } from '../config/routes.ts'

/**
 * Returns a route configuration object by path.
 * If no route configuration is found by the given path, returns undefined.
 * @param {string} path - The path of the route to search for.
 * @returns {IRouteConfig | undefined} - The route configuration object if found, otherwise undefined.
 */
export const getRouteByPath = (path: string): IRouteConfig | undefined => {
  return appRoutes.find((route) => route.path === path)
}

/**
 * Returns true if the route configuration object with the given path is protected (i.e. 'private'),
 * otherwise returns false.
 * @param {string} path - The path of the route to check if it is protected.
 * @returns {boolean} - True if the route is protected, otherwise false.
 */
export const isRouteProtected = (path: string): boolean => {
  const route = getRouteByPath(path)
  return route?.protected === 'private'
}

/**
 * Returns true if the route configuration object with the given path is guest-only (i.e. 'guest-only'),
 * otherwise returns false.
 * @param {string} path - The path of the route to check if it is guest-only.
 * @returns {boolean} - True if the route is guest-only, otherwise false.
 */
export const isGuestOnlyRoute = (path: string): boolean => {
  const route = getRouteByPath(path)
  return route?.protected === 'guest-only'
}
