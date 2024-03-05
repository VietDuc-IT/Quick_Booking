import Category from "../models/category.model";

// [POST] cate/create
export const newCategory = async (req, res) => {
  const newCate = await new Category({
    ...req.body,
  });
  try {
    // Save user to DB
    await newCate.save();
    return res.status(200).json("Category new successful!");
  } catch (err) {
    return res.status(500).json(err);
  }
};
