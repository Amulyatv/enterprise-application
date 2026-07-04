import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Paper, Typography, Button, CircularProgress, Grid, Chip } from '@mui/material'
import { fetchVendorDetails } from '@store/slices/vendorSlice'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const VendorDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentVendor, loading } = useSelector((state) => state.vendor)

  useEffect(() => {
    dispatch(fetchVendorDetails(id))
  }, [dispatch, id])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/vendors')}
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      {currentVendor ? (
        <Paper sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                {currentVendor.name}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                Category
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {currentVendor.category}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                Status
              </Typography>
              <Chip label={currentVendor.status} color="primary" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                Risk Level
              </Typography>
              <Chip
                label={currentVendor.riskLevel}
                color={currentVendor.riskLevel === 'high' ? 'error' : 'success'}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                Compliance Status
              </Typography>
              <Chip label={currentVendor.complianceStatus} color="primary" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                Contact Person
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {currentVendor.contactPerson}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Typography>Vendor not found</Typography>
      )}
    </Box>
  )
}

export default VendorDetails
