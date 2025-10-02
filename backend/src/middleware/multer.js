const multer = require('multer');
const path = require('path');

// Configure multer to use memory storage, as we are uploading directly to Cloudinary
module.exports = multer({
  storage: multer.diskStorage({}), // An empty disk storage object will save to a temp dir
  fileFilter: (req, file, cb) => {
    // Allow only specific image and video file types
    let ext = path.extname(file.originalname).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.mp4', '.mov', '.avi'].includes(ext)) {
      return cb(new Error('File type is not supported'), false);
    }
    cb(null, true);
  },
});