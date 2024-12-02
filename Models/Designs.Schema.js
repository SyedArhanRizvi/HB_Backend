import mongoose from 'mongoose';

const InteriorDesignSchema = new mongoose.Schema({
  designName: { type: String, required: true },
  designCategory: { type: String, required: true }, // Living Room, Bedroom, etc.
  designDetails: { type: String, required: true },
  designImages: [{ type: Array, required: true }], // Array of image URLs
  designerName : {type: String },
  createdAt: { type: Date, default: Date.now }
});

export const DesignModel =  mongoose.model('InteriorDesign', InteriorDesignSchema);
// GoBD5kSgGVEzDsiF  