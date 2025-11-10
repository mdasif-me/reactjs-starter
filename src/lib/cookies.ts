import Cookies from 'js-cookie'

// cookies keys
export const COOKIE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  REFRESH_TOKEN: 'refresh_token',
} as const

// cookie options
export const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  secure: import.meta.env.PROD, // only HTTPS in production
  sameSite: 'strict' as const,
}

// cookie utilities
export const cookieUtils = {
  getAuthToken: (): string | undefined => {
    return Cookies.get(COOKIE_KEYS.AUTH_TOKEN)
  },

  setAuthToken: (token: string, options = COOKIE_OPTIONS): void => {
    Cookies.set(COOKIE_KEYS.AUTH_TOKEN, token, options)
  },

  removeAuthToken: (): void => {
    Cookies.remove(COOKIE_KEYS.AUTH_TOKEN)
  },

  getUserData: <T = unknown>(): T | null => {
    const userData = Cookies.get(COOKIE_KEYS.USER_DATA)
    if (!userData) return null

    try {
      return JSON.parse(userData) as T
    } catch (error) {
      console.error('Failed to parse user data from cookie:', error)
      return null
    }
  },

  setUserData: <T = unknown>(data: T, options = COOKIE_OPTIONS): void => {
    Cookies.set(COOKIE_KEYS.USER_DATA, JSON.stringify(data), options)
  },

  removeUserData: (): void => {
    Cookies.remove(COOKIE_KEYS.USER_DATA)
  },

  clearAuthCookies: (): void => {
    Cookies.remove(COOKIE_KEYS.AUTH_TOKEN)
    Cookies.remove(COOKIE_KEYS.USER_DATA)
    Cookies.remove(COOKIE_KEYS.REFRESH_TOKEN)
  },

  isAuthenticated: (): boolean => {
    return !!Cookies.get(COOKIE_KEYS.AUTH_TOKEN)
  },

  setRefreshToken: (token: string, options = { ...COOKIE_OPTIONS, expires: 30 }): void => {
    Cookies.set(COOKIE_KEYS.REFRESH_TOKEN, token, options)
  },

  getRefreshToken: (): string | undefined => {
    return Cookies.get(COOKIE_KEYS.REFRESH_TOKEN)
  },
}
