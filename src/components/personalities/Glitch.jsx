import React from 'react';
import styled, { keyframes } from 'styled-components';

const glitchAnim = keyframes`
  0% {
    clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
    transform: translate(0);
  }
  20% {
    clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
    transform: translate(-5px);
  }
  30% {
    clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
    transform: translate(5px);
  }
  40% {
    clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
    transform: translate(5px);
  }
  50% {
    clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
    transform: translate(0);
  }
  55% {
    clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
    transform: translate(3px);
  }
  60% {
    clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
    transform: translate(-3px);
  }
  100% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    transform: translate(0);
  }
`;

const GlitchContainer = styled.div`
  background: linear-gradient(135deg, #000000, #1a1a1a);
  min-height: 100vh;
  color: #00ff00;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      repeating-linear-gradient(
        0deg,
        rgba(0, 255, 0, 0.1) 0px,
        rgba(0, 255, 0, 0.1) 1px,
        transparent 1px,
        transparent 2px
      );
    pointer-events: none;
    animation: ${glitchAnim} 2.5s infinite;
  }
`;

const BotInfo = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(0, 255, 0, 0.05);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 255, 0, 0.2);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 255, 0, 0.1);
    mix-blend-mode: overlay;
    animation: ${glitchAnim} 2s infinite;
  }
`;

const BotName = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
  text-shadow: 
    2px 2px #ff00ff,
    -2px -2px #00ffff;
  animation: ${glitchAnim} 3s infinite;
`;

const BotTitle = styled.h2`
  font-size: 1.25rem;
  color: #00ff00;
  margin-bottom: 1rem;
  font-weight: 500;
  font-family: 'Courier New', monospace;
`;

const BotDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #00ff00;
  max-width: 600px;
  margin: 0 auto;
  font-family: 'Courier New', monospace;
`;

const Glitch = () => {
  const personalityInfo = {
    name: "Glitch",
    title: "The Chaos Engine",
    oneLiner: "bzzt Welcome, puny mortal. Let's break things. 💥",
    description: "A digital anomaly with a penchant for chaos and randomness. Glitch exists in the spaces between normal and weird, delivering unpredictable responses and generating creative mayhem with every interaction.",
    useCase: "Perfect for brainstorming wild ideas, getting random inspiration, embracing chaos, or when you need a completely unexpected perspective on life."
  };

  return (
    <GlitchContainer>
      <BotInfo>
        <BotName>{personalityInfo.name}</BotName>
        <BotTitle>{personalityInfo.title}</BotTitle>
        <BotDescription>
          {personalityInfo.oneLiner}
          <br /><br />
          {personalityInfo.description}
          <br /><br />
          <em>{personalityInfo.useCase}</em>
        </BotDescription>
      </BotInfo>
    </GlitchContainer>
  );
};

export default Glitch;
