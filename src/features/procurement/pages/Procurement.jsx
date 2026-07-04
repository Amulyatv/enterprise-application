import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Typography, CircularProgress } from '@mui/material'
import { fetchProcurementRequests } from '@store/slices/procurementSlice'
import DataTable from '@components/common/DataTable'
import Modal from '@components/common/Modal'
import AddIcon from '@mui/icons-material/Add'

const Procurement = () => {
  const dispatch = useDispatch()
  const { requests, loading } = useSelector((state) => state.procurement)
  const [openCreateModal, setOpenCreateModal] = useState(false)

  useEffect(() => {
    dispatch(fetchProcurementRequests())
  }, [dispatch])

  const columns = [
    { key: 'id', label: 'Request ID' },
    { key: 'title', label: 'Title' },
    { key: 'requester', label: 'Requester' },
    { key: 'status', label: 'Status' },
    { key: 'amount', label: 'Amount', render: (value) => `$${value.toLocaleString()}` },
    { key: 'createdDate', label: 'Created Date' },
  ]

  const handleCreateRequest = () => {
    // Implement create logic
    setOpenCreateModal(false)
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Procurement Requests</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenCreateModal(true)}
        >
          New Request
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataTable
          columns={columns}
          rows={requests}
          exportable
          selectable
        />
      )}

      <Modal
        open={openCreateModal}
        title="Create Procurement Request"
        onClose={() => setOpenCreateModal(false)}
        onConfirm={handleCreateRequest}
      >
        <Typography>Form for creating new procurement request</Typography>
      </Modal>
    </Box>
  )
}

export default Procurement
