import apiClient from './apiClient'

const authService = {
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/login', credentials)
      if (response.token) {
        localStorage.setItem('token', response.token)
      }
      return response
    } catch (error) {
      throw error
    }
  },

  logout: async () => {
    try {
      await apiClient.post('/auth/logout')
      localStorage.removeItem('token')
    } catch (error) {
      throw error
    }
  },

  validateToken: async () => {
    try {
      const response = await apiClient.get('/auth/validate')
      return response
    } catch (error) {
      throw error
    }
  },

  resetPassword: async (data) => {
    try {
      const response = await apiClient.post('/auth/reset-password', data)
      return response
    } catch (error) {
      throw error
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await apiClient.post('/auth/forgot-password', { email })
      return response
    } catch (error) {
      throw error
    }
  },
}

export default authService
