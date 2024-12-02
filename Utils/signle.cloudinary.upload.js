import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });
export const singlePhotoUploadOnCloud = async (photo) => {
  try {
    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(photo);

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url(uploadResult, {
      fetch_format: "auto",
      quality: "auto",
    });

    console.log(optimizeUrl);

    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url(uploadResult, {
      crop: "auto",
      gravity: "auto",
      width: 500,
      height: 500,
    });

    console.log(autoCropUrl);
    return uploadResult.url;
  } catch (error) {
    console.log(
      "There are some errors in your cloudinary upload so plz fix the bug first ",
      error
    );
  }
};
