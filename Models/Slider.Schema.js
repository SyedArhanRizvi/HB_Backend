import mongoose from 'mongoose';

const SliderSchema = new mongoose.Schema({
  url: { type: String, required: true }, // Image URL
  challenge: { type: String, required: true }, // Client's challenge or request
  result: { type: String, required: true }, // Outcome or result of the project
  clientName: { type: String, required: true }, // Name of the client
  createdAt: { type: Date, default: Date.now } // Timestamp for the entry
});

export const SlideModel = mongoose.model('Slider', SliderSchema);
