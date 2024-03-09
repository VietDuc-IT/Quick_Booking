import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    value: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", postSchema);

export default Category;
