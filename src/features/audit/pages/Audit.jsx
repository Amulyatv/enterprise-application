import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Paper, Typography, CircularProgress, Chip } from '@mui/material'
import { fetchAuditLogs } from '@store/slices/auditSlice'
import DataTable from '@components/common/DataTable'

const Audit = () => {
  const dispatch = useDispatch()
  const { auditLogs, loading } = useSelector((state) => state.audit)

  useEffect(() => {
    dispatch(fetchAuditLogs())
  }, [dispatch])

  const columns = [
    { key: 'user', label: 'User' },
    { key: 'action', label: 'Action' },
    { key: 'resource', label: 'Resource' },
    { key: 'timestamp', label: 'Timestamp' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <Chip
          label={value}
          color={value === 'success' ? 'success' : 'error'}
          size="small"
        />
      ),
    },
  ]

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Audit Logs
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataTable columns={columns} rows={auditLogs} exportable selectable />
      )}
    </Box>
  )
}

export default Audit
