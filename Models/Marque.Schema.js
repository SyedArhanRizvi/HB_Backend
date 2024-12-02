import mongoose from 'mongoose';

const MarqueeSchema = new mongoose.Schema({
  sentence: { type: String, required: true }, // A single sentence for the marquee
  images: [{ type: Array, required: true }], // Array of image URLs
  createdAt: { type: Date, default: Date.now } // Timestamp for the entry
});

export const MarqueModel = mongoose.model('Marquee', MarqueeSchema);
// sentence,images