import { cookieUtils } from './cookies'

const API_BASE_URL = import.meta.env.VITE_API_URL || ''

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean
}

export const api = {
  /**
   * Make a GET request
   * @param {string} endpoint - API endpoint path
   * @param {RequestOptions} [options] - Request options
   * @returns {Promise<T>} - Promise resolving to the response data
   */
  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  },

  /**
   * Make a POST request
   * @param {string} endpoint - API endpoint path
   * @param {unknown} [data] - Request body data
   * @param {RequestOptions} [options] - Request options
   * @returns {Promise<T>} - Promise resolving to the response data
   */
  async post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  /**
   * Make a PUT request
   * @param {string} endpoint - API endpoint path
   * @param {unknown} [data] - Request body data
   * @param {RequestOptions} [options] - Request options
   * @returns {Promise<T>} - Promise resolving to the response data
   */
  async put<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  /**
   * Make a PATCH request
   * @param {string} endpoint - API endpoint path
   * @param {unknown} [data] - Request body data
   * @param {RequestOptions} [options] - Request options
   * @returns {Promise<T>} - Promise resolving to the response data
   */
  async patch<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  },

  /**
   * Make a DELETE request
   * @param {string} endpoint - API endpoint path
   * @param {RequestOptions} [options] - Request options
   * @returns {Promise<T>} - Promise resolving to the response data
   */
  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  },

  /**
   * Makes a request to the given API endpoint
   * @param {string} endpoint - API endpoint path
   * @param {RequestOptions} [options] - Request options
   * @returns {Promise<T>} - Promise resolving to the response data
   * @example
   * const response = await api.request<T>('users/me', {
   *   headers: {
   *     'X-Custom-Header': 'Custom header value',
   *   },
   *   requiresAuth: false,
   * })
   */
  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { requiresAuth = true, headers = {}, ...restOptions } = options
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(headers as Record<string, string>),
    }
    if (requiresAuth) {
      const token = cookieUtils.getAuthToken()
      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`
      }
    }
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...restOptions,
      headers: requestHeaders,
    })

    if (!response.ok) {
      if (response.status === 401) {
        cookieUtils.clearAuthCookies()
        window.location.href = '/login'
      }

      const error = await response.json().catch(() => ({ message: response.statusText }))
      throw new Error(error.message || 'API request failed')
    }
    return response.json()
  },
}

/**
 * Example usage:
 *
 * Authenticated request
 * const user = await api.get<User>('/user/profile')
 *
 * Public request (no auth required)
 * const data = await api.get<PublicData>('/public/data', { requiresAuth: false })
 *
 * POST with data
 * const result = await api.post<Response>('/user/update', { name: 'John' })
 */
