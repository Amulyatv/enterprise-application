import apiClient from './apiClient'

const complianceService = {
  getCompliance: async () => {
    try {
      const response = await apiClient.get('/compliance')
      return response
    } catch (error) {
      throw error
    }
  },

  getComplianceIssues: async () => {
    try {
      const response = await apiClient.get('/compliance/issues')
      return response
    } catch (error) {
      throw error
    }
  },

  getViolations: async () => {
    try {
      const response = await apiClient.get('/compliance/violations')
      return response
    } catch (error) {
      throw error
    }
  },

  getMissingDocuments: async () => {
    try {
      const response = await apiClient.get('/compliance/missing-documents')
      return response
    } catch (error) {
      throw error
    }
  },

  getExpiredCertifications: async () => {
    try {
      const response = await apiClient.get('/compliance/expired-certifications')
      return response
    } catch (error) {
      throw error
    }
  },

  submitCompliance: async (data) => {
    try {
      const response = await apiClient.post('/compliance/submit', data)
      return response
    } catch (error) {
      throw error
    }
  },
}

export default complianceService
