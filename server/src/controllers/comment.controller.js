import Comment from "../models/comment.model";
import { removeField } from "../utils/removeFieldInObj";
// [POST] /api/comment
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

// [GET] /api/comment/:postId
export const view = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate("userId", {
        _id: 1,
        username: 1,
        profilePicture: 1,
      })
      .sort({
        createAt: -1,
      });

    return res.status(200).json(comments);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// [PUT] /api/comment/like/:commentId
export const likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Bình luận không tồn tại!" });
    }

    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }

    await comment.save();

    return res.status(200).json(comment);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// [PUT] /api/comment/edit/:commentId
export const editComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Bình luận không tồn tại!" });
    }

    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Bạn không được phép!" });
    }

    const editComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );

    return res.status(200).json({ message: "Sửa bình luận thành công!" });
  } catch (err) {
    res.status(500).json({ message: "Sửa bình luận thất bại!" });
  }
};

// [DELETE] /api/comment/:commentId
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Bình luận không tồn tại!" });
    }

    if (
      comment.userId.toString() !== req.user.id ||
      req.user.role !== "Admin"
    ) {
      return res.status(403).json({ message: "Bạn không được phép!" });
    }

    await Comment.findByIdAndDelete(req.params.commentId);

    return res.status(200).json({ message: "Xóa bình luận thành công!" });
  } catch (err) {
    return res.status(500).json({ message: "Xóa bình luận thất bại!" });
  }
};
