import apiClient from './apiClient'

const procurementService = {
  getRequests: async (filters = {}) => {
    try {
      const response = await apiClient.get('/procurement/requests', { params: filters })
      return response
    } catch (error) {
      throw error
    }
  },

  getRequestDetails: async (requestId) => {
    try {
      const response = await apiClient.get(`/procurement/requests/${requestId}`)
      return response
    } catch (error) {
      throw error
    }
  },

  createRequest: async (data) => {
    try {
      const response = await apiClient.post('/procurement/requests', data)
      return response
    } catch (error) {
      throw error
    }
  },

  updateRequest: async (requestId, data) => {
    try {
      const response = await apiClient.put(`/procurement/requests/${requestId}`, data)
      return response
    } catch (error) {
      throw error
    }
  },

  approveRequest: async (requestId) => {
    try {
      const response = await apiClient.post(`/procurement/requests/${requestId}/approve`)
      return response
    } catch (error) {
      throw error
    }
  },

  rejectRequest: async (requestId, reason) => {
    try {
      const response = await apiClient.post(`/procurement/requests/${requestId}/reject`, { reason })
      return response
    } catch (error) {
      throw error
    }
  },

  addComment: async (requestId, comment) => {
    try {
      const response = await apiClient.post(`/procurement/requests/${requestId}/comments`, { comment })
      return response
    } catch (error) {
      throw error
    }
  },
}

export default procurementService
