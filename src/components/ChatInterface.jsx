import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import VibesReport from './VibesReport';
import { VibesButton } from './VibesReport';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: transparent;
  overflow: hidden;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.03;
    z-index: 0;
    background: 
      linear-gradient(45deg, transparent 48%, #64748b 49%, #64748b 51%, transparent 52%) 0 0/60px 60px;
    pointer-events: none;
    animation: subtleFloat 60s linear infinite;
  }

  @keyframes subtleFloat {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 60px 60px;
    }
  }
`;

const Header = styled.header`
  background: ${props => props.theme.secondary};
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid ${props => props.theme.border};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 10;
  justify-content: space-between;
`;

const BotInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const BotEmoji = styled.div`
  font-size: 1.75rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
`;

const BotName = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.text};
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  position: relative;
  z-index: 1;
  background: transparent;

  /* Restore scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.border};
    border-radius: 3px;
  }

  /* Smooth scrolling */
  scroll-behavior: smooth;
`;

const MessageGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Message = styled(motion.div)`
  max-width: 80%;
  padding: 1rem 1.25rem;
  border-radius: 20px;
  font-size: 1rem;
    line-height: 1.5;
    position: relative;
    white-space: pre-wrap;
    
    ${props => props.$isBot ? `
      align-self: flex-start;
      background: ${props.theme.secondary};
      color: ${props.theme.text};
      border-bottom-left-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border: 1px solid ${props.theme.border};
  ` : `
    align-self: flex-end;
    background: ${props.$gradient || 'linear-gradient(135deg, #6366f1, #4f46e5)'};
    color: white;
    border-bottom-right-radius: 4px;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.25);
  `}

  @media (max-width: 640px) {
    max-width: 90%;
  }

  code {
    font-family: monospace;
    background: ${props => props.theme.primary}dd;
    padding: 0.2em 0.4em;
    border-radius: 4px;
  }
`;

const InputArea = styled.div`
  padding: 1rem;
  background: ${props => props.theme.secondary};
  border-top: 1px solid ${props => props.theme.border};
  display: flex;
  gap: 0.75rem;
  position: sticky;
  bottom: 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  flex: 1;
  padding: 0.875rem 1.25rem;
  border: 2px solid ${props => props.theme.border};
  border-radius: 16px;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s ease;
  background: ${props => props.theme.primary};
  color: ${props => props.theme.text};
  
  &:focus {
    border-color: ${props => props.theme.accent};
    box-shadow: 0 0 0 3px ${props => props.theme.hover};
  }

  &::placeholder {
    color: ${props => props.theme.textSecondary};
  }
`;

const SendButton = styled(motion.button)`
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  border: none;
  border-radius: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.25);
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const TypingIndicator = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: ${props => props.theme.secondary};
  border-radius: 16px;
  width: fit-content;
  color: ${props => props.theme.textSecondary};
  font-size: 0.875rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
`;

const Dot = styled(motion.span)`
  width: 4px;
  height: 4px;
  background: #64748b;
  border-radius: 50%;
`;

const ChatInterface = ({
  botName,
  botEmoji,
  onSendMessage,
  gradient,
  messages = [],
  chatHistory = {},
  personalityId,
  onMessagesUpdate  // Add this prop
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showVibesReport, setShowVibesReport] = useState(false);
  const chatAreaRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!inputValue.trim() || isTyping) return;
  
    const message = inputValue.trim();
    setInputValue('');
    setIsTyping(true);
  
    try {
      const response = await onSendMessage(message);
      // Use the passed onMessagesUpdate prop correctly
      if (typeof onMessagesUpdate === 'function') {
        onMessagesUpdate([
          ...messages,
          { role: 'user', content: message },
          { role: 'assistant', content: response }
        ]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      if (typeof onMessagesUpdate === 'function') {
        onMessagesUpdate([
          ...messages,
          { role: 'user', content: message },
          { role: 'assistant', content: "I'm having trouble processing your request." }
        ]);
      }
    } finally {
      setIsTyping(false);
    }
  };

  const renderMessage = (message) => (
    <Message
      $isBot={message.role === 'assistant'}
      $gradient={gradient}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {message.content}
      </ReactMarkdown>
    </Message>
  );

  // Calculate if we have enough data for the vibes report
  const MIN_MESSAGES_REQUIRED = 10;
  const MIN_BOTS_INTERACTED = 5;
  const hasEnoughData = Object.values(chatHistory || {}).reduce((acc, messages) => {
    if (Array.isArray(messages) && messages.length >= MIN_MESSAGES_REQUIRED) {
      return acc + 1;
    }
    return acc;
  }, 0) >= MIN_BOTS_INTERACTED;

  return (
    <ChatContainer>
      <Header>
        <BotInfo>
          <BotEmoji>{botEmoji}</BotEmoji>
          <BotName>{botName}</BotName>
        </BotInfo>
        <VibesButton
          onClick={() => setShowVibesReport(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ opacity: hasEnoughData ? 1 : 0.5 }}
          title={hasEnoughData ?
            "View your Personality Vibes Report" :
            "Chat more with the bots to unlock your Personality Vibes Report"
          }
        >
          <span>✨</span>
          Vibes Report
        </VibesButton>
      </Header>

      <VibesReport
        chatHistory={chatHistory}
        isOpen={showVibesReport}
        onClose={() => setShowVibesReport(false)}
      />

      <MessagesContainer ref={chatAreaRef}>
        <AnimatePresence>
          {messages.map((msg, index) => (
            <MessageGroup key={index}>
              <Message
                $isBot={msg.role === 'assistant'}
                $gradient={gradient}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.content}
                </ReactMarkdown>
              </Message>
            </MessageGroup>
          ))}

          {isTyping && (
            <TypingIndicator
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <BotEmoji style={{ fontSize: '1rem' }}>{botEmoji}</BotEmoji>
              <span>typing</span>
              {[0, 1, 2].map((i) => (
                <Dot
                  key={i}
                  initial={{ y: 0 }}
                  animate={{ y: [-2, 2, -2] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                >
                  .
                </Dot>
              ))}
            </TypingIndicator>
          )}
        </AnimatePresence>
      </MessagesContainer>

      <InputArea>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          ref={inputRef}
        />
        <SendButton
          onClick={handleSubmit}
          disabled={!inputValue.trim() || isTyping}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Send
        </SendButton>
      </InputArea>

      <AnimatePresence>
        {showVibesReport && (
          <VibesReport
            messages={chatHistory[personalityId] || []}
            onClose={() => setShowVibesReport(false)}
          />
        )}
      </AnimatePresence>
    </ChatContainer>
  );
};

export default ChatInterface;