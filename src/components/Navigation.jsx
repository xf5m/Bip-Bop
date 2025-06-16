import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-right: 1rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const IconButton = styled(motion.button)`
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.25rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  box-shadow: 
    0 4px 12px rgba(99, 102, 241, 0.3),
    inset 0 2px 4px rgba(255, 255, 255, 0.3);
`;

const HomeButton = styled(motion(Link))`
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.25rem;
  text-decoration: none;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  box-shadow: 
    0 4px 12px rgba(99, 102, 241, 0.3),
    inset 0 2px 4px rgba(255, 255, 255, 0.3);
`;

const NavButtons = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  flex-grow: 1;
  justify-content: center;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(99, 102, 241, 0.3);
    border-radius: 2px;
  }
`;

const NavButton = styled(motion(Link))`
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  white-space: nowrap;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  ${props => {
    switch (props.$personality) {
      case 'therapist':
        return `
          background: ${props.$isActive ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : 'rgba(59, 130, 246, 0.1)'};
          color: ${props.$isActive ? '#fff' : '#1d4ed8'};
          box-shadow: ${props.$isActive ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'};
        `;
      case 'gym-bro':
        return `
          background: ${props.$isActive ? 'linear-gradient(135deg, #ec4899, #be185d)' : 'rgba(236, 72, 153, 0.1)'};
          color: ${props.$isActive ? '#fff' : '#be185d'};
          box-shadow: ${props.$isActive ? '0 4px 12px rgba(236, 72, 153, 0.3)' : 'none'};
        `;
      case 'plant-daddy':
        return `
          background: ${props.$isActive ? 'linear-gradient(135deg, #22c55e, #15803d)' : 'rgba(34, 197, 94, 0.1)'};
          color: ${props.$isActive ? '#fff' : '#15803d'};
          box-shadow: ${props.$isActive ? '0 4px 12px rgba(34, 197, 94, 0.3)' : 'none'};
        `;
      case 'fantasy':
        return `
          background: ${props.$isActive ? 'linear-gradient(135deg, #8b5cf6, #6d28d9)' : 'rgba(139, 92, 246, 0.1)'};
          color: ${props.$isActive ? '#fff' : '#6d28d9'};
          box-shadow: ${props.$isActive ? '0 4px 12px rgba(139, 92, 246, 0.3)' : 'none'};
        `;
      case 'kitchen-goblin':
        return `
          background: ${props.$isActive ? 'linear-gradient(135deg, #f97316, #c2410c)' : 'rgba(249, 115, 22, 0.1)'};
          color: ${props.$isActive ? '#fff' : '#c2410c'};
          box-shadow: ${props.$isActive ? '0 4px 12px rgba(249, 115, 22, 0.3)' : 'none'};
        `;
      case 'meme-bot':
        return `
          background: ${props.$isActive ? 'linear-gradient(135deg, #06b6d4, #0891b2)' : 'rgba(6, 182, 212, 0.1)'};
          color: ${props.$isActive ? '#fff' : '#0891b2'};
          box-shadow: ${props.$isActive ? '0 4px 12px rgba(6, 182, 212, 0.3)' : 'none'};
        `;
      default:
        return '';
    }
  }}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover {
    transform: translateY(-2px);
  }
`;

const MenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
`;

const MenuContent = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 2rem;
  border-radius: 24px;
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.3);
`;

const MenuButton = styled(motion(Link))`
  padding: 1.25rem;
  border-radius: 16px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${props => props.$isActive ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'rgba(255, 255, 255, 0.8)'};
  color: ${props => props.$isActive ? 'white' : '#1f2937'};
  box-shadow: ${props => props.$isActive ? 
    '0 4px 12px rgba(99, 102, 241, 0.3)' : 
    '0 2px 8px rgba(0, 0, 0, 0.05)'};
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover {
    transform: translateX(8px);
    background: ${props => props.$isActive ? 
      'linear-gradient(135deg, #6366f1, #4f46e5)' : 
      'linear-gradient(135deg, #6366f1, #4f46e5)'};
    color: white;
  }
`;

const personalities = [
  { id: 'therapist', name: 'Dr. Sarah', emoji: '🧘', path: '/therapist' },
  { id: 'gym-bro', name: 'Chad', emoji: '💪', path: '/gym-bro' },
  { id: 'plant-daddy', name: 'Plant Daddy', emoji: '🌿', path: '/plant-daddy' },
  { id: 'fantasy', name: 'Elder Mystweaver', emoji: '🧙', path: '/fantasy' },
  { id: 'kitchen-goblin', name: 'Kitchen Goblin', emoji: '🍕', path: '/kitchen-goblin' },
  { id: 'meme-bot', name: 'Meme Bot', emoji: '😎', path: '/meme-bot' },
];

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <NavContainer>
        <NavContent>
          <ButtonGroup>
            <HomeButton
              to="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              🏠
            </HomeButton>
            <IconButton
              onClick={() => setIsMenuOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              📱
            </IconButton>
          </ButtonGroup>
          <NavButtons>
            {personalities.map(({ id, name, emoji, path }, index) => (
              <NavButton
                key={id}
                to={path}
                $personality={id}
                $isActive={location.pathname === path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
              >
                {emoji} {name}
              </NavButton>
            ))}
          </NavButtons>
        </NavContent>
      </NavContainer>

      <AnimatePresence>
        {isMenuOpen && (
          <MenuOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          >
            <MenuContent
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={e => e.stopPropagation()}
            >
              <MenuButton
                to="/"
                $isActive={location.pathname === '/'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                🏠 Home
              </MenuButton>
              {personalities.map(({ id, name, emoji, path }, index) => (
                <MenuButton
                  key={id}
                  to={path}
                  $isActive={location.pathname === path}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {emoji} {name}
                </MenuButton>
              ))}
            </MenuContent>
          </MenuOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation; 