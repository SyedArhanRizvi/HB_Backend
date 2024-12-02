import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Service title
  description: { type: String, required: true }, // Description of the service
  image: { type: String, required: true }, // Image URL for the service
  createdAt: { type: Date, default: Date.now } // Timestamp for the entry
});

export default mongoose.model('Service', ServiceSchema);
