import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://cdnassets.hw.net/6a/9c/8c1fe2c24fda99c47ae1f196b2c7/docomomous-esherickhouse-04.jpg",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchema);

export default Post;
