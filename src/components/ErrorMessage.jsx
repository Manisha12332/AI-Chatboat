import React from 'react'
import { Box, Typography, Paper } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const ErrorMessage = ({ message }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        px: 2,
        mb: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: '#FFEBEE',
          color: '#D32F2F',
          py: 1,
          px: 2,
          borderRadius: 3,
          border: '1px solid #FFCDD2',
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 18 }} />
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          ERROR: {message}
        </Typography>
      </Paper>
    </Box>
  )
}

export default ErrorMessage
