import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import procurementService from '@services/procurementService'

export const fetchProcurementRequests = createAsyncThunk(
  'procurement/fetchProcurementRequests',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await procurementService.getRequests(filters)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch requests')
    }
  }
)

export const fetchProcurementDetails = createAsyncThunk(
  'procurement/fetchProcurementDetails',
  async (requestId, { rejectWithValue }) => {
    try {
      const response = await procurementService.getRequestDetails(requestId)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch request details')
    }
  }
)

export const createProcurementRequest = createAsyncThunk(
  'procurement/createProcurementRequest',
  async (data, { rejectWithValue }) => {
    try {
      const response = await procurementService.createRequest(data)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create request')
    }
  }
)

const initialState = {
  requests: [],
  currentRequest: null,
  pagination: { page: 1, limit: 10, total: 0 },
  filters: { status: '', department: '', dateRange: '' },
  loading: false,
  error: null,
}

const procurementSlice = createSlice({
  name: 'procurement',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload
    },
    setPagination: (state, action) => {
      state.pagination = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProcurementRequests.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProcurementRequests.fulfilled, (state, action) => {
        state.loading = false
        state.requests = action.payload.data
        state.pagination = action.payload.pagination
      })
      .addCase(fetchProcurementRequests.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchProcurementDetails.fulfilled, (state, action) => {
        state.loading = false
        state.currentRequest = action.payload
      })
      .addCase(createProcurementRequest.fulfilled, (state, action) => {
        state.loading = false
        state.requests.unshift(action.payload)
      })
  },
})

export const { setFilters, setPagination, clearError } = procurementSlice.actions
export default procurementSlice.reducer