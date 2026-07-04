import { useState, useCallback } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Box,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Button,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

const DataTable = ({
  columns,
  rows,
  loading = false,
  onRowClick,
  onEdit,
  onDelete,
  selectable = false,
  exportable = false,
}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedRows, setSelectedRows] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedRowIndex, setSelectedRowIndex] = useState(null)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(rows.map((_, index) => index))
    } else {
      setSelectedRows([])
    }
  }

  const handleSelectRow = (index) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  const handleMenuOpen = (event, index) => {
    setAnchorEl(event.currentTarget)
    setSelectedRowIndex(index)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedRowIndex(null)
  }

  const handleExport = useCallback(() => {
    const csv = [
      columns.map((col) => col.label).join(',')
    ]
    rows.forEach((row) => {
      csv.push(columns.map((col) => row[col.key]).join(','))
    })
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv.join('\n')))
    element.setAttribute('download', 'data.csv')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }, [columns, rows])

  const displayedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Box>
      {exportable && (
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            onClick={handleExport}
          >
            Export
          </Button>
        </Box>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: (theme) => theme.palette.grey[100] }}>
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selectedRows.length > 0 && selectedRows.length < rows.length
                    }
                    checked={selectedRows.length === rows.length && rows.length > 0}
                    onChange={handleSelectAll}
                  />
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell key={column.key} align={column.align || 'left'}>
                  {column.label}
                </TableCell>
              ))}
              {(onEdit || onDelete) && <TableCell align="center">Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row, index) => (
              <TableRow
                key={index}
                hover
                onClick={() => onRowClick && onRowClick(row)}
                sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
              >
                {selectable && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRows.includes(page * rowsPerPage + index)}
                      onChange={() => handleSelectRow(page * rowsPerPage + index)}
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell key={column.key} align={column.align || 'left'}>
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </TableCell>
                ))}
                {(onEdit || onDelete) && (
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, index)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={selectedRowIndex === index && Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      {onEdit && (
                        <MenuItem
                          onClick={() => {
                            onEdit(displayedRows[selectedRowIndex])
                            handleMenuClose()
                          }}
                        >
                          Edit
                        </MenuItem>
                      )}
                      {onDelete && (
                        <MenuItem
                          onClick={() => {
                            onDelete(displayedRows[selectedRowIndex])
                            handleMenuClose()
                          }}
                        >
                          Delete
                        </MenuItem>
                      )}
                    </Menu>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  )
}

export default DataTable
