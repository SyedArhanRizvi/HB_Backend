import multer from 'multer';

// Store uploaded files in memory for further processing (e.g., uploading to Cloudinary)
const storage = multer.memoryStorage();

// Configure Multer to handle multiple fields
export const upload = multer({ storage }).fields([
  { name: 'url', maxCount: 12 }, // Up to 12 images
  { name: 'video', maxCount: 4 }, // Single video file (optional)
]);

