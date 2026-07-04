import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import vendorService from '@services/vendorService'

export const fetchVendors = createAsyncThunk(
  'vendor/fetchVendors',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await vendorService.getVendors(filters)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch vendors')
    }
  }
)

export const fetchVendorDetails = createAsyncThunk(
  'vendor/fetchVendorDetails',
  async (vendorId, { rejectWithValue }) => {
    try {
      const response = await vendorService.getVendorDetails(vendorId)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch vendor details')
    }
  }
)

const initialState = {
  vendors: [],
  currentVendor: null,
  statistics: { total: 0, active: 0, risky: 0, compliant: 0 },
  loading: false,
  error: null,
}

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendors.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.loading = false
        state.vendors = action.payload.data
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchVendorDetails.fulfilled, (state, action) => {
        state.loading = false
        state.currentVendor = action.payload
      })
  },
})

export const { clearError } = vendorSlice.actions
export default vendorSlice.reducer