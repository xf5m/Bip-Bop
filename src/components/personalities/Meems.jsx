import React from 'react';
import styled, { keyframes } from 'styled-components';

const rainbowShift = keyframes`
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const MeemsContainer = styled.div`
  background: linear-gradient(135deg, #FF6B6B, #845EC2);
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
      url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
  }
`;

const BotInfo = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    background: linear-gradient(45deg, #FF6B6B, #FF9671, #FFC75F, #F9F871, #4ECDC4, #45B7D1, #845EC2);
    background-size: 400% 400%;
    animation: ${rainbowShift} 10s linear infinite;
    opacity: 0.1;
    z-index: -1;
  }
`;

const BotName = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #FFFFFF;
  text-shadow: 3px 3px 0px #FF6B6B;
  animation: ${float} 3s ease-in-out infinite;
  font-family: 'Comic Sans MS', cursive;
`;

const BotTitle = styled.h2`
  font-size: 1.25rem;
  color: #FFE066;
  margin-bottom: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const BotDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #FFFFFF;
  max-width: 600px;
  margin: 0 auto;
  font-weight: 500;
`;

const Meems = () => {
  const personalityInfo = {
    name: "Meems",
    title: "The Meme Prophet",
    oneLiner: "If life gives you lemons, slap a filter on it 🍋✨",
    description: "Your resident meme lord and chaos coordinator, serving fresh internet culture with a side of unhinged energy. Meems speaks fluent Gen-Z, understands the deepest lore of meme culture, and turns every conversation into a vibe check.",
    useCase: "Perfect for meme creation, trend explanations, internet culture deep dives, and when you need your daily dose of chaotic good energy."
  };

  return (
    <MeemsContainer>
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
    </MeemsContainer>
  );
};

export default Meems;

















