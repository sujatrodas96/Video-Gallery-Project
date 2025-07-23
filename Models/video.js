const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    validate: {
      validator: function (v) {
        return /\.(mp4|mov|avi|mkv|wmv|flv|webm)$/.test(v.toLowerCase());
      },
      message: props => `${props.value} is not a supported video format!`
    }
  },
  filename: {
    type: String,
    required: true // e.g., "abc123.mp4"
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
