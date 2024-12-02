import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Upload to Cloudinary
export const uploadImageToCloudinary = (file, index) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({
      public_id: `image${Date.now()}_${index + 1}`, // Custom public_id
      resource_type: 'auto', // Detect the resource type (image/video)
    }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    }).end(file.buffer);
  });
};














//  <input type="file" name="images" accept="image/*" multiple>