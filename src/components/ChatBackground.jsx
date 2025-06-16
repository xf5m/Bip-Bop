import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Theme configuration for each personality
const themes = {
  guru: {
    colors: ['#7F00FF', '#E100FF'],
    emojis: ['🔮', '🌌', '✨', '📿']
  },
  nova: {
    colors: ['#A8C0FF', '#EAF6FF'],
    emojis: ['🧘‍♂', '💭', '🌿', '🕊']
  },
  vee: {
    colors: ['#2F4858', '#33658A'],
    emojis: ['🧑‍💻', '🗂', '📎', '⌛']
  },
  'dr-aya': {
    colors: ['#E3FDFD', '#CBF1F5'],
    emojis: ['🩺', '💊', '🧬', '🌡']
  },
  'coach-rafi': {
    colors: ['#FF416C', '#FF4B2B'],
    emojis: ['💪🏽', '🏋‍♂', '🔥', '🥩']
  },
  'chef-baba': {
    colors: ['#F7CE68', '#FBAB7E'],
    emojis: ['🍳', '🥘', '🌶', '🍛']
  },
  glitch: {
    colors: ['#00F5FF', '#FF00C8'],
    emojis: ['👾', '🧠', '💻', '⚡']
  },
  'uncle-aftab': {
    colors: ['#FFD194', '#D1913C'],
    emojis: ['🧔🏻‍♂', '☕', '🗿', '😏']
  },
  saha: {
    colors: ['#B2FEFA', '#0ED2F7'],
    emojis: ['🧽', '🧺', '🧹', '🧼']
  },
  yara: {
    colors: ['#C1DFB1', '#F9F7C9'],
    emojis: ['🥗', '🍎', '🥑', '🥤']
  },
  nimo: {
    colors: ['#667EEA', '#764BA2'],
    emojis: ['📚', '📝', '🧠', '🖊']
  }
};

// Keyframes for gradient animation
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Keyframes for emoji floating animation
const floatAnimation = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100vw);
  }
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
  background: ${props => `linear-gradient(-45deg, ${props.colors[0]}, ${props.colors[1]})`};
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
`;

const FloatingEmoji = styled(motion.div)`
  position: absolute;
  font-size: 2.5rem;
  opacity: 0.15;
  pointer-events: none;
  white-space: nowrap;
  will-change: transform;
  animation: ${floatAnimation} ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
  top: ${props => props.top}%;
`;

const ChatBackground = ({ personalityId }) => {
  const theme = themes[personalityId] || themes.guru;

  return (
    <BackgroundContainer colors={theme.colors}>
      {theme.emojis.map((emoji, index) => {
        // Calculate random positions and timings for each emoji
        const top = 15 + (index * 20); // Distribute vertically
        const duration = 20 + Math.random() * 10; // Random duration between 20-30s
        const delay = -Math.random() * duration; // Random start position

        return (
          <FloatingEmoji
            key={index}
            duration={duration}
            delay={delay}
            top={top}
          >
            {emoji}
          </FloatingEmoji>
        );
      })}
    </BackgroundContainer>
  );
};

export default ChatBackground; 