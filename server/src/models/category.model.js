import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    location: {
      type: Array,
      default: ["Thủ Đức", "Q1", "Q2", "Q10"],
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", postSchema);

export default Category;
