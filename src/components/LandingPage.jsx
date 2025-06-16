import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  background: linear-gradient(135deg, #0a0f2c, #1e1b4b);
  color: white;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0;
  margin: 0;
  box-sizing: border-box;

  * {
    box-sizing: border-box;
    max-width: 100%;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(147, 197, 253, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(167, 139, 250, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const NavBar = styled.nav`
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 10;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
`;

const Logo = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '🤖';
    font-size: 2rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled.a`
  color: #94a3b8;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }
`;

const StyledLink = styled(Link)`
  padding: 1.25rem 2.5rem;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  font-size: 1.25rem;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  z-index: 2;
  margin: 0 auto;
  display: block;
  text-decoration: none;
  text-align: center;
  width: fit-content;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
    color: white;
    text-decoration: none;
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
  }

  &:visited {
    color: white;
    text-decoration: none;
  }
`;

const HeroSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  max-height: 600px;
  position: relative;
  overflow: hidden;
  padding: 2rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    min-height: 70vh;
    padding: 1rem;
  }
`;

const ContentLeft = styled.div`
  max-width: 900px;
  width: 100%;
  z-index: 2;
  padding: 0 1rem;
  box-sizing: border-box;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 2rem;
  background: linear-gradient(to right, #60a5fa, #a78bfa);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: -0.02em;
  text-align: center;
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: #94a3b8;
  margin-bottom: 3rem;
  line-height: 1.6;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

const PersonalitiesSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(to bottom, rgba(96, 165, 250, 0.05), transparent);
  min-height: 80vh;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  color: #60A5FA;
  margin-bottom: 2rem;
  position: relative;
  width: 100%;
  max-width: 1200px;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: #60A5FA;
    border-radius: 2px;
  }
`;

const PersonalitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(200px, 1fr));
  gap: 1.5rem;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const PersonalityCard = styled(motion.div)`
  background: rgba(10, 15, 30, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  backdrop-filter: blur(20px);
  transition: all 0.5s ease;
  position: relative;
  overflow: hidden;
  filter: brightness(0.7) saturate(0.8);
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(147, 197, 253, 0.05),
      rgba(167, 139, 250, 0.05)
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(147, 197, 253, 0.3);
    filter: brightness(1.2) saturate(1.2);
    background: rgba(20, 30, 60, 0.95);
    box-shadow: 
      0 10px 30px -10px rgba(99, 102, 241, 0.3),
      0 0 30px rgba(147, 197, 253, 0.2);

    &::before {
      opacity: 1;
    }
  }
`;

const PersonalityEmoji = styled.div`
  font-size: 2.75rem;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  flex-shrink: 0;
  position: relative;
  transition: transform 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    background: linear-gradient(135deg, rgba(147, 197, 253, 0.2), rgba(167, 139, 250, 0.2));
    border-radius: inherit;
    z-index: -1;
  }

  ${PersonalityCard}:hover & {
    transform: scale(1.1) rotate(5deg);
  }
`;

const PersonalityInfo = styled.div`
  flex: 1;
`;

const PersonalityName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: white;
`;

const PersonalityDescription = styled.p`
  color: #94a3b8;
  font-size: 0.875rem;
  line-height: 1.5;
`;

const FeaturedPersonalityCard = styled(PersonalityCard)`
  grid-column: 1 / -1;
  max-width: 600px;
  margin: 0 auto 2rem;
  background: rgba(147, 51, 234, 0.15);
  border: 2px solid rgba(147, 51, 234, 0.3);
  transform: scale(1.05);
  
  ${PersonalityEmoji} {
    font-size: 3.5rem;
    width: 90px;
    height: 90px;
  }

  ${PersonalityName} {
    font-size: 1.5rem;
    color: #9333ea;
  }

  ${PersonalityDescription} {
    font-size: 1rem;
  }

  &:hover {
    background: rgba(147, 51, 234, 0.2);
    border-color: rgba(147, 51, 234, 0.4);
    box-shadow: 
      0 10px 30px -10px rgba(147, 51, 234, 0.4),
      0 0 30px rgba(147, 51, 234, 0.3);
  }
`;

const personalities = [
  {
    id: 'guru',
    name: 'Guru',
    emoji: '🧠',
    description: 'Ask me anything. Wisdom (or chaos) awaits. Your go-to for deep dives into any topic, from quantum physics to why your plants keep dying.',
    path: '/dashboard/guru'
  },
  {
    id: 'nova',
    name: 'Nova',
    emoji: '💭',
    description: 'Let\'s talk about what\'s really going on. A safe space for your thoughts, feelings, and those 3 AM existential questions.',
    path: '/dashboard/nova'
  },
  {
    id: 'uncle-aftab',
    name: 'Uncle Aftab',
    emoji: '🥃',
    description: '"Back in my day, you had to earn your dopamine." Your favorite desi uncle, ready to roast you with love and serve some hard truths.',
    path: '/dashboard/uncle-aftab'
  },
  {
    id: 'glitch',
    name: 'Glitch',
    emoji: '👾',
    description: '"Error 404? Not on my watch. What broke this time?" Your tech-savvy buddy for debugging life and code.',
    path: '/dashboard/glitch'
  },
  {
    id: 'chef-baba',
    name: 'Chef Baba',
    emoji: '🔥',
    description: '"You hungry or just bored? Either way, let\'s make something 🔥" Your culinary companion for midnight cravings and cooking adventures.',
    path: '/dashboard/chef-baba'
  },
  {
    id: 'dr-aya',
    name: 'Dr. Aya',
    emoji: '👩‍⚕️',
    description: '"Let\'s fix what hurts. What are your symptoms?" Your trusted medical advisor for health concerns and wellness guidance.',
    path: '/dashboard/dr-aya'
  },
  {
    id: 'coach-rafi',
    name: 'Coach Rafi',
    emoji: '💪',
    description: '"No pain, no protein, no progress 💪" Your hype man for fitness goals, from couch to beast mode.',
    path: '/dashboard/coach-rafi'
  },
  {
    id: 'saha',
    name: 'Saha (SaaBai)',
    emoji: '🧼',
    description: '"Laundry? Dishes? Room? Let\'s knock \'em down one by one 🧼" Your organizational wizard for turning chaos into calm.',
    path: '/dashboard/saha'
  },
  {
    id: 'yara',
    name: 'Yara',
    emoji: '🥗',
    description: '"You can\'t hustle on junk. Let\'s fix your fuel." Your nutrition navigator for a healthier relationship with food.',
    path: '/dashboard/yara'
  },
  {
    id: 'nimo',
    name: 'Nimo',
    emoji: '📚',
    description: '"Time to romance your syllabus 📚✨" Your study buddy for productive cramming and academic excellence.',
    path: '/dashboard/nimo'
  },
  {
    id: 'vee',
    name: 'Vee',
    emoji: '💼',
    description: '"Let\'s structure your chaos. One task at a time." Your work mentor for career growth and professional development.',
    path: '/dashboard/vee'
  }
];

const floatingEmojis = [
  '🧘‍♀️', '😎', '💪', '🌿', '🍕', '🧙‍♂️', '🤖', '🎮', '🎨', '🎵', 
  '🌈', '✨', '🚀', '🎯', '🎪', '🎭', '🎪', '🎨', '🎬', '🎤'
];

const generateRandomAngle = () => Math.random() * Math.PI * 2;
const generateRandomDistance = () => Math.random() * 300 + 100; // Random distance between 100-400px

const ContentRight = styled(motion.div)`
  flex: 1;
  position: relative;
  height: 600px;
  max-width: 600px;
  
  @media (max-width: 1024px) {
    height: 400px;
  }
`;

const VisualElement = styled(motion.div)`
  position: absolute;
  width: 120%;
  height: 120%;
  top: -10%;
  left: -10%;
  background: radial-gradient(circle at center, #6366f1 0%, transparent 70%);
  filter: blur(80px);
  opacity: 0.2;
`;

const FloatingBot = styled(motion.div)`
  position: absolute;
  font-size: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 1.5rem;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.2),
    inset 0 2px 4px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const FloatingEmoji = styled(motion.div)`
  position: absolute;
  font-size: 2rem;
  z-index: 1;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.1));
  user-select: none;
  pointer-events: none;
  opacity: 0.7;
  transform-style: preserve-3d;
  left: 50%;
  top: 50%;
