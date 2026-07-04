import apiClient from './apiClient'

const reportService = {
  getReports: async (type = '') => {
    try {
      const response = await apiClient.get('/reports', { params: { type } })
      return response
    } catch (error) {
      throw error
    }
  },

  getReportDetails: async (reportId) => {
    try {
      const response = await apiClient.get(`/reports/${reportId}`)
      return response
    } catch (error) {
      throw error
    }
  },

  generateReport: async (params) => {
    try {
      const response = await apiClient.post('/reports/generate', params)
      return response
    } catch (error) {
      throw error
    }
  },

  saveReport: async (reportData) => {
    try {
      const response = await apiClient.post('/reports/save', reportData)
      return response
    } catch (error) {
      throw error
    }
  },

  exportReport: async (reportId, format) => {
    try {
      const response = await apiClient.get(`/reports/${reportId}/export`, {
        params: { format },
        responseType: 'blob',
      })
      return response
    } catch (error) {
      throw error
    }
  },

  scheduleReport: async (reportData) => {
    try {
      const response = await apiClient.post('/reports/schedule', reportData)
      return response
    } catch (error) {
      throw error
    }
  },
}

export default reportService
