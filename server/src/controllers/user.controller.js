import User from "../models/user.model";
import bcrypt from "bcrypt";
import RefreshToken from "../models/refreshToken.model";

// [GET] /user/
export const getAllUser = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ createAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...others } = user._doc;
      return others;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    return res
      .status(200)
      .json({ users: usersWithoutPassword, totalUsers, lastMonthUsers });
  } catch (err) {
    return res.status(500).json(err);
  }
};

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
