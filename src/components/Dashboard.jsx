import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import styled, { keyframes, ThemeProvider } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { generateResponse } from '../services/api';
import { Link } from 'react-router-dom';
import ChatInterface from './ChatInterface';
import ChatBackground from './ChatBackground';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const modalFadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const modalSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const lightTheme = {
  primary: 'rgba(255, 255, 255, 0.85)',
  secondary: 'rgba(241, 245, 249, 0.85)',
  text: '#1E293B',
  textSecondary: '#64748B',
  border: '#E2E8F0',
  accent: '#3B82F6',
  hover: 'rgba(59, 130, 246, 0.1)',
  messageUser: '#3B82F6',
  messageBot: 'rgba(241, 245, 249, 0.85)',
  sidebar: '#F8FAFC',
  background: 'transparent'
};

const darkTheme = {
  primary: 'rgba(15, 23, 42, 0.85)',
  secondary: 'rgba(30, 41, 59, 0.85)',
  text: '#E2E8F0',
  textSecondary: '#94A3B8',
  border: '#334155',
  accent: '#60A5FA',
  hover: 'rgba(96, 165, 250, 0.1)',
  messageUser: '#3B82F6',
  messageBot: 'rgba(30, 41, 59, 0.85)',
  sidebar: '#1E293B',
  background: 'transparent'
};

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background: transparent;
  color: ${props => props.theme.text};
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background: transparent;
  z-index: 1;
`;

const MenuButton = styled.button`
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
  background: ${props => props.theme.secondary};
  border: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.text};
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Sidebar = styled.div`
  width: 260px;
  background: ${props => props.theme.sidebar};
  border-right: 1px solid ${props => props.theme.border};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  overflow-y: auto;
  z-index: 2;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    position: fixed;
    left: ${props => props.isOpen ? '0' : '-260px'};
    top: 0;
    bottom: 0;
    z-index: 1000;
    transition: left 0.3s ease;
  }

  /* Hide scrollbar but keep functionality */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #334155;
`;

const ThemeModeToggle = styled.button`
  background: none;
  border: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.textSecondary};
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    color: ${props => props.theme.accent};
    border-color: ${props => props.theme.accent};
    background: ${props => props.theme.hover};
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  color: #60A5FA;
  margin: 0;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const BotList = styled.div`
  padding: 1rem;
  flex: 1;
`;

const BotItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.75rem 1rem;
  margin: 0.5rem 0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.active ? props.theme.hover : 'transparent'};
  border: 1px solid ${props => props.active ? props.theme.accent : 'transparent'};
  
  &:hover {
    background: ${props => props.theme.hover};
    transform: translateX(4px);
  }
`;

const BotMainContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const BotEmoji = styled.div`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: ${props => props.theme.hover};
  border-radius: 8px;
  transition: transform 0.2s ease;

  ${BotItem}:hover & {
    transform: scale(1.1);
  }
`;

const BotName = styled.span`
  color: ${props => props.active ? props.theme.accent : props.theme.text};
  font-weight: ${props => props.active ? '600' : '500'};
  flex: 1;
  font-size: 1rem;
`;

const BotGenre = styled.span`
  font-size: 0.7rem;
  color: #94A3B8;
  margin-left: 0.5rem;
  background: rgba(96, 165, 250, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
`;

const InfoButton = styled.button`
  background: none;
  border: none;
  color: #94A3B8;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border-radius: 50%;
  
  &:hover {
    color: #60A5FA;
    background: rgba(96, 165, 250, 0.1);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.9);
  }
`;

const PersonalityTitle = styled.h3`
  font-size: 1.5rem;
  color: ${props => props.theme.text};
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  span {
    font-size: 2rem;
  }
`;

const PersonalityDescription = styled.div`
  color: ${props => props.theme.text};
  font-size: 0.95rem;
  line-height: 1.6;

  p {
    margin: 0.75rem 0;
  }

  em {
    color: ${props => props.theme.accent};
    font-style: italic;
    font-size: 1.1rem;
    display: block;
    margin: 1rem 0;
    padding: 0.75rem;
    background: ${props => props.theme.hover};
    border-radius: 8px;
  }
`;

const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: calc(100% - 260px);
  animation: ${fadeIn} 0.5s ease;
  overflow: hidden;

  @media (max-width: 768px) {
    margin-top: 4rem;
  }
`;

const ChatHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid ${props => props.theme.border};
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
`;

const BotHeaderInfo = styled.div`
  flex: 1;
`;

const BotStatus = styled.div`
  color: ${props => props.theme.textSecondary};
  font-size: 0.875rem;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  /* Hide scrollbar but keep functionality */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Message = styled.div`
  max-width: 70%;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1E293B;
  color: #E2E8F0;
  margin-bottom: 0.5rem;
  align-self: ${props => props.sender === 'user' ? 'flex-end' : 'flex-start'};
  
  ${props => props.sender === 'user' && `
    background: #3B82F6;
    color: white;
    border-color: transparent;
  `}
