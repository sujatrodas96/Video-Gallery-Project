// video-gallery-backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const connection = require('./DB/conn.js');
const port = process.env.PORT || 5000;
const authRoutes = require('./Routes/user');
const videoRoutes = require('./Routes/video');

dotenv.config();
const app = express();

const errorHandler = require('./Middleware/errorHandler.js');
app.use(errorHandler);


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);

connection
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(port, () => {
      console.log(` Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
