import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dashboardService from '@services/dashboardService'

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardService.getDashboardData()
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard data')
    }
  }
)

const initialState = {
  kpis: {
    totalRequests: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    rejectedRequests: 0,
    vendors: 0,
    risks: 0,
    complianceIssues: 0,
  },
  charts: {
    monthlyTrend: [],
    riskTrend: [],
    complianceTrend: [],
    departmentSpending: [],
  },
  activities: [],
  loading: false,
  error: null,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false
        state.kpis = action.payload.kpis
        state.charts = action.payload.charts
        state.activities = action.payload.activities
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError } = dashboardSlice.actions
export default dashboardSlice.reducer