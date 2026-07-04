import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'

const KPICard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  loading = false,
  color = 'primary',
}) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <Box>
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <Typography variant="h5" sx={{ fontWeight: 'bold', my: 1 }}>
                {value}
              </Typography>
            )}
            {trend && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {trend === 'up' ? (
                  <TrendingUpIcon sx={{ color: 'success.main', fontSize: 18 }} />
                ) : (
                  <TrendingDownIcon sx={{ color: 'error.main', fontSize: 18 }} />
                )}
                <Typography variant="body2" color={trend === 'up' ? 'success.main' : 'error.main'}>
                  {trendValue}
                </Typography>
              </Box>
            )}
          </Box>
          {Icon && <Icon sx={{ fontSize: 40, color: `${color}.main`, opacity: 0.3 }} />}
        </Box>
      </CardContent>
    </Card>
  )
}

export default KPICard
