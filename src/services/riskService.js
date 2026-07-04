import apiClient from './apiClient'

const riskService = {
  getRisks: async () => {
    try {
      const response = await apiClient.get('/risks')
      return response
    } catch (error) {
      throw error
    }
  },

  getRiskMatrix: async () => {
    try {
      const response = await apiClient.get('/risks/matrix')
      return response
    } catch (error) {
      throw error
    }
  },

  getRiskTrends: async () => {
    try {
      const response = await apiClient.get('/risks/trends')
      return response
    } catch (error) {
      throw error
    }
  },

  assessRisk: async (riskData) => {
    try {
      const response = await apiClient.post('/risks/assess', riskData)
      return response
    } catch (error) {
      throw error
    }
  },

  mitigateRisk: async (riskId, mitigation) => {
    try {
      const response = await apiClient.post(`/risks/${riskId}/mitigate`, mitigation)
      return response
    } catch (error) {
      throw error
    }
  },
}

export default riskService
