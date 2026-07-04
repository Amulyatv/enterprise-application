import apiClient from './apiClient'

const auditService = {
  getAuditLogs: async (filters = {}) => {
    try {
      const response = await apiClient.get('/audit/logs', { params: filters })
      return response
    } catch (error) {
      throw error
    }
  },

  getUserActivities: async (userId) => {
    try {
      const response = await apiClient.get(`/audit/users/${userId}/activities`)
      return response
    } catch (error) {
      throw error
    }
  },

  getSystemLogs: async (filters = {}) => {
    try {
      const response = await apiClient.get('/audit/system-logs', { params: filters })
      return response
    } catch (error) {
      throw error
    }
  },

  generateAuditReport: async (params) => {
    try {
      const response = await apiClient.post('/audit/reports/generate', params)
      return response
    } catch (error) {
      throw error
    }
  },

  exportAuditData: async (filters) => {
    try {
      const response = await apiClient.get('/audit/export', {
        params: filters,
        responseType: 'blob',
      })
      return response
    } catch (error) {
      throw error
    }
  },
}

export default auditService
