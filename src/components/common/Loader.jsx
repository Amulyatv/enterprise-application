import { Box, CircularProgress } from '@mui/material'

const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#121212' : '#f5f5f5',
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default Loader
