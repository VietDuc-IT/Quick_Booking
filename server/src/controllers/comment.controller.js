import Comment from "../models/comment.model";

export const create = async (req, res) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return res
        .status(400)
        .json({ message: "Bạn không được phép bình luận!" });
    }

    const newCommnet = new Comment({
      userId,
      postId,
      content,
    });
    await newCommnet.save();

    return res
      .status(200)
      .json({ message: "Bình luận thành công!", comment: newCommnet });
  } catch (err) {
    return res.status(500).json({ message: "Bình luận thất bại!" });
  }
};

export const view = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate("userId")
      .sort({
        createAt: -1,
      });

    return res.status(200).json(comments);
  } catch (err) {
    return res.status(500).json(err);
  }
};
