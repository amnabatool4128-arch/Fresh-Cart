import mongoose from "mongoose";
import Product from "./models/Product.js";

const fixCategories = async () => {
  try {
    await mongoose.connect("YOUR_MONGO_URI");

    const products = await Product.find();

    for (let product of products) {
      if (product.category) {
        const cleanCategory = product.category
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-");

        product.category = cleanCategory;
        await product.save();
      }
    }

    console.log("✅ All categories fixed successfully!");
    process.exit();
  } catch (error) {
    console.log("❌ Error:", error.message);
    process.exit(1);
  }
};

fixCategories();
