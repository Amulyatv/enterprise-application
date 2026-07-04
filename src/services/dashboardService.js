import apiClient from './apiClient'

const dashboardService = {
  getDashboardData: async () => {
    try {
      const response = await apiClient.get('/dashboard')
      return response
    } catch (error) {
      throw error
    }
  },

  getKPIs: async () => {
    try {
      const response = await apiClient.get('/dashboard/kpis')
      return response
    } catch (error) {
      throw error
    }
  },

  getCharts: async () => {
    try {
      const response = await apiClient.get('/dashboard/charts')
      return response
    } catch (error) {
      throw error
    }
  },

  getActivities: async () => {
    try {
      const response = await apiClient.get('/dashboard/activities')
      return response
    } catch (error) {
      throw error
    }
  },
}

export default dashboardService
