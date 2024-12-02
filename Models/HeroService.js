import mongoose from 'mongoose';

const heroServiceSchema = new mongoose.Schema({
  serviceImage: {
    type: String, // URL or path to the image
    required: true, // Ensures the field is mandatory
    trim: true,
  },
  serviceName: {
    type: String,
    required: true
  },
  serviceDetails: {
    type: String
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create and export the model
export const HeroServiceModel = mongoose.model('HeroService', heroServiceSchema);
