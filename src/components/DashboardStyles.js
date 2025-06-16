import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const slideIn = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

export const modalFadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const modalSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background: ${props => props.theme.primary};
  color: ${props => props.theme.text};
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${props => props.theme.background};
  position: relative;
  height: 100vh;
`;

export const MenuButton = styled.button`
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
  background: ${props => props.theme.secondary};
  border: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.text};
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Sidebar = styled.div`
  width: 260px;
  background: ${props => props.theme.sidebar};
  border-right: 1px solid ${props => props.theme.border};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  overflow-y: auto;

  @media (max-width: 768px) {
    position: fixed;
    left: ${props => props.isOpen ? '0' : '-260px'};
    top: 0;
    bottom: 0;
    z-index: 1000;
    transition: left 0.3s ease;
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.border};
`;

export const Logo = styled(Link)`
  font-size: 1.5rem;
  color: ${props => props.theme.accent};
  text-decoration: none;
  font-weight: 600;
`;

export const WelcomeScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${props => props.theme.textSecondary};
  text-align: center;
  padding: 2rem;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.text};
  }

  p {
    font-size: 1.1rem;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.isVisible ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  animation: ${fadeIn} 0.2s ease;
`;

export const ModalContent = styled.div`
  background: ${props => props.theme.primary};
  border-radius: 16px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  animation: ${modalSlideUp} 0.3s ease;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${props => props.theme.textSecondary};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.hover};
    color: ${props => props.theme.text};
  }
`;

export const PersonalityTitle = styled.h3`
  font-size: 1.5rem;
  color: ${props => props.theme.text};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const PersonalityDescription = styled.div`
  color: ${props => props.theme.textSecondary};
  font-size: 1rem;
  line-height: 1.6;

  p {
    margin: 1rem 0;
  }

  em {
    color: ${props => props.theme.accent};
    font-style: italic;
  }

  strong {
    color: ${props => props.theme.text};
    display: inline-block;
    margin-right: 0.5rem;
  }
`; 