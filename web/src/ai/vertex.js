const { VertexAI } = require('@google-cloud/vertexai');
const path = require('path');
const { convertImageToInlineData } = require('./image');

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({ project: 'hlthy-421200', location: 'northamerica-northeast1' });
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

// Convert image to inline data
const image1_1 = convertImageToInlineData('', 'image/jpeg');

const chat = generativeModel.startChat({});

async function sendMessage(messages) {
  const streamResult = await chat.sendMessageStream(messages);
  process.stdout.write('stream result: ' + JSON.stringify((await streamResult.response).candidates[0].content) + '\n');
}

async function generateContent() {
  await sendMessage([
    textsi_1,
    image1_1
  ]);
}

generateContent();