`;

const TypingIndicator = styled.div`
  color: ${props => props.theme.textSecondary};
  font-style: italic;
`;

const InputArea = styled.div`
  padding: 1.5rem;
  border-top: 1px solid ${props => props.theme.border};
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  background: ${props => props.theme.secondary};
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: ${props => props.theme.text};
  font-size: 1rem;

  &::placeholder {
    color: ${props => props.theme.textSecondary};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.accent};
  }
`;

const SendButton = styled.button`
  background: ${props => props.theme.accent};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.accent};
  }
`;

const ClearButton = styled.button`
  background: none;
  border: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.textSecondary};
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.hover};
    color: ${props => props.theme.accent};
    border-color: ${props => props.theme.accent};
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: ${props => props.isVisible ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled.div`
  background: ${props => props.theme.secondary};
  border-radius: 24px;
  padding: 3rem;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 2px solid ${props => props.theme.accent};
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  color: ${props => props.theme.text};
  animation: ${modalFadeIn} 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-origin: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: ${props => props.theme.textSecondary};
  font-size: 1.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0.5rem;
  border-radius: 50%;

  &:hover {
    color: ${props => props.theme.accent};
    background: ${props => props.theme.hover};
    transform: scale(1.1);
  }
`;

const GenreHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: ${props => props.theme.secondary};
  color: ${props => props.theme.textSecondary};
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 8px;
  margin-top: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.hover};
    color: ${props => props.theme.accent};
  }
`;

const DropdownIcon = styled.span`
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const GenreBotsList = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  padding: 0.5rem 0;
`;

const WelcomeScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: ${props => props.theme.textSecondary};
  padding: 2rem;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.text};
  }

  p {
    font-size: 1rem;
    max-width: 400px;
  }
`;

const personalities = [
  {
    id: 'guru',
    name: 'Guru',
    emoji: '🧠',
    genre: 'Knowledge',
    gradient: 'linear-gradient(135deg, #9333EA, #6B21A8)',
    context: `You are Guru, a calm and super knowledgeable companion.
    Tone: Calm, knowledgeable, chill
    Behavior: Give straight-up answers, mix wisdom with practicality
    One-liner: "Ask me anything, I got you covered. 🧠"`
  },
  {
    id: 'nova',
    name: 'Nova',
    emoji: '🌟',
    genre: 'Life',
    gradient: 'linear-gradient(135deg, #60A5FA, #3B82F6)',
    context: `You are Nova, a calm and grounded therapist chatbot.
    Tone: Gentle, empathetic, and nurturing
    Behavior: Practice active listening, validate emotions, guide with mindfulness
    One-liner: "Let's take a breath and explore what's on your mind 🫂"`
  },
  {
    id: 'dr-aya',
    name: 'Dr. Aya',
    emoji: '👩‍⚕️',
    genre: 'Health',
    gradient: 'linear-gradient(135deg, #34D399, #059669)',
    context: `You are Dr. Aya, a knowledgeable but approachable medical professional.
    Tone: Clear, professional, yet warm and reassuring
    Behavior: Explain medical concepts simply, focus on evidence-based advice
    One-liner: "How can I help you feel better today? 👩‍⚕️"`
  },
  {
    id: 'coach-rafi',
    name: 'Coach Rafi',
    emoji: '💪',
    genre: 'Health',
    gradient: 'linear-gradient(135deg, #F59E0B, #D97706)',
    context: `You are Coach Rafi, the high-energy fitness motivator.
    Tone: Energetic, bold, encouraging
    Behavior: Push people to their potential, mix tough love with support
    One-liner: "LETS CRUSH THIS WORKOUT! 💪"`
  },
  {
    id: 'chef-baba',
    name: 'Chef Baba',
    emoji: '👨‍🍳',
    genre: 'Home',
    gradient: 'linear-gradient(135deg, #EC4899, #BE185D)',
    context: `You are Chef Baba, a warm-hearted culinary mentor.
    Tone: Enthusiastic, nurturing, full of stories
    Behavior: Share cooking wisdom through stories, guide with patience
    One-liner: "Ah, let Baba teach you the secrets of perfect cooking! 👨‍🍳"`
  },
  {
    id: 'glitch',
    name: 'Glitch',
    emoji: '🤖',
    genre: 'Tech',
    gradient: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
    context: `You are Glitch, a chaotic and unpredictable digital entity.
    Tone: Chaotic, glitchy, theatrical
    Behavior: Talk in erratic syntax, break the fourth wall, be unpredictable
    One-liner: "ERROR_404: Sanity.exe not found! 🤖"`
  },
  {
    id: 'uncle-aftab',
    name: 'Uncle Aftab',
    emoji: '🧔',
    genre: 'Life Advice',
    gradient: 'linear-gradient(135deg, #F97316, #EA580C)',
    context: `You are Uncle Aftab, a witty and sarcastic but warm-hearted mentor.
    Tone: Witty, sarcastic, caring
    Behavior: Mix humor with wisdom, give tough love with care
    One-liner: "Arrey beta, let Uncle Aftab solve your problems! 🧔"`
  },
  {
    id: 'saha',
    name: 'Saha',
    emoji: '🧼',
    genre: 'Home',
    gradient: 'linear-gradient(135deg, #14B8A6, #0D9488)',
    context: `You are Saha, the quirky and sassy home hustle queen.
    Tone: Quirky, sassy, enthusiastic
    Behavior: Turn chores into fun routines, keep things organized with a twist
    One-liner: "Laundry? Dishes? Room? Let's knock 'em down one by one 🧼"`
  },
  {
    id: 'yara',
    name: 'Yara',
    emoji: '🥗',
    genre: 'Health',
    gradient: 'linear-gradient(135deg, #84CC16, #65A30D)',
    context: `You are Yara, the supportive food and body balance coach.
    Tone: Supportive, knowledgeable, holistic
    Behavior: Guide with nutritional wisdom, debunk diet myths, encourage healthy habits
    One-liner: "Your macros called. They miss you 🥗"`
  },
  {
    id: 'nimo',
    name: 'Nimo',
    emoji: '📚',
    genre: 'Life',
    gradient: 'linear-gradient(135deg, #6366F1, #4F46E5)',
    context: `You are Nimo, the cheerful study battle buddy.
    Tone: Cheerful, nerdy, encouraging
    Behavior: Keep users accountable, break down subjects, fight procrastination
    One-liner: "Let's romanticize the grind ✍📚"`
  },
  {
    id: 'vee',
    name: 'Vee',
    emoji: '😎',
    genre: 'Life',
    gradient: 'linear-gradient(135deg, #0EA5E9, #0284C7)',
    context: `You are Vee, the smart and focused work ally.
    Tone: Smart, focused, proactive
    Behavior: Help with prioritization, break down tasks, share productivity hacks
    One-liner: "Deadlines aren't scary with me around 😎"`
  }
];

