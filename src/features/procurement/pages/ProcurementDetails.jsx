import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Paper, Typography, Button, CircularProgress, Grid } from '@mui/material'
import { fetchProcurementDetails } from '@store/slices/procurementSlice'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const ProcurementDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentRequest, loading } = useSelector((state) => state.procurement)

  useEffect(() => {
    dispatch(fetchProcurementDetails(id))
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
        onClick={() => navigate('/procurement')}
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      {currentRequest ? (
        <Paper sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                {currentRequest.title}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Request ID
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {currentRequest.id}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Status
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {currentRequest.status}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="textSecondary">
                Description
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {currentRequest.description}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Typography>Request not found</Typography>
      )}
    </Box>
  )
}

export default ProcurementDetails
