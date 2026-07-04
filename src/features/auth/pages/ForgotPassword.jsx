import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Card,
  Alert,
  CircularProgress,
} from '@mui/material'
import authService from '@services/authService'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await authService.forgotPassword(email)
      setSuccess(true)
    } catch (err) {
      setError(err.message || 'Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#121212' : '#f5f5f5',
        }}
      >
        <Container maxWidth="sm">
          <Card sx={{ p: 4, textAlign: 'center' }}>
            <Alert severity="success" sx={{ mb: 2 }}>
              Reset email sent successfully!
            </Alert>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Please check your email for password reset instructions.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/login')}
            >
              Back to Login
            </Button>
          </Card>
        </Container>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#121212' : '#f5f5f5',
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Reset Password
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Enter your email to receive password reset instructions
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3 }}
              disabled={loading}
              type="submit"
            >
              {loading ? <CircularProgress size={24} /> : 'Send Reset Email'}
            </Button>
          </form>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Button
              size="small"
              onClick={() => navigate('/login')}
            >
              Back to Login
            </Button>
          </Box>
        </Card>
      </Container>
    </Box>
  )
}

export default ForgotPassword
