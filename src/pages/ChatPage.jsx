import React, { useState, useRef, useEffect } from 'react'
import { Box, Container } from '@mui/material'
import ChatBubble from '../components/ChatBubble'
import ChatInput from '../components/ChatInput'
import ChatHeader from '../components/ChatHeader'
import ThinkingIndicator from '../components/ThinkingIndicator'
import ErrorMessage from '../components/ErrorMessage'

const ChatPage = ({ initialMessages = [], onMessagesChange }) => {
  const [messages, setMessages] = useState(initialMessages)
  const [isThinking, setIsThinking] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isThinking])

  useEffect(() => {
    if (onMessagesChange) {
      onMessagesChange(messages)
    }
  }, [messages, onMessagesChange])

  const handleSendMessage = (text, attachments = []) => {
    const newMessage = {
      id: messages.length + 1,
      text,
      isBot: false,
      attachments,
      timestamp: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }

    setMessages((prev) => [...prev, newMessage])
    setIsThinking(true)
    setError(null)

    // Simulate AI response
    setTimeout(() => {
      setIsThinking(false)
      const aiResponse = {
        id: messages.length + 2,
        text: attachments.length > 0 
          ? "I've received your file(s). Let me analyze them for you.\n\nBased on what I can see, I'll provide relevant medical guidance. Please note that for accurate diagnosis, always consult with a healthcare professional in person."
          : "I understand you're not feeling well. For nausea and flu symptoms, here are some suggestions:\n\n1. 💧 Stay hydrated - drink plenty of water, herbal tea, or clear broths\n2. 🛏️ Get adequate rest to help your body recover\n3. 🍯 Try ginger tea or honey lemon water for nausea\n4. 🌡️ Monitor your temperature\n\nIf symptoms persist for more than 3 days or worsen, please consult a healthcare professional. Is there anything specific you'd like to know more about?",
        isBot: true,
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 2000)
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: 'background.default',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <ChatHeader />

      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          py: 2,
          display: 'flex',
          flexDirection: 'column',
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            width: 6,
          },
          '&::-webkit-scrollbar-track': {
            bgcolor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'divider',
            borderRadius: 3,
            '&:hover': {
              bgcolor: 'text.disabled',
            },
          },
        }}
      >
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message.text}
            isBot={message.isBot}
            timestamp={message.timestamp}
            attachments={message.attachments}
          />
        ))}

        {isThinking && <ThinkingIndicator />}

        {error && <ErrorMessage message={error} />}

        <div ref={messagesEndRef} />
      </Box>

      {/* Input Area */}
      <ChatInput onSendMessage={handleSendMessage} disabled={isThinking} />
    </Box>
  )
}

export default ChatPage
