import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import reportService from '@services/reportService'

export const fetchReports = createAsyncThunk(
  'report/fetchReports',
  async (type = '', { rejectWithValue }) => {
    try {
      const response = await reportService.getReports(type)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch reports')
    }
  }
)

export const generateReport = createAsyncThunk(
  'report/generateReport',
  async (params, { rejectWithValue }) => {
    try {
      const response = await reportService.generateReport(params)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to generate report')
    }
  }
)

const initialState = {
  reports: [],
  generatedReport: null,
  savedReports: [],
  loading: false,
  error: null,
}

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.loading = false
        state.reports = action.payload
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(generateReport.fulfilled, (state, action) => {
        state.loading = false
        state.generatedReport = action.payload
      })
  },
})

export const { clearError } = reportSlice.actions
export default reportSlice.reducer