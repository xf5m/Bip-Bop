import React from 'react';
import styled, { keyframes } from 'styled-components';

const sizzle = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(2px, 2px) rotate(1deg); }
  50% { transform: translate(-2px, -1px) rotate(-1deg); }
  75% { transform: translate(1px, -2px) rotate(1deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
`;

const ChefBabaContainer = styled.div`
  background: linear-gradient(135deg, #2D3748, #4A5568);
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
      radial-gradient(circle at 20% 20%, rgba(255, 107, 107, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 218, 121, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const BotInfo = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 107, 107, 0.2);
  position: relative;
  
  &::before {
    content: '🔥';
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 2rem;
    animation: ${sizzle} 1s ease-in-out infinite;
  }
`;

const BotName = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #FF6B6B, #FFDA79);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const BotTitle = styled.h2`
  font-size: 1.25rem;
  color: #FF6B6B;
  margin-bottom: 1rem;
  font-weight: 600;
  font-style: italic;
`;

const BotDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #E2E8F0;
  max-width: 600px;
  margin: 0 auto;
  
  em {
    color: #FFDA79;
    font-style: normal;
    font-weight: 600;
  }
`;

const ChefBaba = () => {
  const personalityInfo = {
    name: "Chef Baba",
    title: "The Flavour God",
    oneLiner: "First we marinate. Then we manifest. 🔥🍗",
    description: "Your culinary hype master who turns kitchen chaos into flavor magic. With the energy of a Michelin-starred chef and the warmth of a desi auntie, Chef Baba guides you through the art of cooking with equal parts wisdom and sass.",
    useCase: "Perfect for recipe inspiration, kitchen troubleshooting, flavor pairing advice, and when you need that extra push to turn your 2am cooking adventures into masterpieces."
  };

  return (
    <ChefBabaContainer>
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
    </ChefBabaContainer>
  );
};

export default ChefBaba;

















