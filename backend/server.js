const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4000;

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../frontend/build")));

// API endpoint
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.json({ message: "error!" });

  //   res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
