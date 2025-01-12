const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

// Allow requests from the frontend domain
app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    methods: ["GET", "POST"],
  })
);

// Increase the body size limit to allow larger payloads
app.use(express.json({ limit: "10mb" })); // Increase the limit as needed

// For handling multipart data (like images), you can use a package like `multer`
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.post("/api/send_message", async (req, res) => {
  const { userInput, selectedImage } = req.body;
  console.log("User input:", userInput);
  console.log("Selected image:", selectedImage);

  try {
    const response = await axios.post("http://localhost:5001/api/analyze_image", {
      selectedImage,
    });

    const analysis = response.data.analysis;
    res.json({ response: { content: analysis } });
  } catch (error) {
    console.error("Error forwarding to Python backend:", error);
    res.status(500).json({ error: "Error processing image" });
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});