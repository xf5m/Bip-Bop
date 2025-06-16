export const chatModes = [
  {
    id: 1,
    name: 'Therapist',
    emoji: '🧘',
    description: 'get deep, feel heard',
    buttonText: 'Start Healing',
    color: {
      primary: '#2b5876',
      secondary: '#4e4376'
    }
  },
  {
    id: 2,
    name: 'Gym Bro',
    emoji: '💪',
    description: 'hype mode: ON',
    buttonText: 'Enter BRO Mode',
    color: {
      primary: '#6d28d9',
      secondary: '#4c1d95'
    }
  },
  {
    id: 3,
    name: 'Plant Daddy',
    emoji: '🌱',
    description: 'your green buddies deserve love',
    buttonText: 'Grow Together',
    color: {
      primary: '#059669',
      secondary: '#065f46'
    }
  },
  {
    id: 4,
    name: 'Fantasy NPC',
    emoji: '🧙',
    description: 'quests, riddles, and wisdom await',
    buttonText: 'Begin Quest',
    color: {
      primary: '#7c3aed',
      secondary: '#5b21b6'
    }
  },
  {
    id: 5,
    name: 'Kitchen Goblin',
    emoji: '🍕',
    description: 'chaotic cooking tips (maybe edible)',
    buttonText: 'Enter Kitchen',
    color: {
      primary: '#ea580c',
      secondary: '#9a3412'
    }
  },
  {
    id: 6,
    name: 'Meme Bot',
    emoji: '😂',
    description: 'for laughs, roasts, and Gen-Z chaos',
    buttonText: 'Start Memeing',
    color: {
      primary: '#db2777',
      secondary: '#9d174d'
    }
  }
];

export const moodQuestions = [
  {
    question: "How are you feeling right now?",
    subtext: "Let's start by understanding your current mood...",
    options: [
      { text: "Need someone to talk to", score: { Therapist: 3 } },
      { text: "Ready to crush it! 💪", score: { "Gym Bro": 3 } },
      { text: "Seeking peace and growth", score: { "Plant Daddy": 2, "Therapist": 1 } },
      { text: "Looking for adventure", score: { "Fantasy NPC": 2 } }
    ]
  },
  {
    question: "What would make you smile right now?",
    subtext: "Sometimes the smallest things bring the biggest joy...",
    options: [
      { text: "A good laugh 😂", score: { "Meme Bot": 3 } },
      { text: "Creating something fun", score: { "Kitchen Goblin": 2 } },
      { text: "Words of wisdom", score: { "Fantasy NPC": 2, "Therapist": 1 } },
      { text: "Achievement unlocked! 🏆", score: { "Gym Bro": 2 } }
    ]
  },
  {
    question: "Pick your vibe:",
    subtext: "Choose what resonates with your soul right now...",
    options: [
      { text: "Chaos and creativity 🎨", score: { "Kitchen Goblin": 3, "Meme Bot": 1 } },
      { text: "Growth and nurturing 🌱", score: { "Plant Daddy": 3, "Therapist": 1 } },
      { text: "Energy and motivation 🔥", score: { "Gym Bro": 3 } },
      { text: "Mystery and wonder ✨", score: { "Fantasy NPC": 3 } }
    ]
  }
]; 