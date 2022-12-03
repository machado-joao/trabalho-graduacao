import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    publisher: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    gender: { type: String, required: true },
    sellCount: { type: Number, required: false, default: 0 },
    descount: { type: Number, required: false, default: 1 },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
