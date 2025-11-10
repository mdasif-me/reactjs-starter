# Cookie-Based Authentication

This application uses **cookies** instead of localStorage for storing authentication data, providing better security and HTTP-only cookie support.

## 📦 Implementation

### Dependencies

- `js-cookie` - Cookie management library
- `@types/js-cookie` - TypeScript types

### Files Structure

```
src/
├── context/
│   └── auth-context.tsx      # Authentication context with cookie integration
├── lib/
│   ├── cookies.ts            # Cookie utility functions
│   └── api.ts                # API client with auto auth token injection
```

## 🔧 Cookie Utilities

### Available Functions

```typescript
import { cookieUtils } from '@/lib/cookies'

// Auth token management
cookieUtils.getAuthToken() // Get current auth token
cookieUtils.setAuthToken(token) // Store auth token
cookieUtils.removeAuthToken() // Remove auth token

// User data management
cookieUtils.getUserData<IUser>() // Get parsed user data
cookieUtils.setUserData(userData) // Store user data
cookieUtils.removeUserData() // Remove user data

// Utility functions
cookieUtils.isAuthenticated() // Check if user has valid token
cookieUtils.clearAuthCookies() // Clear all auth-related cookies
cookieUtils.setRefreshToken(token) // Store refresh token
cookieUtils.getRefreshToken() // Get refresh token
```

## 🔐 Cookie Configuration

Cookies are configured with the following options:

```typescript
{
  expires: 7,              // 7 days expiration
  secure: true,            // HTTPS only in production
  sameSite: 'strict'       // CSRF protection
}
```

### Cookie Keys

- `auth_token` - JWT or access token
- `user_data` - Serialized user information
- `refresh_token` - Refresh token (30 days expiration)

## 🚀 Usage Examples

### Authentication Context

```typescript
import { useAuth } from '@/context/auth-context'

function MyComponent() {
  const { login, logout, user, isAuthenticated } = useAuth()

  const handleLogin = async () => {
    await login('user@example.com', 'password')
    // Token and user data automatically stored in cookies
  }

  const handleLogout = () => {
    logout()
    // All auth cookies cleared automatically
  }

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.name}!</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  )
}
```

### API Requests

```typescript
import { api } from '@/lib/api'

// Authenticated requests (auth token automatically included)
const userData = await api.get<User>('/user/profile')
const updated = await api.put('/user/profile', { name: 'New Name' })

// Public requests (no auth required)
const publicData = await api.get('/public/data', { requiresAuth: false })
```

## 🔄 Auto-Persistence

The authentication context automatically:

- ✅ Checks for existing cookies on app load
- ✅ Restores user session if valid token exists
- ✅ Clears cookies on logout
- ✅ Handles expired/invalid tokens

## 🛡️ Security Benefits

### Why Cookies Over localStorage?

1. **HttpOnly Support** - Can be set server-side as HttpOnly, preventing XSS attacks
2. **Automatic Transmission** - Sent with every request to same domain
3. **Built-in Expiration** - Automatic cleanup of expired data
4. **SameSite Protection** - Built-in CSRF protection
5. **Secure Flag** - HTTPS-only transmission in production

### Security Features

- ✅ Secure flag enabled in production
- ✅ SameSite=strict for CSRF protection
- ✅ Automatic token expiration
- ✅ Error handling for corrupted data
- ✅ Auto-logout on 401 responses

## 🔧 Production Configuration

For production deployment, ensure:

```typescript
// Environment variables
VITE_API_URL=https://api.yourdomain.com

// Server-side cookies (recommended)
// Set HttpOnly flag on server for maximum security
Set-Cookie: auth_token=...; HttpOnly; Secure; SameSite=Strict
```

## 🔄 Token Refresh Flow

```typescript
// Example refresh token implementation
async function refreshAuthToken() {
  const refreshToken = cookieUtils.getRefreshToken()

  if (!refreshToken) {
    throw new Error('No refresh token available')
  }

  const response = await api.post('/auth/refresh', { refreshToken })

  // Update tokens
  cookieUtils.setAuthToken(response.accessToken)
  cookieUtils.setRefreshToken(response.refreshToken)

  return response.accessToken
}
```

## 📝 Notes

- Cookies are automatically included in same-origin requests
- For cross-origin requests, configure CORS with credentials
- Consider implementing refresh token rotation for enhanced security
- Monitor cookie size limits (4KB per cookie)

## 🚨 Migration from localStorage

If migrating from localStorage:

```typescript
// Clear old localStorage data
localStorage.removeItem('auth_token')
localStorage.removeItem('user_data')

// Cookies are now used automatically
```
