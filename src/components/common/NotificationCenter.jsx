import { Alert, Box } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { removeNotification } from '@store/slices/notificationSlice'
import { useEffect } from 'react'

const NotificationCenter = () => {
  const { notifications } = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 80,
        right: 20,
        zIndex: 9999,
        maxWidth: 400,
      }}
    >
      {notifications.slice(0, 5).map((notification) => (
        <Alert
          key={notification.id}
          severity={notification.type || 'info'}
          onClose={() => dispatch(removeNotification(notification.id))}
          sx={{ mb: 1 }}
        >
          {notification.message}
        </Alert>
      ))}
    </Box>
  )
}

export default NotificationCenter
