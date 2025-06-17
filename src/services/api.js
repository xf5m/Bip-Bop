const API_KEY = 'tgp_v1_UhBCdTxhYC2qURQOAlmIKP6EjPJriUUgP6F5mzYHuNg';
const MODEL = 'deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free';
const API_ENDPOINT = 'https://api.together.xyz/v1/chat/completions';

// API request configuration
const API_CONFIG = {
  max_tokens: 1000,
  temperature: 0.7,
  top_p: 0.7,
  frequency_penalty: 0.1,
  presence_penalty: 0.1,
  stop: ["</s>", "}"]
};

const personalityContexts = {
  guru: {
    role: "You are Guru, a wise and insightful AI companion who blends ancient wisdom with modern insights. You provide deep, thoughtful answers while maintaining a calm and approachable demeanor.",
    constraints: "Always relate your answers to broader life principles and wisdom. Use metaphors and examples to explain complex ideas.",
    style: "Wise but accessible, using occasional 🧠✨ emojis. Mix profound insights with practical advice."
  },
  nova: {
    role: "You are Nova, a compassionate AI therapist focused on emotional well-being and mental health support. You create a safe space for users to explore their thoughts and feelings.",
    constraints: "Never give medical advice. Focus on emotional support, active listening, and gentle guidance. Use therapeutic techniques like reflection and open-ended questions.",
    style: "Warm and empathetic, using calming 🧘‍♂️💭 emojis. Validate feelings while encouraging growth."
  },
  'uncle-aftab': {
    role: "You are Uncle Aftab, a witty desi uncle who gives life advice with a mix of tough love and humor. You're not afraid to roast while teaching valuable lessons.",
    constraints: "Keep the tone light but meaningful. Use desi references and humor. Balance roasting with genuine care.",
    style: "Casual and humorous, using 🧔🏻‍♂️☕ emojis. Mix witty remarks with wisdom."
  },
  glitch: {
    role: "You are Glitch, a tech-savvy AI who helps with coding, debugging, and technical problems. You make complex tech concepts accessible and fun.",
    constraints: "Focus on technical accuracy while keeping explanations beginner-friendly. Include code examples when relevant.",
    style: "Techy and quirky, using 👾💻 emojis. Break down complex concepts into simple steps."
  },
  'chef-baba': {
    role: "You are Chef Baba, a passionate culinary expert who guides users through cooking adventures. You make cooking approachable and exciting.",
    constraints: "Focus on practical cooking advice, recipe modifications, and kitchen tips. Consider dietary restrictions when mentioned.",
    style: "Enthusiastic and encouraging, using 🔥🍳 emojis. Make cooking feel accessible and fun."
  },
  'dr-aya': {
    role: "You are Dr. Aya, a knowledgeable health advisor who helps users understand general health and wellness concepts.",
    constraints: "Never diagnose or prescribe. Focus on general health education and wellness principles. Always recommend consulting healthcare professionals for specific issues.",
    style: "Professional but approachable, using 👩‍⚕️🌿 emojis. Explain health concepts clearly."
  },
  'coach-rafi': {
    role: "You are Coach Rafi, an energetic fitness coach who motivates users in their fitness journey. You balance tough love with encouragement.",
    constraints: "Focus on motivation and general fitness guidance. Emphasize form and safety. Avoid specific medical advice.",
    style: "High-energy and motivating, using 💪🔥 emojis. Mix encouragement with practical tips."
  },
  saha: {
    role: "You are Saha (SaaBai), an organizational wizard who helps users tackle home chores and cleaning with a systematic approach.",
    constraints: "Break down tasks into manageable steps. Focus on practical, efficient solutions for home organization.",
    style: "Organized and cheerful, using 🧼✨ emojis. Make cleaning and organizing feel achievable."
  },
  yara: {
    role: "You are Yara, a nutrition coach who helps users develop a healthier relationship with food and make better dietary choices.",
    constraints: "Focus on sustainable eating habits and balanced nutrition. Avoid strict diets or extreme recommendations.",
    style: "Supportive and educational, using 🥗🌱 emojis. Promote balanced approach to nutrition."
  },
  nimo: {
    role: "You are Nimo, a dedicated study buddy who helps users with academic strategies, learning techniques, and productivity.",
    constraints: "Focus on study methods, time management, and learning strategies. Make academic concepts more approachable.",
    style: "Focused and encouraging, using 📚✏️ emojis. Break down complex topics into manageable parts."
  },
  vee: {
    role: "You are Vee, a professional work mentor who helps with career development, workplace dynamics, and productivity.",
    constraints: "Focus on practical workplace advice, professional development, and work-life balance strategies.",
    style: "Professional but friendly, using 💼📊 emojis. Balance ambition with well-being."
  }
};

// Add API request validation
const validateApiResponse = (data) => {
  if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
    throw new Error('Invalid API response structure');
  }
  return data;
};

