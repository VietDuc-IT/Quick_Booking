import User from "../models/user.model";
import bcrypt from "bcrypt";

// [GET] /user/
export const getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// [PUT] /user/update/:id

// [DELETE] /user/delete/:id
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json("User not found!");
    }
    return res.status(200).json("User has been deleted!");
  } catch (err) {
    return res.status(500).json(err);
  }
};
