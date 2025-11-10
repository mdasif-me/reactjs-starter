import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react'
import { cookieUtils } from '@/lib/cookies'

interface IAuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: IUser | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  hasPermission: (permission: string) => boolean
}

interface IUser {
  id: string
  email: string
  name: string
  permissions: string[]
}

const AuthContext = createContext<IAuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    const token = cookieUtils.getAuthToken()
    const userData = cookieUtils.getUserData<IUser>()

    if (token && userData) {
      setUser(userData)
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = useCallback(async (email: string, _password: string) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: IUser = {
        id: '1',
        email,
        name: 'Muhammad Asif',
        permissions: ['read', 'write', 'admin'],
      }

      const mockToken = `mock_token_${Date.now()}`
      cookieUtils.setAuthToken(mockToken)
      cookieUtils.setUserData(mockUser)

      setUser(mockUser)
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    cookieUtils.clearAuthCookies()

    setUser(null)
    setIsAuthenticated(false)
  }, [])

  const hasPermission = useCallback(
    (permission: string) => {
      return user?.permissions.includes(permission) ?? false
    },
    [user],
  )

  const value = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      user,
      login,
      logout,
      hasPermission,
    }),
    [isAuthenticated, isLoading, user, login, logout, hasPermission],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
