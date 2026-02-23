import React, { useState, useRef } from 'react'
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Chip,
  Typography,
  keyframes,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import MicIcon from '@mui/icons-material/Mic'
import CloseIcon from '@mui/icons-material/Close'
import ImageIcon from '@mui/icons-material/Image'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'

const sendPulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
`

const ChatInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('')
  const [attachments, setAttachments] = useState([])
  const [isSending, setIsSending] = useState(false)
  const fileInputRef = useRef(null)

  const handleSend = () => {
    if ((message.trim() || attachments.length > 0) && !disabled) {
      setIsSending(true)
      setTimeout(() => setIsSending(false), 200)
      onSendMessage(message.trim(), attachments)
      setMessage('')
      setAttachments([])
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleAttachClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    const newAttachments = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      type: file.type,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
    }))
    setAttachments((prev) => [...prev, ...newAttachments])
    e.target.value = '' // Reset input
  }

  const removeAttachment = (id) => {
    setAttachments((prev) => {
      const attachment = prev.find((a) => a.id === id)
      if (attachment?.preview) {
        URL.revokeObjectURL(attachment.preview)
      }
      return prev.filter((a) => a.id !== id)
    })
  }

  const isImage = (type) => type?.startsWith('image/')

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      {/* Attachment Preview */}
      {attachments.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            mb: 1.5,
            p: 1,
            bgcolor: '#F5F7FA',
            borderRadius: 2,
          }}
        >
          {attachments.map((attachment) => (
            <Box
              key={attachment.id}
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                bgcolor: 'white',
                borderRadius: 1.5,
                p: 0.75,
                pr: 3,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              {attachment.preview ? (
                <Box
                  component="img"
                  src={attachment.preview}
                  alt={attachment.name}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    bgcolor: 'primary.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <InsertDriveFileIcon sx={{ color: 'white', fontSize: 20 }} />
                </Box>
              )}
              <Typography
                variant="caption"
                sx={{
                  maxWidth: 100,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {attachment.name}
              </Typography>
              <IconButton
                size="small"
                onClick={() => removeAttachment(attachment.id)}
                sx={{
                  position: 'absolute',
                  top: -6,
                  right: -6,
                  width: 20,
                  height: 20,
                  bgcolor: 'error.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'error.dark' },
                }}
              >
                <CloseIcon sx={{ fontSize: 12 }} />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        multiple
        accept="image/*,.pdf,.doc,.docx,.txt,.xls,.xlsx"
      />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: '#F5F7FA',
          borderRadius: 3,
          px: 2,
          py: 0.5,
        }}
      >
        <IconButton size="small" color="default" onClick={handleAttachClick}>
          <AttachFileIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
        </IconButton>

        <TextField
          fullWidth
          variant="standard"
          placeholder="Type to start chatting..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          InputProps={{
            disableUnderline: true,
            sx: {
              fontSize: '0.95rem',
            },
          }}
          sx={{
            '& .MuiInputBase-root': {
              py: 1,
            },
          }}
        />

        <IconButton size="small" color="default">
          <MicIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
        </IconButton>

        <IconButton
          size="small"
          onClick={handleSend}
          disabled={(!message.trim() && attachments.length === 0) || disabled}
          sx={{
            bgcolor: (message.trim() || attachments.length > 0) ? 'primary.main' : 'transparent',
            color: (message.trim() || attachments.length > 0) ? 'white' : 'text.secondary',
            transition: 'all 0.2s ease-in-out',
            transform: (message.trim() || attachments.length > 0) ? 'scale(1)' : 'scale(0.9)',
            animation: isSending ? `${sendPulse} 0.2s ease-out` : 'none',
            '&:hover': {
              bgcolor: (message.trim() || attachments.length > 0) ? 'primary.dark' : 'transparent',
              transform: (message.trim() || attachments.length > 0) ? 'scale(1.1)' : 'scale(0.9)',
            },
            '&:active': {
              transform: 'scale(0.95)',
            },
            '&.Mui-disabled': {
              bgcolor: 'transparent',
              color: 'text.disabled',
            },
          }}
        >
          <SendIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
    </Paper>
  )
}

export default ChatInput
