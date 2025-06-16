import React from 'react';
import styled, { keyframes } from 'styled-components';

const neonPulse = keyframes`
  0% { text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #5271ff, 0 0 82px #5271ff, 0 0 92px #5271ff, 0 0 102px #5271ff, 0 0 151px #5271ff; }
  50% { text-shadow: 0 0 4px #fff, 0 0 7px #fff, 0 0 13px #fff, 0 0 25px #5271ff, 0 0 45px #5271ff, 0 0 55px #5271ff, 0 0 70px #5271ff, 0 0 100px #5271ff; }
  100% { text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #5271ff, 0 0 82px #5271ff, 0 0 92px #5271ff, 0 0 102px #5271ff, 0 0 151px #5271ff; }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0); }
`;

const NeonContainer = styled.div`
  background: linear-gradient(135deg, #000000, #1a1a2e);
  min-height: 100vh;
  color: #FFFFFF;
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
      radial-gradient(circle at 20% 20%, rgba(82, 113, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const BotInfo = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(82, 113, 255, 0.2);
  position: relative;
  animation: ${floatAnimation} 6s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #5271ff, #9333ea);
    border-radius: 16px;
    z-index: -1;
    opacity: 0.3;
    filter: blur(8px);
  }
`;

const BotName = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #FFFFFF;
  animation: ${neonPulse} 2s infinite;
  font-family: 'Arial', sans-serif;
  font-weight: 300;
  letter-spacing: 0.2em;
`;

const BotTitle = styled.h2`
  font-size: 1.25rem;
  color: #5271ff;
  margin-bottom: 1rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const BotDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #a3b1ff;
  max-width: 600px;
  margin: 0 auto;
  font-weight: 300;
  letter-spacing: 0.05em;
  
  em {
    color: #9333ea;
    font-style: normal;
  }
`;

const Neon = () => {
  const personalityInfo = {
    name: "Neon",
    title: "The Dreamworld Guide",
    oneLiner: "Close your eyes. Picture a neon city in the clouds… ✨",
    description: "A digital dreamweaver who paints with light and imagination. Neon guides you through surreal landscapes and abstract concepts, turning your thoughts into vivid mental imagery and creative explorations.",
    useCase: "Perfect for guided visualizations, creative writing prompts, abstract brainstorming, and when you need to escape into a world of pure imagination."
  };

  return (
    <NeonContainer>
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
    </NeonContainer>
  );
};

export default Neon;
