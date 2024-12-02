import mongoose from "mongoose";

const FurnitureSchema = new mongoose.Schema({
  clientName: { type: String },
  furnitureName: { type: String, required: true }, // Name of the furniture (e.g., Chair, Table)
  furnitureType: { type: String, required: true }, // Type (e.g., Wooden, Metal, etc.)
  furnitureDetails: { type: String, required: true }, // Detailed description
  furnitureImages: [{ type: Array, required: true }], // Array of image URLs
  priceRange: { type: String, required: true }, // Price range or estimated cost
  createdAt: { type: Date, default: Date.now },
});

export const FurnitureModel =  mongoose.model("Furniture", FurnitureSchema);
