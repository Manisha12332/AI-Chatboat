import React from 'react'
import { Box, Typography, AppBar, Toolbar, IconButton, Avatar, keyframes } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SmartToyIcon from '@mui/icons-material/SmartToy'

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`

const ChatHeader = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        <IconButton 
          edge="start" 
          sx={{ 
            mr: 1,
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'translateX(-3px)',
            },
          }}
        >
          <ArrowBackIcon sx={{ color: 'text.primary' }} />
        </IconButton>

        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: 'primary.main',
            mr: 1.5,
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        >
          <SmartToyIcon sx={{ fontSize: 24 }} />
        </Avatar>

        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
            Dr. Nightingale AI
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                animation: `${pulse} 2s ease-in-out infinite`,
              }}
            />
            <Typography variant="caption" sx={{ color: 'primary.main' }}>
              Online
            </Typography>
          </Box>
        </Box>

        <IconButton
          sx={{
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'rotate(90deg)',
            },
          }}
        >
          <MoreVertIcon sx={{ color: 'text.primary' }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default ChatHeader
