import mongoose from "mongoose";

const heroSecSchema = new mongoose.Schema({
  image: {
    type: String, // URL of the image (stored as a string)
    required: true,
  },
  title: {
    type: String, // Title of the section
    required: true// Optional: Limit the title length
  },
  description: {
    type: String, // Description of the title
    required: true, // Optional: Limit the description length
  },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps automatically

export const HeroSecModel = mongoose.model("HeroSection", heroSecSchema);


