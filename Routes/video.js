const express = require('express');
const videoRoutes = express.Router();
const auth = require('../Middleware/auth');
const upload = require('../utils/multerstorage');
const { uploadvideo, getVideos, viewVideo, updateVideo, deleteVideo } = require('../controllers/Video');

// Upload video
videoRoutes.post('/upload', auth, upload.single('video'), uploadvideo);

// Fetch videos with views + filters
videoRoutes.get('/', auth, getVideos);

// View a video and increment view count
videoRoutes.get('/:id', auth, viewVideo);

// Update video
videoRoutes.patch('/:id', auth, updateVideo);

videoRoutes.delete('/:id', auth, deleteVideo);

module.exports = videoRoutes;