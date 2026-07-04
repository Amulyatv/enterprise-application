import { Box } from '@mui/material'
import Header from './Header'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'

const DRAWER_WIDTH = 280
const DRAWER_WIDTH_COLLAPSED = 70

const MainLayout = ({ children }) => {
  const { sidebarCollapsed } = useSelector((state) => state.ui)
  const width = sidebarCollapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flex: 1,
          marginTop: '64px',
          marginLeft: `${width}px`,
          padding: 2,
          overflowY: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#121212' : '#f5f5f5',
          transition: 'margin-left 0.3s ease',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default MainLayout
