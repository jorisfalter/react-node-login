const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;
const SECRET_KEY = process.env.SECRET_KEY || "your_jwt_secret_key"; // Use environment variables in production

const users = []; // In-memory user storage for simplicity

app.use(cors());
app.use(express.json());
app.use(express.static('public'))


// User registration route
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).send("User registered");
  console.log("registered");
});

// User login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (user && (await bcrypt.compare(password, user.password))) {
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
