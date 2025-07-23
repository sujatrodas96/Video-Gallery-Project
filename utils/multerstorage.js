const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, Date.now() + ext);
  }
});

// File filter (optional)
const fileFilter = (req, file, cb) => {
  const allowed = ['.mp4', '.mov', '.avi'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowed.includes(ext)) {
    return cb(new Error('Only video files are allowed'), false);
  }
  cb(null, true);
};

// Limit size to 50MB (optional)
const limits = {
  fileSize: 50 * 1024 * 1024
};

// Export upload instance
const upload = multer({ storage, fileFilter, limits });

module.exports = upload;
