const express = require("express");
const app = express();
const cors = require("cors");

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

app.post("/api/send-message", (req, res) => {
  console.log("Message received:", req.body);
  res.sendStatus(200); // Respond after processing
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
