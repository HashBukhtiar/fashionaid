const fs = require('fs');
const path = require('path');

function convertInlineDataToImage(inputFilePath, outputFilePath) {
  const jsonData = fs.readFileSync(inputFilePath, 'utf-8');
  const { inlineData } = JSON.parse(jsonData);
  const imageBuffer = Buffer.from(inlineData.data, 'base64');
  fs.writeFileSync(outputFilePath, imageBuffer);
}

// Example usage
convertInlineDataToImage('output.txt', path.join(__dirname, '..', '..', 'images', 'image1_reconstructed.jpg'));
console.log('Image has been reconstructed and saved.');