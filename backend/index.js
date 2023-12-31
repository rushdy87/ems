const express = require('express');

const sequelize = require('./utils/db');

const userRoutes = require('./routes/users');
const unitRoutes = require('./routes/units');
const workdayRoutes = require('./routes/work_day');
const jobTitlesRoutes = require('./routes/job_titles');

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
app.use('/users', userRoutes);
app.use('/units', unitRoutes);
app.use('/workday', workdayRoutes);
app.use('/job-titles', jobTitlesRoutes);

sequelize.sync();

app.listen(PORT, () => console.log(`The server is running on Port (${PORT})`));
