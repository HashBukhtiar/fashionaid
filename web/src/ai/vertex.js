const { VertexAI } = require('@google-cloud/vertexai');
const path = require('path');
const fs = require('fs');
const { convertImageToInlineData } = require('./image');
const { spawn } = require('child_process'); // Import child_process module

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({ project: 'hlthy-421200', location: 'northamerica-northeast1' });
const model = 'gemini-1.5-flash-001';

const textsi_1 = {
  text: `State everything possible about what the person is wearing in this JSON format. Use double quotes for keys and values. Try to find the most dominant hex code.
{"article1": "color1", "article2": "color2"}

For example:
{"shirt": "#333333", "pants": "#d9b68a"}`
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
    { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'OFF' },
    { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'OFF' },
    { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'OFF' },
    { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'OFF' }
  ],
  systemInstruction: {
    parts: [textsi_1]
  },
});

// Convert image to inline data
const image1_1 = convertImageToInlineData('', 'image/jpeg');

const chat = generativeModel.startChat({});

// Function to send message and handle response
async function sendMessage(messages) {
  try {
    const streamResult = await chat.sendMessageStream(messages);
    const response = await streamResult.response;

    // Log the entire response for debugging
    console.log('Full Response:', JSON.stringify(response, null, 2));

    // Access the content within candidates[0].content.parts[0].text
    const candidates = response.candidates;
    if (!candidates || candidates.length === 0) {
      console.error('No candidates found in the response.');
      return;
    }

    const content = candidates[0].content;
    if (!content || !content.parts || content.parts.length === 0) {
      console.error('No parts found in the content.');
      return;
    }

    const responseText = content.parts[0].text.trim();
    console.log('Extracted Response Text:', responseText);

    // Extract JSON string from the response
    const jsonStringMatch = responseText.match(/\{.*\}/);
    if (jsonStringMatch) {
      let jsonString = jsonStringMatch[0];
      
      // Ensure the JSON string uses double quotes
      jsonString = jsonString.replace(/'/g, '"');

      // Call the Python script with the JSON string
      callPythonScript(jsonString);
    } else {
      console.error('No JSON found in the response.');
    }
  } catch (error) {
    console.error('Error while sending message:', error);
  }
}

// Function to call Python script
function callPythonScript(jsonString) {
  // Path to the Python script
  const scriptPath = path.join(__dirname, 'process_response.py');
  
  // Spawn a new child process to run the Python script
  const pythonProcess = spawn('python3', [scriptPath, jsonString]);

  // Handle stdout from the Python script
  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python Output:\n${data}`);
  });

  // Handle stderr from the Python script
  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python Error:\n${data}`);
  });

  // Handle script exit
  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      console.log(`Python script exited with code ${code}`);
    }
  });
}

// Generate content by sending messages
async function generateContent() {
  await sendMessage([
    textsi_1,
    image1_1
  ]);
}

generateContent();