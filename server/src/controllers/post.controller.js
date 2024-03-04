import Post from "../models/post.model";

// [POST] /post/create
export const postNew = async (req, res) => {
  if (req.user.role === "Admin") {
    var statusAdmin = "Bình thường";
  }
  const newPost = await new Post({
    ...req.body,
    status: statusAdmin,
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
export const getPosts = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const Posts = await Post.find({
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.status && { status: req.query.status }),
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.title && { title: req.query.title }),
      ...(req.query.adrress && { address: req.query.adrress }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $option: "i" } },
          { description: { $regex: req.query.searchTerm, $option: "i" } },
        ],
      }),
    })
      .populate("userId")
      .sort({
        updatedAt: sortDirection,
      })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    return res.status(200).json({ Post: Posts, totalPosts, lastMonthPosts });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// [PUT] /post/update/:postId/:id
export const updatePost = async (req, res) => {
  try {
    const updatePost = await Post.findByIdAndUpdate(
      req.params.postId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatePost);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// [DELETE] /post/delete/:postId/:id
export const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("The post has been deleted!");
  } catch (err) {
    return res.status(500).json(err);
  }
};

// [PUT] /post/status/:postId
export const statusPost = async (req, res) => {
  try {
    if (req.body.status === "Chờ duyệt") {
      req.body.status = "Bình thường";
    } else {
      req.body.status = "Chờ duyệt";
    }

    await Post.findByIdAndUpdate(
      req.params.postId,
      { $set: { status: req.body.status } },
      { new: true }
    );

    return res.status(200).json("Change status success");
  } catch (err) {
    return res.status(500).json(err);
  }
};
