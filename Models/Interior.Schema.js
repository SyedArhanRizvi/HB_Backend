import mongoose from 'mongoose';

const InteriorWorkSchema = new mongoose.Schema({
  clientName: { type: String },
  clientReview : {type: String},
  interiorTitle: { type: String, required: true },
  interiorDetails: { type: String, required: true },
  interiorImages: [{ type: Array, required: true }], // Array of image URLs
  createdAt: { type: Date, default: Date.now }
});

export const InteriorWorkModel = mongoose.model('InteriorWork', InteriorWorkSchema);
