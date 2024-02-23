import Post from "../models/post.model";

// [POST] /post
export const postNew = async (req, res) => {
  const newPost = await new Post({
    ...req.body,
    userId: req.user.id,
  });
  try {
    // Save user to DB
    await newPost.save();
    return res.status(200).json("Post new successful!");
  } catch (err) {
    return res.status(500).json(err);
  }
};

// [GET] /post/get
export const getAllPost = async (req, res) => {
  try {
    const listPost = await Post.find().populate("userId");
    return res.status(200).json(listPost);
  } catch (err) {
    return res.status(500).json(err);
  }
};
