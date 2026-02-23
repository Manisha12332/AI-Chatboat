import React, { useState, useCallback } from 'react'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import Sidebar from './components/Sidebar'
import ChatPage from './pages/ChatPage'

const createWelcomeMessage = () => ({
  id: 1,
  text: "Hello! 👋 I am Dr. Nightingale AI, and I'm here to assist you with your medical & healthcare needs. 🏥👨‍⚕️\n\nHow can I help you today? 📋",
  isBot: true,
  timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
})

function App() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [chatHistory, setChatHistory] = useState([])
  const [currentMessages, setCurrentMessages] = useState([createWelcomeMessage()])
  const [activeChatId, setActiveChatId] = useState(null)
  const [chatKey, setChatKey] = useState(0)
  const getChatTitle = (messages) => {
    const firstUserMessage = messages.find(m => !m.isBot)
    if (firstUserMessage) {
      const text = firstUserMessage.text.replace(/\n/g, ' ').trim()
      return text.length > 20 ? text.slice(0, 20) + '...' : text
    }
    return 'New Chat'
  }

  const handleNewChat = useCallback(() => {
    // Save current chat to history if it has more than just the welcome message
    if (currentMessages.length > 1) {
      const newHistoryItem = {
        id: Date.now(),
        title: getChatTitle(currentMessages),
        messages: [...currentMessages],
      }
      setChatHistory(prev => [newHistoryItem, ...prev])
    }
    
    // Start fresh chat
    setCurrentMessages([createWelcomeMessage()])
    setActiveChatId(null)
    setChatKey(prev => prev + 1)
  }, [currentMessages])

  const handleSelectChat = useCallback((chatId) => {
    // Save current chat if it has content and isn't already in history
    if (currentMessages.length > 1 && activeChatId === null) {
      const newHistoryItem = {
        id: Date.now(),
        title: getChatTitle(currentMessages),
        messages: [...currentMessages],
      }
      setChatHistory(prev => [newHistoryItem, ...prev])
    }

    // Load selected chat
    const selectedChat = chatHistory.find(chat => chat.id === chatId)
    if (selectedChat) {
      setCurrentMessages([...selectedChat.messages])
      setActiveChatId(chatId)
      setChatKey(prev => prev + 1)
    }
  }, [chatHistory, currentMessages, activeChatId])

  const handleMessagesChange = useCallback((messages) => {
    setCurrentMessages(messages)
    
    // Update history if viewing a saved chat
    if (activeChatId !== null) {
      setChatHistory(prev => prev.map(chat => 
        chat.id === activeChatId 
          ? { ...chat, messages: [...messages] }
          : chat
      ))
    }
  }, [activeChatId])

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      {/* Sidebar - hidden on mobile */}
      {!isMobile && (
        <Sidebar 
          onNewChat={handleNewChat} 
          chatHistory={chatHistory}
          activeChatId={activeChatId}
          onSelectChat={handleSelectChat}
        />
      )}

      {/* Main Chat Area */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <ChatPage 
          key={chatKey} 
          initialMessages={currentMessages}
          onMessagesChange={handleMessagesChange}
        />
      </Box>
    </Box>
  )
}

export default App
