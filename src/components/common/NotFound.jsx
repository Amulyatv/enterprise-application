import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#121212' : '#f5f5f5',
        gap: 3,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 100, color: 'error.main' }} />
      <Typography variant="h2">404</Typography>
      <Typography variant="h5">Page Not Found</Typography>
      <Button variant="contained" onClick={() => navigate('/dashboard')}>
        Go to Dashboard
      </Button>
    </Box>
  )
}

export default NotFound
