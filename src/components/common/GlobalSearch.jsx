import { TextField, InputAdornment, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useState, useCallback } from 'react'

const GlobalSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = useCallback((value) => {
    setSearchTerm(value)
    // Implement search logic here
    console.log('Search:', value)
  }, [])

  return (
    <Box sx={{ width: '100%', maxWidth: 400 }}>
      <TextField
        fullWidth
        size="small"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderRadius: 1,
          '& .MuiOutlinedInput-root': {
            color: '#fff',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
          },
          '& .MuiOutlinedInput-input::placeholder': {
            color: 'rgba(255, 255, 255, 0.7)',
            opacity: 1,
          },
        }}
      />
    </Box>
  )
}

export default GlobalSearch
