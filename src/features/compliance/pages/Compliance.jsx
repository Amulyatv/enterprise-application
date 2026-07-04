import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Paper, Typography, Grid, CircularProgress, Chip } from '@mui/material'
import { fetchCompliance } from '@store/slices/complianceSlice'
import DataTable from '@components/common/DataTable'

const Compliance = () => {
  const dispatch = useDispatch()
  const { complianceData, loading } = useSelector((state) => state.compliance)

  useEffect(() => {
    dispatch(fetchCompliance())
  }, [dispatch])

  const columns = [
    { key: 'name', label: 'Item' },
    { key: 'type', label: 'Type' },
    { key: 'status', label: 'Status' },
    { key: 'dueDate', label: 'Due Date' },
  ]

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Compliance Management
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography color="textSecondary" gutterBottom>
              Compliance Rate
            </Typography>
            <Typography variant="h5">94%</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography color="textSecondary" gutterBottom>
              Active Issues
            </Typography>
            <Typography variant="h5" color="error">
              3
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography color="textSecondary" gutterBottom>
              Violations
            </Typography>
            <Typography variant="h5" color="error">
              1
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography color="textSecondary" gutterBottom>
              In Progress
            </Typography>
            <Typography variant="h5" color="warning.main">
              2
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataTable columns={columns} rows={complianceData} exportable selectable />
      )}
    </Box>
  )
}

export default Compliance
