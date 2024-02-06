import { userModel } from "../models/userModel";

// [GET] /user/
export const getAllUser = async (req, res) => {
  try {
    const user = await userModel.find();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// [DELETE] /user/:id
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await userModel.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json("User not found!");
    }

    return res.status(200).json("Delete Success!");
  } catch (err) {
    return res.status(500).json(err);
  }
};
