import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import complianceService from '@services/complianceService'

export const fetchCompliance = createAsyncThunk(
  'compliance/fetchCompliance',
  async (_, { rejectWithValue }) => {
    try {
      const response = await complianceService.getCompliance()
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch compliance data')
    }
  }
)

const initialState = {
  issues: [],
  violations: [],
  missingDocuments: [],
  expiredCertifications: [],
  status: 'compliant',
  loading: false,
  error: null,
}

const complianceSlice = createSlice({
  name: 'compliance',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompliance.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCompliance.fulfilled, (state, action) => {
        state.loading = false
        state.issues = action.payload.issues
        state.violations = action.payload.violations
        state.missingDocuments = action.payload.missingDocuments
        state.expiredCertifications = action.payload.expiredCertifications
      })
      .addCase(fetchCompliance.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError } = complianceSlice.actions
export default complianceSlice.reducer