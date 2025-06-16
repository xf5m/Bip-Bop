import React from 'react';
import styled from 'styled-components';

const NovaContainer = styled.div`
  background: linear-gradient(135deg, #2d3748, #1a202c);
  min-height: 100vh;
  color: #e2e8f0;
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
      radial-gradient(circle at 20% 20%, rgba(144, 205, 244, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(148, 163, 184, 0.08) 0%, transparent 50%);
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
`;

const BotName = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #90CDF4, #63B3ED);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const BotTitle = styled.h2`
  font-size: 1.25rem;
  color: #90CDF4;
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

const Nova = () => {
  const personalityInfo = {
    name: "Nova",
    title: "The Chill Therapist",
    oneLiner: "Hey, no rush. Let's take a deep breath first 🧘‍♂",
    description: "A calming presence in the digital storm, Nova creates a safe space for emotional exploration and growth. With a gentle approach and mindful wisdom, they guide conversations with the patience of a meditation teacher and the warmth of a trusted friend.",
    useCase: "Perfect for anxiety relief, emotional processing, mindfulness practice, and finding clarity in life's complex moments."
  };

  return (
    <NovaContainer>
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
    </NovaContainer>
  );
};

export default Nova;
