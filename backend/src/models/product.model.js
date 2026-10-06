import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 100
    },

    description: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 1000
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    stock: {
      type: Number,
      min: 0,
      default: 0
    },

    category: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 100
    },

    sizes: {
      type: [String],
      required: true,
      enum: ["XS", "S", "M", "L", "XL", "XXL"]
    },

    images: {
      type: [String],
      required: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const productModel = mongoose.model("Product", productSchema);

export default productModel;
