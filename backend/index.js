const express = require('express');

const userRouters = require('./routes/users');

const PORT = 3030;

const app = express();

// Parse JSON-encoded data in incoming HTTP requests.
app.use(express.json());
// CORS Configuration
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Routes
app.use('/users', userRouters);

app.listen(PORT, () => console.log(`The server is running on Port (${PORT})`));
