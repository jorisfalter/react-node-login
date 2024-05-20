const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(cors()); // Enable CORS
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
