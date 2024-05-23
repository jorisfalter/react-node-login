const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;
const SECRET_KEY = process.env.SECRET_KEY || "your_jwt_secret_key"; // Use environment variables in production

const users = []; // In-memory user storage for simplicity

app.use(cors());
app.use(express.json());
// app.use(express.static("public"));
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../../frontend/build")));
// app.use(express.static(path.resolve(__dirname, "../client/build"))); from randomairport

// User registration route
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).send("User registered");
  console.log("registered");
});

// User login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (user && (await bcryptjs.compare(password, user.password))) {
    const token = jwt.sign({ username: user.username }, SECRET_KEY);
    res.json({ token });
    console.log("logged in");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// Protected route example
app.get("/protected", (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    res.json({ message: "Protected content", user: verified });
  } catch (err) {
    res.status(400).send("Invalid token");
  }
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
