import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, Paper, Typography, CircularProgress } from '@mui/material'
import { fetchDashboardData } from '@store/slices/dashboardSlice'
import KPICard from '@components/common/KPICard'
import {
  Dashboard as DashboardIcon,
  ShoppingCart as ProcurementIcon,
  Warning as RiskIcon,
  CheckCircle as ComplianceIcon,
} from '@mui/icons-material'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { kpis, charts, loading } = useSelector((state) => state.dashboard)

  useEffect(() => {
    dispatch(fetchDashboardData())
  }, [dispatch])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Dashboard
      </Typography>

      {/* KPI Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="Total Requests"
            value={kpis.totalRequests}
            icon={DashboardIcon}
            color="primary"
            trend="up"
            trendValue="+12%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="Pending Requests"
            value={kpis.pendingRequests}
            icon={ProcurementIcon}
            color="warning"
            trend="down"
            trendValue="-5%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="Active Risks"
            value={kpis.risks}
            icon={RiskIcon}
            color="error"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="Compliance Issues"
            value={kpis.complianceIssues}
            icon={ComplianceIcon}
            color="success"
          />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Monthly Trend
            </Typography>
            <Box sx={{ height: 300, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="body2" color="textSecondary" sx={{ p: 2 }}>
                Chart placeholder - Connect to your charting library
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Risk Distribution
            </Typography>
            <Box sx={{ height: 300, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="body2" color="textSecondary" sx={{ p: 2 }}>
                Chart placeholder - Connect to your charting library
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard
