import User from "../models/user.model";
import bcrypt from "bcrypt";
import RefreshToken from "../models/refreshToken.model";

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
    // Delete token
    const refreshToken = req.cookies.refresh_Token;
    await RefreshToken.findOneAndDelete({ token: refreshToken });

    res.clearCookie("refresh_Token", { path: "/" });

    return res.status(200).json("User has been deleted!");
  } catch (err) {
    return res.status(500).json(err);
  }
};
