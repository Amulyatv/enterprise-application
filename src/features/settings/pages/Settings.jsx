import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Paper, Typography, TextField, Button, Grid, Divider } from '@mui/material'
import { updateUserSettings } from '@store/slices/settingsSlice'

const Settings = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    department: user?.department || '',
  })
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsAlerts: false,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleToggle = (setting) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  const handleSave = () => {
    dispatch(updateUserSettings({ ...formData, ...notificationSettings }))
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Settings
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Personal Information
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Notification Settings
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>Email Notifications</Typography>
            <Button
              variant={notificationSettings.emailNotifications ? 'contained' : 'outlined'}
              onClick={() => handleToggle('emailNotifications')}
            >
              {notificationSettings.emailNotifications ? 'Enabled' : 'Disabled'}
            </Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>Push Notifications</Typography>
            <Button
              variant={notificationSettings.pushNotifications ? 'contained' : 'outlined'}
              onClick={() => handleToggle('pushNotifications')}
            >
              {notificationSettings.pushNotifications ? 'Enabled' : 'Disabled'}
            </Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>SMS Alerts</Typography>
            <Button
              variant={notificationSettings.smsAlerts ? 'contained' : 'outlined'}
              onClick={() => handleToggle('smsAlerts')}
            >
              {notificationSettings.smsAlerts ? 'Enabled' : 'Disabled'}
            </Button>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" size="large" onClick={handleSave}>
          Save Changes
        </Button>
        <Button variant="outlined" size="large">
          Cancel
        </Button>
      </Box>
    </Box>
  )
}

export default Settings