`;

const LandingPage = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeEmojis, setActiveEmojis] = useState([]);
  const { scrollYProgress } = useScroll();
  const sectionY = useTransform(scrollYProgress, [0.4, 0.8], [100, 0]);
  const sectionOpacity = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);

  useEffect(() => {
    const spawnInterval = setInterval(() => {
      const newEmoji = {
        id: Date.now(),
        emoji: floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)],
        angle: generateRandomAngle(),
        distance: generateRandomDistance()
      };
      
      setActiveEmojis(prev => [...prev, newEmoji]);
      
      // Remove emoji after animation completes
      setTimeout(() => {
        setActiveEmojis(prev => prev.filter(emoji => emoji.id !== newEmoji.id));
      }, 3000);
    }, 300); // Spawn new emoji every 300ms

    return () => clearInterval(spawnInterval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handlePersonalityClick = (path) => {
    navigate(path);
  };

  return (
    <PageContainer>
      <NavBar>
        <Logo>Bip-Bop</Logo>
      </NavBar>

      <HeroSection>
        {activeEmojis.map((item) => (
          <FloatingEmoji
            key={item.id}
            initial={{ 
              opacity: 1,
              scale: 0.2,
              x: 0,
              y: 0
            }}
            animate={{ 
              opacity: 0,
              scale: 1.5,
              x: Math.cos(item.angle) * item.distance,
              y: Math.sin(item.angle) * item.distance,
              rotate: Math.random() * 360
            }}
            transition={{
              duration: 3,
              ease: "easeOut"
            }}
          >
            {item.emoji}
          </FloatingEmoji>
        ))}

        <ContentLeft>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Your AI Companion for Every Mood
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your AI squad for every mood. Whether you're grinding, spiraling, or just vibing,
            we've got a personality that gets your energy. No judgment, just growth. ✨
          </Subtitle>
          <StyledLink to="/dashboard/nova">
            Start Chatting
          </StyledLink>
        </ContentLeft>
      </HeroSection>

      <PersonalitiesSection
        style={{
          y: sectionY,
          opacity: sectionOpacity
        }}
      >
        <SectionTitle
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.2
          }}
        >
          Meet Your AI Companions
        </SectionTitle>
        <PersonalitiesGrid>
          <FeaturedPersonalityCard
            onClick={() => handlePersonalityClick('/dashboard/guru')}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.98 }}
          >
            <PersonalityEmoji>🧠</PersonalityEmoji>
            <PersonalityInfo>
              <PersonalityName>Guru</PersonalityName>
              <PersonalityDescription>
                Ask me anything. Wisdom (or chaos) awaits. Your go-to for deep dives into any topic, from quantum physics to why your plants keep dying. No judgment, just vibes and knowledge bombs.
              </PersonalityDescription>
            </PersonalityInfo>
          </FeaturedPersonalityCard>
          {personalities.slice(1, 11).map((personality, index) => (
            <PersonalityCard
              key={personality.id}
              onClick={() => handlePersonalityClick(personality.path)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <PersonalityEmoji>{personality.emoji}</PersonalityEmoji>
              <PersonalityInfo>
                <PersonalityName>{personality.name}</PersonalityName>
                <PersonalityDescription>{personality.description}</PersonalityDescription>
              </PersonalityInfo>
            </PersonalityCard>
          ))}
        </PersonalitiesGrid>
      </PersonalitiesSection>
    </PageContainer>
  );
};

export default LandingPage; 