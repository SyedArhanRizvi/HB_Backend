import mongoose from 'mongoose';

const ServiceVideoSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the service video
  videoUrl: { type: String, required: true }, // URL of the video
  description: { type: String, required: true }, // Description of the service video
  createdAt: { type: Date, default: Date.now } // Timestamp for the entry
});

export const VideoModel =  mongoose.model('ServiceVideo', ServiceVideoSchema);
// title,videoUrl,description