import mongoose from 'mongoose';

const ModularKitchenSchema = new mongoose.Schema({
  clientName: { type: String },
  kitchenName: { type: String, required: true },
  kitchenDetails: { type: String, required: true },
  priceRange : {type:Number, required:true},
  kitchenImages: [{ type: Array, required: true }], // Array of image URLs
  createdAt: { type: Date, default: Date.now }
});

export const KitchenModel =  mongoose.model('ModularKitchen', ModularKitchenSchema);
