import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  image_url: number;
  category: string;
  description: string;
  quantityInStock: number;
  visibility: boolean;
  specifications: [
    {
      name: string;
      price: number;
    }
  ];
  createdAt: Date;
  updatedAt: Date;
}

const specificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image_url: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    quantityInStock: {
      type: Number,
      required: true,
    },
    visibility: {
      type: Boolean,
      default: true,
    },
    specifications: {
      type: [specificationSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
