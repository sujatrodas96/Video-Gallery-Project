const auth = require('../Middleware/auth');
const Video = require('../Models/video');
const { success, error } = require('../utils/responseHandler');
const path = require('path');
const fs = require('fs');

async function uploadvideo(req, res) {
  try {
    const video = new Video({
      title: req.body.title,
      description: req.body.description,
      url: `/uploads/${req.file.filename}`,
      filename: req.file.filename,          
      uploadedBy: req.user._id
    });

    await video.save();
    return success(res, `Video Added Successfully`, video);
    //res.status(201).json({message:"Video Added Succesfully", video});
  } catch (err) {
    return error(res, "Something went wrong" , err.message);
    //res.status(400).json({ error: err.message });
  }
}

async function getVideos(req, res) {    
     try {
    const minViews = isNaN(parseInt(req.query.minViews)) ? 0 : parseInt(req.query.minViews);
    const maxViews = isNaN(parseInt(req.query.maxViews)) ? Infinity : parseInt(req.query.maxViews);
    const sortOrder = req.query.sort === 'asc' ? 1 : -1;
    const page = isNaN(parseInt(req.query.page)) ? 1 : parseInt(req.query.page);
    const limit = isNaN(parseInt(req.query.limit)) ? 10 : parseInt(req.query.limit);
    const skip = (page - 1) * limit;

    const videos = await Video.find({
      viewCount: { $gte: minViews, $lte: maxViews }
    })
      .sort({ viewCount: sortOrder })
      .skip(skip)
      .limit(limit);
    return success(res, `Videos fetch succesfully based on the request`, videos);
    // res.status(200).json({message : "Videos fetch succesfully based on the request", videos});
  } catch (err) {
    return error(res, "Something went wrong", err.message);
    //res.status(500).json({ error: err.message });
  }
}

async function viewVideo(req, res) {
    try {
        const video = await Video.findById(req.params.id);
        
        if (!video) return res.status(404).json({ message: 'Video not found' });
        if (video.uploadedBy.toString() !== req.user._id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        video.viewCount++;
        await video.save();
        return success(res, `Video views incremented successfully`, video);
    } catch (err) {
        return error(res, 'Error viewing video', err.message);
        //res.status(500).json({ error: err.message });
    }
}

async function updateVideo(req, res) {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).json({ message: 'Video not found' });
        if (video.uploadedBy.toString() !== req.user._id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        const { title, description } = req.body;
        if (title) video.title = title;
        if (description) video.description = description;
        await video.save();
        return success(res, `Video updated successfully`, video);
        //res.status(200).json({ message: 'Video updated successfully', video });
    } catch (err) {
        return error(res, 'Error updating video', err.message);
        //res.status(500).json({ error: err.message });
    }
}

async function deleteVideo(req, res) {
    try {   
        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).json({ message: 'Video not found' });
        if (video.uploadedBy.toString() !== req.user._id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }   
        await Video.deleteOne({ _id: req.params.id });
        // Optionally, delete the video file from the server
        const videoPath = path.join(__dirname, '../uploads', video.filename);
        fs.unlink(videoPath, (err) => {
            if (err) console.error('Error deleting video file:', err);
        });
        return success(res, `Video deleted successfully`);
        //res.status(200).json({ message: 'Video deleted successfully' });
    }
    catch (err) {
        return error(res, 'Error deleting video', err.message);
        //res.status(500).json({ error: err.message });
    }
}

module.exports = {
    uploadvideo,
    getVideos,
    viewVideo,
    updateVideo,
    deleteVideo
};