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

// [GET] /api/post/:postId || page detail
export const viewPost = async (req, res) => {
  try {
    const data = await Post.findById(req.params.postId).populate("userId", {
      password: 0,
      role: 0,
      createdAt: 0,
      updatedAt: 0,
    });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// [GET] /api/post
export const getPosts = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 8;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const posts = await Post.find({
      status: "Bình thường",
      ...(req.query.id && { _id: req.query.id }),
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.title && { title: req.query.title }),
      ...(req.query.adrress && { address: req.query.adrress }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { description: { $regex: req.query.searchTerm, $options: "i" } },
          { category: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .populate("userId", {
        password: 0,
        role: 0,
        createdAt: 0,
        updatedAt: 0,
      })
      .sort({
        updatedAt: sortDirection,
      })
      .skip(startIndex)
      .limit(limit);

    const cate = ["Nhà ở", "Căn hộ / Chung cư", "Phòng trọ"];

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

    return res.status(200).json({ totalPosts, lastMonthPosts, cate, posts });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// [GET] /api/post/v1/fillter
export const getpostfillter = async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "rating";
    let genre = req.query.genre || "All";

    const genreOption = ["Thủ Đức", "Quận 1", "Quận 2", "Quận 3", "Quận 4"];

    genre === "All"
      ? (genre = [...genreOption])
      : (genre = req.query.genre.split(","));

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    const posts = await Post.find({ title: { $regex: search, $option: "i" } })
      .where("genre")
      .in([...genre])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await Post.countDocuments({
      genre: { $in: [...genre] },
      title: { $regex: search, $option: "i" },
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      genres: genreOption,
      posts,
    };

    return res.status(200).json(response);
  } catch (err) {
    return res
      .status(500)
      .json({ err: true, message: "Internal Server Error" });
  }
};

// [GET] /api/post/private
export const getPostSystem = async (req, res) => {
  const { role, id } = req.user;

  try {
    if (role === "Admin") {
      const Posts = await Post.find().populate("userId", {
        password: 0,
      });
      return res.status(200).json({ Post: Posts });
    } else {
      const Posts = await Post.find({ userId: id }).populate("userId", {
        password: 0,
      });
      return res.status(200).json({ Post: Posts });
    }
  } catch (err) {
    return res.status(500).json(err);
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

// [DELETE] /api/post/:postId
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
