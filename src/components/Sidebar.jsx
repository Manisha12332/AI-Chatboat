import React from 'react'
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  Tooltip,
} from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import HistoryIcon from '@mui/icons-material/History'
import SettingsIcon from '@mui/icons-material/Settings'
import AddIcon from '@mui/icons-material/Add'
import SmartToyIcon from '@mui/icons-material/SmartToy'

const Sidebar = ({ onNewChat, chatHistory = [], activeChatId, onSelectChat }) => {
  return (
    <Box
      sx={{
        width: 80,
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 2,
        height: '100%',
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          bgcolor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
        }}
      >
        <SmartToyIcon sx={{ color: 'white', fontSize: 28 }} />
      </Box>

      {/* History Section - Always visible */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 1,
          width: '100%',
        }}
      >
        <HistoryIcon sx={{ color: 'text.secondary', fontSize: 20, mb: 0.5 }} />
        <Typography
          variant="caption"
          sx={{
            fontSize: '0.6rem',
            color: 'text.secondary',
          }}
        >
          History
        </Typography>
      </Box>
      
      {/* History Items */}
      <Box
        sx={{
          flex: 1,
          width: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            width: 4,
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'divider',
            borderRadius: 2,
          },
        }}
      >
        {chatHistory.length === 0 ? (
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              textAlign: 'center',
              color: 'text.disabled',
              fontSize: '0.55rem',
              mt: 2,
              px: 1,
            }}
          >
            No history yet
          </Typography>
        ) : (
          chatHistory.map((chat) => (
            <Tooltip key={chat.id} title={chat.title} placement="right">
              <Box
                onClick={() => onSelectChat(chat.id)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  py: 1,
                  px: 0.5,
                  cursor: 'pointer',
                  bgcolor: activeChatId === chat.id ? 'action.selected' : 'transparent',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: '0.6rem',
                    color: activeChatId === chat.id ? 'primary.main' : 'text.primary',
                    fontWeight: activeChatId === chat.id ? 600 : 400,
                    maxWidth: 70,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                  }}
                >
                  {chat.title}
                </Typography>
              </Box>
            </Tooltip>
          ))
        )}
      </Box>

      <Divider sx={{ width: '80%', my: 1 }} />

      {/* Chat Icon */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 1.5,
          cursor: 'pointer',
          '&:hover': {
            bgcolor: 'action.hover',
          },
          width: '100%',
        }}
      >
        <ChatIcon sx={{ color: 'primary.main', mb: 0.5 }} />
        <Typography
          variant="caption"
          sx={{
            fontSize: '0.65rem',
            color: 'primary.main',
            fontWeight: 600,
          }}
        >
          Chat
        </Typography>
      </Box>

      {/* New Chat Button */}
      <IconButton
        onClick={onNewChat}
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
          width: 40,
          height: 40,
          mb: 2,
        }}
      >
        <AddIcon />
      </IconButton>

      {/* Settings */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          py: 1,
          '&:hover': {
            bgcolor: 'action.hover',
          },
          borderRadius: 1,
          width: '100%',
        }}
      >
        <SettingsIcon sx={{ color: 'text.secondary', mb: 0.5 }} />
        <Typography
          variant="caption"
          sx={{
            fontSize: '0.65rem',
            color: 'text.secondary',
          }}
        >
          Settings
        </Typography>
      </Box>
    </Box>
  )
}

export default Sidebar
