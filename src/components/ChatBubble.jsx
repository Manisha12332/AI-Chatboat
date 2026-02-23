import React from 'react'
import { Box, Typography, Avatar, Paper, keyframes } from '@mui/material'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import PersonIcon from '@mui/icons-material/Person'

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const ChatBubble = ({ message, isBot, timestamp, attachments = [] }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isBot ? 'row' : 'row-reverse',
        alignItems: 'flex-start',
        px: 2,
        py: 0.5,
        gap: 1,
        animation: `${isBot ? slideInLeft : slideInRight} 0.3s ease-out`,
      }}
    >
      {/* Avatar */}
      <Avatar
        sx={{
          width: 36,
          height: 36,
          bgcolor: isBot ? 'primary.main' : 'secondary.light',
          flexShrink: 0,
          transition: 'transform 0.2s ease',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        }}
      >
        {isBot ? (
          <SmartToyIcon sx={{ fontSize: 20 }} />
        ) : (
          <PersonIcon sx={{ fontSize: 20 }} />
        )}
      </Avatar>

      {/* Message Bubble */}
      <Paper
        elevation={0}
        sx={{
          maxWidth: '70%',
          p: 1.5,
          borderRadius: 2,
          bgcolor: isBot ? 'background.paper' : 'primary.main',
          color: isBot ? 'text.primary' : 'primary.contrastText',
          borderTopLeftRadius: isBot ? 0 : 16,
          borderTopRightRadius: isBot ? 16 : 0,
          boxShadow: isBot
            ? '0 1px 2px rgba(0,0,0,0.08)'
            : '0 1px 2px rgba(0,0,0,0.12)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: isBot
              ? '0 4px 12px rgba(0,0,0,0.1)'
              : '0 4px 12px rgba(0,0,0,0.15)',
          },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            lineHeight: 1.5,
          }}
        >
          {message}
        </Typography>

        {/* Attachments */}
        {attachments && attachments.length > 0 && (
          <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {attachments.map((attachment, index) => (
              <Box
                key={index}
                sx={{
                  bgcolor: isBot ? 'grey.100' : 'rgba(255,255,255,0.2)',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: '0.75rem',
                }}
              >
                📎 {attachment.name || `Attachment ${index + 1}`}
              </Box>
            ))}
          </Box>
        )}

        {/* Timestamp */}
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mt: 0.5,
            textAlign: isBot ? 'left' : 'right',
            color: isBot ? 'text.secondary' : 'rgba(255,255,255,0.7)',
            fontSize: '0.65rem',
          }}
        >
          {timestamp}
        </Typography>
      </Paper>
    </Box>
  )
}

export default ChatBubble
