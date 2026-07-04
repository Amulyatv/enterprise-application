import apiClient from './apiClient'

const vendorService = {
  getVendors: async (filters = {}) => {
    try {
      const response = await apiClient.get('/vendors', { params: filters })
      return response
    } catch (error) {
      throw error
    }
  },

  getVendorDetails: async (vendorId) => {
    try {
      const response = await apiClient.get(`/vendors/${vendorId}`)
      return response
    } catch (error) {
      throw error
    }
  },

  createVendor: async (data) => {
    try {
      const response = await apiClient.post('/vendors', data)
      return response
    } catch (error) {
      throw error
    }
  },

  updateVendor: async (vendorId, data) => {
    try {
      const response = await apiClient.put(`/vendors/${vendorId}`, data)
      return response
    } catch (error) {
      throw error
    }
  },

  onboardVendor: async (vendorId) => {
    try {
      const response = await apiClient.post(`/vendors/${vendorId}/onboard`)
      return response
    } catch (error) {
      throw error
    }
  },

  getVendorRisks: async (vendorId) => {
    try {
      const response = await apiClient.get(`/vendors/${vendorId}/risks`)
      return response
    } catch (error) {
      throw error
    }
  },
}

export default vendorService
