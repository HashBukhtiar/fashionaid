const { VertexAI } = require('@google-cloud/vertexai');
const readline = require('readline');

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({ project: 'looksmaxxer', location: 'northamerica-northeast1' });
const model = 'gemini-1.5-flash-001';

const textsi_1 = {
  text: `State everything possible about what the person is wearing in this JSON format. Try to find the most dominant hex code.
  {article1: color1, article2: color2} 
  
  For example:
  {shirt: #333333, pants: #d9b68a}`
};

// Instantiate the models
const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generationConfig: {
    maxOutputTokens: 8192,
    temperature: 1,
    topP: 0.95,
  },
  safetySettings: [
    {
      category: 'HARM_CATEGORY_HATE_SPEECH',
      threshold: 'OFF',
    },
    {
      category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
      threshold: 'OFF',
    },
    {
      category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      threshold: 'OFF',
    },
    {
      category: 'HARM_CATEGORY_HARASSMENT',
      threshold: 'OFF',
    }
  ],
  systemInstruction: {
    parts: [textsi_1]
  },
});

const chat = generativeModel.startChat({});

async function sendMessage(message) {
  try {
    const streamResult = await chat.sendMessageStream(message);
    const response = (await streamResult.response).candidates[0].content;
    process.stdout.write('Stream result: ' + JSON.stringify(response) + '\n');
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

async function generateContent() {
  const samplePrompts = [
    "https://drive.google.com/file/d/15_FHnuF9wlMBDBdTsCUS0ZB5T7SCEoAw/view?usp=sharing",
    "https://drive.google.com/file/d/1_AuLFWE9N8eYDHHrNNsjK5E7fiA_6G8x/view?usp=sharing"
  ];

  for (const prompt of samplePrompts) {
    console.log(`Sending prompt: "${prompt}"`);
    await sendMessage(prompt);
  }
}

generateContent();