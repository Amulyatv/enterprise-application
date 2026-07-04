import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  ShoppingCart as ProcurementIcon,
  Business as VendorIcon,
  Warning as RiskIcon,
  CheckCircle as ComplianceIcon,
  Audit as AuditIcon,
  BarChart as ReportIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSidebarCollapsed } from '@store/slices/uiSlice'

const DRAWER_WIDTH = 280
const DRAWER_WIDTH_COLLAPSED = 70

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const dispatch = useDispatch()
  const { sidebarCollapsed } = useSelector((state) => state.ui)
  const [expandedItems, setExpandedItems] = useState({})

  const menuItems = useMemo(
    () => [
      { label: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
      { label: 'Procurement', icon: ProcurementIcon, path: '/procurement' },
      { label: 'Vendors', icon: VendorIcon, path: '/vendors' },
      { label: 'Risk', icon: RiskIcon, path: '/risk' },
      { label: 'Compliance', icon: ComplianceIcon, path: '/compliance' },
      { label: 'Audit', icon: AuditIcon, path: '/audit' },
      { label: 'Reports', icon: ReportIcon, path: '/reports' },
      { label: 'Settings', icon: SettingsIcon, path: '/settings' },
    ],
    []
  )

  const handleNavigate = (path) => {
    navigate(path)
  }

  const isActive = (path) => {
    return location.pathname.startsWith(path)
  }

  const toggleExpand = (label) => {
    setExpandedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarCollapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarCollapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease',
          backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#fafafa',
          borderRight: `1px solid ${theme.palette.divider}`,
          marginTop: '64px',
          height: 'calc(100vh - 64px)',
          overflowX: 'hidden',
        },
      }}
    >
      <Box sx={{ mt: 2 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => handleNavigate(item.path)}
                selected={isActive(item.path)}
                sx={{
                  minHeight: 48,
                  justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                  px: 2.5,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.main,
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: sidebarCollapsed ? 0 : 2,
                    justifyContent: 'center',
                  }}
                >
                  <item.icon />
                </ListItemIcon>
                {!sidebarCollapsed && <ListItemText primary={item.label} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}

export default Sidebar
