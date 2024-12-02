import mongoose from 'mongoose';

const LatestProjectSchema = new mongoose.Schema({
  projectTitle: { type: String, required: true }, // Title of the project
  images: [{type:Array, required:true}],
  videoUrl:[ { type: Array, required: true }], // URL of the project video
  projectDetails: { type: String, required: true }, // Detailed description of the project
  createdAt: { type: Date, default: Date.now } // Timestamp for the entry
});

export const LatestProjModel = mongoose.model('LatestProject', LatestProjectSchema);
