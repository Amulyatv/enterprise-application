import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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

const ResetPassword = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    setError('')
    try {
      await authService.resetPassword({
        token,
        password: formData.password,
      })
      setSuccess(true)
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      setError(err.message || 'Failed to reset password')
    } finally {
      setLoading(false)
    }
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
          {success ? (
            <>
              <Alert severity="success" sx={{ mb: 2 }}>
                Password reset successfully!
              </Alert>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Redirecting to login page...
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Reset Password
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Enter your new password
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="New Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
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
                  {loading ? <CircularProgress size={24} /> : 'Reset Password'}
                </Button>
              </form>
            </>
          )}
        </Card>
      </Container>
    </Box>
  )
}

export default ResetPassword
