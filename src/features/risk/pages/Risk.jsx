import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Paper, Typography, Grid, CircularProgress } from '@mui/material'
import { fetchRisks } from '@store/slices/riskSlice'
import DataTable from '@components/common/DataTable'

const Risk = () => {
  const dispatch = useDispatch()
  const { risks, loading } = useSelector((state) => state.risk)

  useEffect(() => {
    dispatch(fetchRisks())
  }, [dispatch])

  const columns = [
    { key: 'name', label: 'Risk Name' },
    { key: 'category', label: 'Category' },
    { key: 'likelihood', label: 'Likelihood' },
    { key: 'impact', label: 'Impact' },
    { key: 'riskScore', label: 'Risk Score' },
    { key: 'status', label: 'Status' },
    { key: 'owner', label: 'Owner' },
  ]

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Risk Management
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Risk Matrix
            </Typography>
            <Box sx={{ height: 300, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="body2" color="textSecondary" sx={{ p: 2 }}>
                Risk Matrix Chart Placeholder
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Risk Trends
            </Typography>
            <Box sx={{ height: 300, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="body2" color="textSecondary" sx={{ p: 2 }}>
                Risk Trends Chart Placeholder
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataTable columns={columns} rows={risks} exportable selectable />
      )}
    </Box>
  )
}

export default Risk
