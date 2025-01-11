const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static images
app.use('/images', express.static(path.join(__dirname, 'images'), {
  fallthrough: false,
}));

// 404 handler for /images routes
app.use('/images', (req, res) => {
  res.status(404).send('Image not found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Image server running at http://localhost:${PORT}/images`);
});