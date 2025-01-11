const fs = require('fs');
const path = require('path');

function convertImageToInlineData(filePath, mimeType) {
  const absolutePath = path.join(__dirname, '..', 'images', 'image1.jpg');
  const imageBuffer = fs.readFileSync(absolutePath);
  const base64Data = imageBuffer.toString('base64');
  return {
    inlineData: {
      mimeType,
      data: base64Data,
    },
  };
}

module.exports = { convertImageToInlineData };

// Example usage
const image1_1 = convertImageToInlineData('', 'image/jpeg');
fs.writeFileSync('output.txt', JSON.stringify(image1_1, null, 2));