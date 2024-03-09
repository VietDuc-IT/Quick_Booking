import Category from "../models/category.model";

// [POST] /api/category
export const create = async (req, res) => {
  const { name, value } = req.body;

  if (!name || !value) {
    return res.status(400).json({ message: "Không được để trống!" });
  }

  const newCate = await new Category({
    ...req.body,
  });

  try {
    // Save user to DB
    await newCate.save();
    return res.status(200).json({ message: "Thêm thành công!" });
  } catch (err) {
    return res.status(500).json({ message: "Thêm thất bại!", err });
  }
};

// [GET] /api/category
export const view = async (req, res) => {
  try {
    const data = await Category.find();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: "Bạn gặp lỗi!", err });
  }
};

// [PUT] /api/category/:cateId
export const edit = async (req, res) => {
  const { name, value } = req.body;

  if (!name || !value) {
    return res.status(400).json({ message: "Không được để trống!" });
  }

  try {
    await Category.findByIdAndUpdate(
      req.params.cateId,
      {
        $set: {
          name,
          value,
        },
      },
      { new: true }
    );

    return res.status(200).json({ message: "Cập nhật thành công!" });
  } catch (err) {
    return res.status(500).json({ message: "Cập nhật thất bại!" });
  }
};

// [DELETE] /api/category/:cateId
export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.cateId);
    return res.status(200).json({ message: "Xóa thành công!" });
  } catch (err) {
    return res.status(500).json({ message: "Xóa thất bại!" });
  }
};
