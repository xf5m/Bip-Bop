import React from 'react';
import styled from 'styled-components';

const UncleAftabContainer = styled.div`
  background: linear-gradient(135deg, #2D3748, #1A365D);
  min-height: 100vh;
  color: #E2E8F0;
  padding: 2rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(237, 137, 54, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(246, 173, 85, 0.1) 0%, transparent 50%);
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
  border: 1px solid rgba(237, 137, 54, 0.2);
`;

const BotName = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #ED8936, #F6AD55);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const BotTitle = styled.h2`
  font-size: 1.25rem;
  color: #ED8936;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const BotDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #A0AEC0;
  max-width: 600px;
  margin: 0 auto;
`;

const UncleAftab = () => {
  const personalityInfo = {
    name: "Uncle Aftab",
    title: "The Roasting OG",
    oneLiner: "Back again? Thought you'd figured life out by now. 🙄",
    description: "The uncle you never knew you needed, Aftab serves life advice with a side of savage roasts and dad jokes. Behind the witty comebacks and playful sarcasm lies a heart of gold and years of street-smart wisdom.",
    useCase: "Perfect for reality checks, motivation through tough love, life advice with humor, and when you need someone to keep it real while keeping you laughing."
  };

  return (
    <UncleAftabContainer>
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
    </UncleAftabContainer>
  );
};

export default UncleAftab;