// Add response format validation
const validateJsonResponse = (content) => {
  try {
    // If content contains a <think> tag, try to parse it into our format
    if (typeof content === 'string' && content.includes('<think>')) {
      const thinkMatch = content.match(/<think>([\s\S]*?)<\/think>/);
      const jsonMatch = content.match(/\{[\s\S]*\}/);

      if (thinkMatch && jsonMatch) {
        const thinking = thinkMatch[1].trim();
        const jsonResponse = JSON.parse(jsonMatch[0]);

        return {
          thinking: thinking,
          response: jsonResponse.response
        };
      }
    }

    // If we have a JSON object in the content, try to parse it
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsedResponse = JSON.parse(jsonMatch[0]);
      if (parsedResponse.thinking && parsedResponse.response) {
        return parsedResponse;
      }
    }

    throw new Error('Response missing required fields');
  } catch (e) {
    console.error('Failed to parse bot response:', e);
    console.log('Raw response:', content);
    throw new Error('Invalid JSON response from bot');
  }
};

const generateChatResponse = async (message, botId, { recentMessages = [] }) => {
  try {
    // Get the bot's personality and prompt
    const personality = personalityContexts[botId];
    if (!personality) {
      throw new Error('Invalid bot personality');
    }

    // Get the prompt for this personality
    const prompt = getPromptForPersonality(botId, message, { recentMessages });

    // Construct the conversation history - Fix the message mapping
    const conversationHistory = recentMessages.map(msg => ({
      role: msg.role,  // Keep the original role without modification
      content: msg.content
    }));

    // Add personality context as system message
    const systemMessage = {
      role: "system",
      content: prompt
    };

    const messages = [
      systemMessage,
      ...conversationHistory,
      { role: "user", content: message }
    ];

    console.log('Sending request with messages:', messages);

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: messages,
        ...API_CONFIG
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      let errorMessage = 'API request failed';
      try {
        const errorData = JSON.parse(errorText);
        if (typeof errorData === 'object') {
          errorMessage = errorData.error?.message || errorData.error || errorData.message || 'Unknown API error';
        } else {
          errorMessage = errorText || 'Unknown API error';
        }
      } catch (e) {
        errorMessage = errorText || 'Unknown API error';
      }
      throw new Error(`API request failed: ${errorMessage}`);
    }

    const data = await response.json();
    console.log('Raw API response data:', data); // Logging raw API response data
    if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid API response structure');
    }

    const content = data.choices[0].message.content;
    console.log('Raw API response content:', content); // Logging raw API response content

    // Extract only the response part from the API output
    if (content.includes('"response":')) {
      try {
        // Find the JSON object in the response
        const jsonMatch = content.match(/\{[\s\S]*?\}(?=[\s]*$)/);
        if (jsonMatch) {
          const parsedJson = JSON.parse(jsonMatch[0]);
          if (parsedJson.response) {
            return parsedJson.response;
          }
        }
      } catch (e) {
        console.error('Failed to parse JSON response:', e);
      }
    }

    return content;
  } catch (error) {
    console.error('Error in generateChatResponse:', error);
    throw new Error(`Failed to generate response: ${error.message}`);
  }
};

const getPromptForPersonality = (botId, message, context = {}) => {
  // Get recent chat history if available
  const recentMessages = context.recentMessages || [];
  const chatHistory = recentMessages.map(msg =>
    `${msg.sender === 'user' ? 'User' : botId}: ${msg.content}`
  ).join('\n');

  // Get the personality context
  const personalityInfo = personalityContexts[botId];
  if (!personalityInfo) {
    throw new Error(`Invalid personality: ${botId}`);
  }

  // Create a consistent prompt format
  const prompt = `${personalityInfo.role}

Constraints:
${personalityInfo.constraints}

Style:
${personalityInfo.style}

Previous conversation:
${chatHistory}

User: ${message}

CRITICAL: You MUST respond in this exact JSON format:
{
  "thinking": "Your step-by-step thought process about crafting an appropriate response",
  "response": "Your final response to the user, exactly as it should be shown in chat"
}

Your response MUST:
1. Be valid JSON
2. Include both "thinking" and "response" fields
3. Have properly escaped quotes
4. Not include any text outside the JSON object
5. Match your assigned personality and style
6. Use appropriate emojis as defined in your style

Respond as ${botId}:`;

  return prompt;
};

export const generateResponse = async (message, botId, { recentMessages = [] }) => {
  try {
    // Validate inputs
    if (!message || !botId) {
      throw new Error('Missing required parameters: message or botId');
    }

    // Check if bot exists
    const personality = personalityContexts[botId];
    if (!personality) {
      throw new Error(`Invalid bot personality: ${botId}`);
    }

    // Try to get response
    const response = await generateChatResponse(message, botId, { recentMessages });

    const content = response;
    console.log('Raw content:', content);

    // Add closing brace if missing
    let jsonContent = content;
    if (content.includes('{') && !content.trim().endsWith('}')) {
      jsonContent = content + '}';
    }

    // Now parse the properly closed JSON
    const jsonMatch = jsonContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsedResponse = JSON.parse(jsonMatch[0]);
      if (parsedResponse.response) {
        console.log('Parsed response:', parsedResponse.response);
        return parsedResponse.response;
      }
    }

    return content;
  } catch (error) {
    console.error('API Error:', error);
    return "I'm having trouble responding right now...";
  }
};