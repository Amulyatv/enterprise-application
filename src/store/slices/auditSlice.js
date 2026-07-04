import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import auditService from '@services/auditService'

export const fetchAuditLogs = createAsyncThunk(
  'audit/fetchAuditLogs',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await auditService.getAuditLogs(filters)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch audit logs')
    }
  }
)

const initialState = {
  logs: [],
  userActivities: [],
  systemLogs: [],
  pagination: { page: 1, limit: 20, total: 0 },
  loading: false,
  error: null,
}

const auditSlice = createSlice({
  name: 'audit',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuditLogs.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAuditLogs.fulfilled, (state, action) => {
        state.loading = false
        state.logs = action.payload.logs
        state.userActivities = action.payload.userActivities
        state.systemLogs = action.payload.systemLogs
        state.pagination = action.payload.pagination
      })
      .addCase(fetchAuditLogs.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError } = auditSlice.actions
export default auditSlice.reducer