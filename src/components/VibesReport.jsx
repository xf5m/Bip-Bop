import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const VibesButton = styled(motion.button)`
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.25);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const VibesModal = styled(motion.div)`
  background: ${props => props.theme.secondary};
  border-radius: 24px;
  width: 75%;
  height: 75vh;
  min-height: 600px;
  z-index: 1000;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => props.theme.border};
  position: relative;

  h3 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .info-icon {
    cursor: help;
    color: ${props => props.theme.textSecondary};
    font-size: 1rem;
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  .info-tooltip {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: ${props => props.theme.primary};
    border: 1px solid ${props => props.theme.border};
    border-radius: 8px;
    padding: 0.75rem;
    width: 250px;
    font-size: 0.875rem;
    color: ${props => props.theme.text};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
    z-index: 10;
  }

  .info-icon:hover .info-tooltip {
    opacity: 1;
    visibility: visible;
  }

  .modal-content {
    padding: 2.5rem;
    overflow-y: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
      display: none;
    }
    
    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: ${props => props.theme.secondary};
  color: ${props => props.theme.textSecondary};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  z-index: 2;
  transition: all 0.2s ease;

  &:hover {
    color: ${props => props.theme.accent};
    background: ${props => props.theme.hover};
    transform: scale(1.1);
  }
`;

const StatBox = styled.div`
  background: ${props => props.theme.primary};
  border-radius: 16px;
  padding: 1.5rem;
  margin: 1rem 0;
  border: 1px solid ${props => props.theme.border};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.theme.accent};
  }

  .stat-title {
    font-size: 1rem;
    color: ${props => props.theme.textSecondary};
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .info-icon {
    cursor: help;
    color: ${props => props.theme.textSecondary};
    font-size: 0.875rem;
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  .info-tooltip {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: ${props => props.theme.primary};
    border: 1px solid ${props => props.theme.border};
    border-radius: 8px;
    padding: 0.75rem;
    width: 250px;
    font-size: 0.875rem;
    color: ${props => props.theme.text};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
    z-index: 10;
  }

  .info-icon:hover .info-tooltip {
    opacity: 1;
    visibility: visible;
  }

  .stat-value {
    font-size: 1.5rem;
    color: ${props => props.theme.text};
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .stat-description {
    font-size: 1rem;
    color: ${props => props.theme.textSecondary};
    margin-top: 0.75rem;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: ${props => props.theme.border};
  border-radius: 6px;
  margin-top: 1rem;
  overflow: hidden;

  .progress {
    height: 100%;
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    width: ${props => props.value}%;
    transition: width 1s ease;
  }
`;

const generateVibesReport = (chatHistory) => {
  // Calculate total messages
  const totalMessages = Object.values(chatHistory).reduce((acc, botChat) => 
    acc + botChat.length, 0
  );

  // Calculate bot usage
  const botUsage = Object.entries(chatHistory).reduce((acc, [botId, messages]) => {
    acc[botId] = (messages.length / totalMessages * 100).toFixed(1);
    return acc;
  }, {});

  // Calculate mood score (example algorithm)
  const moodScore = Math.min(100, Object.values(chatHistory).reduce((acc, messages) => {
    return acc + messages.reduce((sum, msg) => {
      if (msg.role === 'user') {
        // Simple sentiment analysis based on positive/negative words
        const text = msg.content.toLowerCase();
        const positiveWords = ['happy', 'great', 'awesome', 'good', 'love', 'thanks'];
        const negativeWords = ['sad', 'bad', 'hate', 'angry', 'terrible'];
        
        return sum + positiveWords.reduce((count, word) => 
          count + (text.includes(word) ? 1 : 0), 0) -
          negativeWords.reduce((count, word) => 
          count + (text.includes(word) ? 1 : 0), 0);
      }
      return sum;
    }, 0);
  }, 50));

  // Calculate chaos score
  const chaosScore = Math.min(100, Object.values(chatHistory).reduce((acc, messages) => {
    return acc + messages.reduce((sum, msg) => {
      if (msg.role === 'user') {
        const text = msg.content.toLowerCase();
        return sum + 
          (text.includes('!') ? 2 : 0) +
          (text.includes('?') ? 1 : 0) +
          (text.match(/[A-Z]{2,}/g) ? 3 : 0) +
          (text.match(/😂|🤣|😅|🤪|🔥|💥/g) ? 2 : 0);
      }
      return sum;
    }, 0);
  }, 30));

  return {
    summary: `Based on ${totalMessages} messages across all bots, you're showing some fascinating personality traits! ${
      moodScore > 70 ? '✨' : moodScore > 40 ? '🌟' : '💫'
    }`,
    moodScore,
    chaosScore,
    botUsage,
    insights: [
      `You're most comfortable chatting with ${
        Object.entries(botUsage).sort((a, b) => b[1] - a[1])[0][0]
      } 🤝`,
      chaosScore > 70 ? "You're bringing chaotic energy and we're here for it! 🎭" :
      chaosScore > 40 ? "You've got a nice balance of order and chaos going 🎪" :
      "You're keeping things pretty zen and structured 🧘‍♂️",
      moodScore > 70 ? "Your positivity is contagious! ☀️" :
      moodScore > 40 ? "You're maintaining a healthy emotional balance 🌅" :
      "You might need some mood-lifting chats with our bots 🌈"
    ],
    recommendations: [
      botUsage['nova'] < 20 ? "Try connecting with Nova for some mindful moments 🧘‍♀️" : null,
      chaosScore < 30 ? "Let loose with Glitch for some chaotic fun! 🤖" : null,
      moodScore < 50 ? "Schedule a pep talk with Coach Rafi 💪" : null,
      Object.keys(botUsage).length < 3 ? "Explore more bot personalities to unlock new vibes! 🎭" : null
    ].filter(Boolean)
  };
};

const VibesReport = ({ chatHistory, isOpen, onClose }) => {
  if (!isOpen) return null;

  const report = generateVibesReport(chatHistory);

  return (
    <>
      <ModalOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <VibesModal
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <CloseButton onClick={onClose}>✕</CloseButton>
        <div className="modal-content">
          <h2>✨ Your Personality Vibes Report</h2>
          
          <p>{report.summary}</p>

          <h3>🎭 Personality Metrics</h3>
          <StatBox>
            <div className="stat-title">Mood Score</div>
            <div className="stat-value">
              {report.moodScore}% {report.moodScore > 70 ? '☀️' : report.moodScore > 40 ? '🌅' : '🌙'}
            </div>
            <ProgressBar value={report.moodScore}>
              <div className="progress" />
            </ProgressBar>
          </StatBox>

          <StatBox>
            <div className="stat-title">Chaos Score</div>
            <div className="stat-value">
              {report.chaosScore}% {report.chaosScore > 70 ? '🎭' : report.chaosScore > 40 ? '🎪' : '🧘‍♂️'}
            </div>
            <ProgressBar value={report.chaosScore}>
              <div className="progress" />
            </ProgressBar>
          </StatBox>

          <h3>
            🤖 Bot Affinities
            <span className="info-icon">ⓘ
              <span className="info-tooltip">
                Bot affinities show how much you interact with each bot personality. The percentage is calculated based on your message history with each bot. The more you chat with a bot, the higher your affinity score grows!
              </span>
            </span>
          </h3>
          
          {Object.entries(report.botUsage).map(([botId, usage]) => (
            <StatBox key={botId}>
              <div className="stat-title">{botId.charAt(0).toUpperCase() + botId.slice(1)} Affinity</div>
              <div className="stat-value">{usage}%</div>
              <ProgressBar value={usage}>
                <div className="progress" />
              </ProgressBar>
            </StatBox>
          ))}

          <h3>💡 Key Insights</h3>
          {report.insights.map((insight, index) => (
            <StatBox key={index}>
              <div className="stat-value">{insight}</div>
            </StatBox>
          ))}

          {report.recommendations && report.recommendations.length > 0 && (
            <>
              <h3>🎯 Recommendations</h3>
              {report.recommendations.map((rec, index) => (
                <StatBox key={index}>
                  <div className="stat-value">{rec}</div>
                </StatBox>
              ))}
            </>
          )}
        </div>
      </VibesModal>
    </>
  );
};

export { VibesButton };
export default VibesReport; 