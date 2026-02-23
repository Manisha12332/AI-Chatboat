import React from 'react'
import { Box, Avatar, keyframes } from '@mui/material'
import SmartToyIcon from '@mui/icons-material/SmartToy'

const bounce = keyframes`
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-4px);
  }
`

const fadeInSlide = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`

const ThinkingIndicator = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        px: 2,
        py: 0.5,
        gap: 1,
        animation: `${fadeInSlide} 0.3s ease-out`,
      }}
    >
      {/* Avatar */}
      <Avatar
        sx={{
          width: 36,
          height: 36,
          bgcolor: 'primary.main',
          flexShrink: 0,
          animation: `${pulse} 2s ease-in-out infinite`,
        }}
      >
        <SmartToyIcon sx={{ fontSize: 20 }} />
      </Avatar>

      {/* Thinking Dots */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          bgcolor: 'background.paper',
          p: 1.5,
          borderRadius: 2,
          borderTopLeftRadius: 0,
          boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
        }}
      >
        {[0, 1, 2].map((index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              animation: `${bounce} 1.4s ease-in-out infinite`,
              animationDelay: `${index * 0.2}s`,
            }}
          />
        ))}
      </Box>
    </Box>
  )
}

export default ThinkingIndicator
