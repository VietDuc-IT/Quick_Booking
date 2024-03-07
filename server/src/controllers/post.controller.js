import Post from "../models/post.model";

// [POST] /api/post
export const createPost = async (req, res) => {
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
    return res.status(200).json({ message: "Đăng bài thành công!" });
  } catch (err) {
    return res.status(500).json({ message: "Đăng bài thất bại!", err });
  }
};

// [GET] /api/post
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

// [GET] /api/post/private
export const getPostSystem = async (req, res) => {
  const { role, id } = req.user;
  if (role === "Admin") {
    const Posts = await Post.find().populate("userId");
    return res.status(200).json({ Post: Posts });
  }

  if (role === "User") {
    const Posts = await Post.find({ userId: id }).populate("userId");
    return res.status(200).json({ Post: Posts });
  }
};

// [PUT] /api/post/:postId/:id
export const updatePost = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.postId, req.body, { new: true });
    res.status(200).json({ message: "Cập nhật bài đăng thành công!" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Cập nhật bài đăng thất bại!", err });
  }
};

// [DELETE] /post/:postId
export const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json({ message: "Xóa bài đăng thành công!" });
  } catch (err) {
    return res.status(500).json({ message: "Xóa bài đăng thất bại!" });
  }
};

// [PUT] /api/post/status/:postId
export const statusPost = async (req, res) => {
  if (req.body.status === "Chờ duyệt") {
    req.body.status = "Bình thường";
  } else {
    req.body.status = "Chờ duyệt";
  }

  try {
    await Post.findByIdAndUpdate(
      req.params.postId,
      { $set: { status: req.body.status } },
      { new: true }
    );

    return res.status(200).json({ message: "Cập nhật trạng trái thành công!" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Cập nhật trạng trái thất bại!", err });
  }
};
