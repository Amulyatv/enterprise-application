import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import riskService from '@services/riskService'

export const fetchRisks = createAsyncThunk(
  'risk/fetchRisks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await riskService.getRisks()
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch risks')
    }
  }
)

const initialState = {
  risks: [],
  matrix: [],
  trends: [],
  distribution: {},
  loading: false,
  error: null,
}

const riskSlice = createSlice({
  name: 'risk',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRisks.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchRisks.fulfilled, (state, action) => {
        state.loading = false
        state.risks = action.payload.risks
        state.matrix = action.payload.matrix
        state.trends = action.payload.trends
      })
      .addCase(fetchRisks.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError } = riskSlice.actions
export default riskSlice.reducer