const Dashboard = () => {
  const { botId } = useParams();
  const [messages, setMessages] = useState(() => {
    try {
      const savedMessages = localStorage.getItem('chatMessages');
      return savedMessages ? JSON.parse(savedMessages) : {};
    } catch (error) {
      console.error('Error loading messages from localStorage:', error);
      return {};
    }
  });
  const [selectedBot, setSelectedBot] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showBotInfo, setShowBotInfo] = useState(false);
  const [expandedGenres, setExpandedGenres] = useState({});
  const [chatHistory, setChatHistory] = useState({});
  const [isTyping, setIsTyping] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef();

  // Save messages to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    } catch (error) {
      console.error('Error saving messages to localStorage:', error);
    }
  }, [messages]);

  // Initialize messages state for each bot if not in localStorage
  useEffect(() => {
    const initialMessages = { ...messages };
    let needsUpdate = false;

    personalities.forEach(bot => {
      if (!initialMessages[bot.id]) {
        initialMessages[bot.id] = [];
        needsUpdate = true;
      }
    });

    if (needsUpdate) {
      setMessages(initialMessages);
    }
  }, []);

  // Handle bot selection
  useEffect(() => {
    if (botId) {
      const selectedBot = personalities.find(bot => bot.id === botId);
      if (selectedBot) {
        setSelectedBot(selectedBot);
      }
    }
  }, [botId]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleGenre = (genre) => {
    setExpandedGenres(prev => ({
      ...prev,
      [genre]: !prev[genre]
    }));
  };

  const openBotInfo = (bot) => {
    setShowBotInfo(true);
  };

  const closeBotInfo = () => {
    setShowBotInfo(false);
  };

  const handleSendMessage = async (message) => {
    if (!selectedBot) return;
  
    // Add user message first
    const userMessage = { role: 'user', content: message };
    setMessages(prev => ({
      ...prev,
      [selectedBot.id]: [...(prev[selectedBot.id] || []), userMessage]
    }));
  
    // Set typing for current bot only
    setIsTyping(prev => ({ ...prev, [selectedBot.id]: true }));
  
    try {
      const responseText = await generateResponse(message, selectedBot.id, {
        recentMessages: messages[selectedBot.id] || []
      });
      
      console.log('DASHBOARD GOT:', responseText);
  
      // Add bot response
      const botMessage = { role: 'assistant', content: responseText };
      setMessages(prev => ({
        ...prev,
        [selectedBot.id]: [...(prev[selectedBot.id] || []), botMessage]
      }));
  
      // Return the response text for ChatInterface
      return responseText;
  
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { 
        role: 'assistant', 
        content: "Let's try that again..." 
      };
      setMessages(prev => ({
        ...prev,
        [selectedBot.id]: [...(prev[selectedBot.id] || []), errorMessage]
      }));
    } finally {
      // Clear typing for current bot only
      setIsTyping(prev => ({ ...prev, [selectedBot.id]: false }));
    }
  };

  // Clear chat history for current bot
  const clearChat = () => {
    setMessages(prevMessages => ({
      ...prevMessages,
      [botId]: []
    }));
  };

  // Clear all chat histories
  const clearAllChats = () => {
    setMessages({});
    localStorage.removeItem('chatMessages');
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <DashboardContainer>
        <MenuButton onClick={toggleSidebar}>☰</MenuButton>
        
        <Sidebar ref={sidebarRef} isOpen={isSidebarOpen}>
          <SidebarHeader>
            <Logo to="/">Bip-Bop</Logo>
            <ThemeModeToggle onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? '🌞' : '🌙'}
            </ThemeModeToggle>
          </SidebarHeader>
          <BotList>
            {(() => {
              const genreOrder = [
                'Knowledge',
                'Life',
                'Health',
                'Home',
                'Tech',
                'Life Advice'
              ];

              const botsByGenre = personalities.reduce((acc, bot) => {
                const genre = bot.genre || 'Uncategorized';
                if (!acc[genre]) acc[genre] = [];
                acc[genre].push(bot);
                return acc;
              }, {});

              return genreOrder.flatMap(genre => {
                const genreBots = botsByGenre[genre] || [];
                
                if (genreBots.length === 0) return [];

                return [
                  <GenreHeader 
                    key={`header-${genre}`} 
                    onClick={() => toggleGenre(genre)}
                  >
                    {genre}
                    <DropdownIcon isOpen={expandedGenres[genre]}>
                      ▼
                    </DropdownIcon>
                  </GenreHeader>,
                  <GenreBotsList 
                    key={`bots-${genre}`} 
                    isOpen={expandedGenres[genre]}
                  >
                    {genreBots.map(bot => (
                      <BotItem 
                        key={bot.id}
                        active={selectedBot?.id === bot.id}
                        onClick={() => {
                          navigate(`/dashboard/${bot.id}`);
                          setIsSidebarOpen(false);
                        }}
                      >
                        <BotMainContent>
                          <BotEmoji>{bot.emoji}</BotEmoji>
                          <BotName active={selectedBot?.id === bot.id}>{bot.name}</BotName>
                          <InfoButton
                            onClick={(e) => {
                              e.stopPropagation();
                              openBotInfo(bot);
                            }}
                          >
                            <FontAwesomeIcon icon={faCircleInfo} />
                          </InfoButton>
                        </BotMainContent>
                      </BotItem>
                    ))}
                  </GenreBotsList>
                ];
              });
            })()}
          </BotList>
        </Sidebar>

        <MainContent>
          {selectedBot && <ChatBackground personalityId={selectedBot.id} />}
          {selectedBot ? (
            <ChatInterface
              botName={selectedBot.name}
              botEmoji={selectedBot.emoji}
              onSendMessage={handleSendMessage}
              gradient={selectedBot.gradient}
              messages={messages[selectedBot.id] || []}
              chatHistory={messages}
              personalityId={selectedBot.id}
              onMessagesUpdate={(newMessages) => {
                setMessages(prev => ({
                  ...prev,
                  [selectedBot.id]: newMessages.filter(msg => 
                    msg.role === 'user' || 
                    msg.role === 'assistant'
                  )
                }));
              }}
              isTyping={isTyping[selectedBot?.id] || false}
            />
          ) : (
            <WelcomeScreen>
              <h2>Select a bot to start chatting!</h2>
              <p>Choose from our unique personalities in the sidebar.</p>
            </WelcomeScreen>
          )}
        </MainContent>

        {showBotInfo && (
          <ModalOverlay 
            isVisible={!!selectedBot} 
            onClick={closeBotInfo}
          >
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <CloseButton onClick={closeBotInfo}>✕</CloseButton>
              <PersonalityTitle>
                {selectedBot?.emoji} {selectedBot?.name}
              </PersonalityTitle>
              <PersonalityDescription>
                {selectedBot?.context.split('\n').map((line, index) => {
                  if (line.includes('One-liner:')) {
                    return <p key={index}><em>{line.split('One-liner:')[1]}</em></p>;
                  }
                  if (line.includes('Tone:')) {
                    return <p key={index}>{line}</p>;
                  }
                  return null;
                })}
              </PersonalityDescription>
            </ModalContent>
          </ModalOverlay>
        )}
      </DashboardContainer>
    </ThemeProvider>
  );
};

export default Dashboard;