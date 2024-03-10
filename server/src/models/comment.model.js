import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Post",
    },
    content: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
