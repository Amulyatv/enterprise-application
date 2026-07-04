import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Typography, CircularProgress } from '@mui/material'
import { fetchVendors } from '@store/slices/vendorSlice'
import DataTable from '@components/common/DataTable'
import Modal from '@components/common/Modal'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'

const Vendors = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { vendors, loading } = useSelector((state) => state.vendor)
  const [openCreateModal, setOpenCreateModal] = useState(false)

  useEffect(() => {
    dispatch(fetchVendors())
  }, [dispatch])

  const columns = [
    { key: 'name', label: 'Vendor Name' },
    { key: 'category', label: 'Category' },
    { key: 'status', label: 'Status' },
    { key: 'riskLevel', label: 'Risk Level' },
    { key: 'complianceStatus', label: 'Compliance' },
    { key: 'lastAudit', label: 'Last Audit' },
  ]

  const handleRowClick = (vendor) => {
    navigate(`/vendors/${vendor.id}`)
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Vendors</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenCreateModal(true)}
        >
          Add Vendor
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataTable
          columns={columns}
          rows={vendors}
          onRowClick={handleRowClick}
          exportable
          selectable
        />
      )}

      <Modal
        open={openCreateModal}
        title="Add New Vendor"
        onClose={() => setOpenCreateModal(false)}
      >
        <Typography>Form for adding new vendor</Typography>
      </Modal>
    </Box>
  )
}

export default Vendors
