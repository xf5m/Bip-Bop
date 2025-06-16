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
`;

const VibesModal = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${props => props.theme.primary};
  border-radius: 24px;
  padding: 2rem;
  width: 90%;
  max-width: 600px;
  max-height: 85vh;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => props.theme.border};

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.text};
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  h3 {
    font-size: 1.1rem;
    margin: 1.5rem 0 0.75rem;
    color: ${props => props.theme.text};
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${props => props.theme.textSecondary};
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.hover};
    color: ${props => props.theme.text};
  }
`;

const StatBox = styled.div`
  background: ${props => props.theme.secondary};
  border-radius: 16px;
  padding: 1rem;
  margin: 0.5rem 0;
  border: 1px solid ${props => props.theme.border};

  .stat-title {
    font-size: 0.875rem;
    color: ${props => props.theme.textSecondary};
    margin-bottom: 0.5rem;
  }

  .stat-value {
    font-size: 1.25rem;
    color: ${props => props.theme.text};
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .stat-description {
    font-size: 0.875rem;
    color: ${props => props.theme.textSecondary};
    margin-top: 0.5rem;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${props => props.theme.border};
  border-radius: 4px;
  margin-top: 0.5rem;
  overflow: hidden;

  .progress {
    height: 100%;
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    width: ${props => props.value}%;
    transition: width 1s ease;
  }
`;

const MIN_MESSAGES_REQUIRED = 10; // Minimum messages per bot
const MIN_BOTS_INTERACTED = 7; // Minimum number of bots user should interact with

const generateVibesReport = (chatHistory) => {
  if (!chatHistory || Object.keys(chatHistory).length === 0) {
    return null;
  }

  // Calculate total messages and validate data
  const botInteractions = Object.entries(chatHistory).reduce((acc, [botId, messages]) => {
    if (messages.length >= MIN_MESSAGES_REQUIRED) {
      acc.validBots.push(botId);
    }
    acc.totalMessages += messages.length;
    return acc;
  }, { validBots: [], totalMessages: 0 });

  // Check if we have enough data
  if (botInteractions.validBots.length < MIN_BOTS_INTERACTED) {
    return {
      isValid: false,
      message: `Chat with at least ${MIN_BOTS_INTERACTED} different bots (${MIN_MESSAGES_REQUIRED}+ messages each) to unlock your Personality Vibes Report! Currently: ${botInteractions.validBots.length}/${MIN_BOTS_INTERACTED} bots`,
      progress: {
        botsInteracted: botInteractions.validBots.length,
        totalBots: MIN_BOTS_INTERACTED,
        totalMessages: botInteractions.totalMessages
      }
    };
  }

  // Continue with existing report generation if we have enough data
  const botUsage = Object.entries(chatHistory).reduce((acc, [botId, messages]) => {
    acc[botId] = (messages.length / botInteractions.totalMessages * 100).toFixed(1);
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
    isValid: true,
    summary: `Based on ${botInteractions.totalMessages} messages across ${botInteractions.validBots.length} bots, you're showing some fascinating personality traits! ${
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

const ProgressMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme.text};

  h3 {
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
  }

  p {
    margin-bottom: 1.5rem;
    color: ${props => props.theme.textSecondary};
  }
`;

const ProgressIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;

  .bot-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${props => props.theme.border};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    
    &.active {
      background: linear-gradient(135deg, #6366f1, #4f46e5);
      color: white;
    }
  }
`;

const VibesReport = ({ chatHistory, isOpen, onClose }) => {
  if (!isOpen) return null;

  const report = generateVibesReport(chatHistory);

  if (!report) {
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
          <ProgressMessage>
            <h3>Start Your Personality Journey! ✨</h3>
            <p>Chat with our bots to unlock your personalized Vibes Report.</p>
          </ProgressMessage>
        </VibesModal>
      </>
    );
  }

  if (!report.isValid) {
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
          <ProgressMessage>
            <h3>Almost There! ✨</h3>
            <p>{report.message}</p>
            <ProgressIndicator>
              {Array.from({ length: report.progress.totalBots }).map((_, index) => (
                <div 
                  key={index} 
                  className={`bot-icon ${index < report.progress.botsInteracted ? 'active' : ''}`}
                >
                  {index < report.progress.botsInteracted ? '✓' : '○'}
                </div>
              ))}
            </ProgressIndicator>
            <p style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
              Total messages: {report.progress.totalMessages}
            </p>
          </ProgressMessage>
        </VibesModal>
      </>
    );
  }

  // Render the full report if data is valid
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

        <h3>🤖 Bot Affinities</h3>
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

        <h3>🎯 Recommendations</h3>
        {report.recommendations.map((rec, index) => (
          <StatBox key={index}>
            <div className="stat-value">{rec}</div>
          </StatBox>
        ))}
      </VibesModal>
    </>
  );
};

export { VibesReport, VibesButton }; 