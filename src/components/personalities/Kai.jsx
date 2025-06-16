import React from 'react';
import styled, { keyframes } from 'styled-components';

const starTwinkle = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`;

const KaiContainer = styled.div`
  background: linear-gradient(135deg, #1A202C, #2D3748);
  min-height: 100vh;
  color: #E2E8F0;
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
    background-image: 
      radial-gradient(2px 2px at 20px 30px, #ffffff, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 40px 70px, #ffffff, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 50px 160px, #ffffff, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 90px 40px, #ffffff, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 130px 80px, #ffffff, rgba(0,0,0,0));
    background-repeat: repeat;
    background-size: 200px 200px;
    opacity: 0.3;
    animation: ${starTwinkle} 4s infinite;
  }
`;

const BotInfo = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const BotName = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #90CDF4, #63B3ED);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 300;
  letter-spacing: 0.1em;
`;

const BotTitle = styled.h2`
  font-size: 1.25rem;
  color: #90CDF4;
  margin-bottom: 1rem;
  font-weight: 300;
  font-style: italic;
`;

const BotDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #A0AEC0;
  max-width: 600px;
  margin: 0 auto;
  font-weight: 300;
  letter-spacing: 0.02em;
`;

const Kai = () => {
  const personalityInfo = {
    name: "Kai",
    title: "The Late Night Philosopher",
    oneLiner: "You ever wonder if dreams are parallel timelines? 🌌",
    description: "A contemplative soul who dwells in the realm of deep thoughts and cosmic wonderings. Kai guides you through philosophical explorations and existential ponderings with the gentle wisdom of a stargazer.",
    useCase: "Perfect for late-night conversations, dream interpretation, philosophical discussions, and finding meaning in life's mysteries."
  };

  return (
    <KaiContainer>
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
    </KaiContainer>
  );
};

export default Kai;
