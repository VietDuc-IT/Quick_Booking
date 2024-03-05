import User from "../models/user.model";
import RefreshToken from "../models/refreshToken.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { google } from "googleapis";
require("dotenv").config();

const ACCESS_TOKEN_EXPIRES_TIME = "60s";
const REFRESH_TOKEN_EXPIRES_TIME = "24h";

// These id's and secrets should come from .env file.
const CLIENT_ID = process.env.CLIENT_ID;
const CLEINT_SECRET = process.env.CLEINT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Generate access token
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: ACCESS_TOKEN_EXPIRES_TIME }
  );
};

// Generate refresh token
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: REFRESH_TOKEN_EXPIRES_TIME }
  );
};

// [POST] /api/user/register
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Bạn phải điền đủ thông tin!" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Mật khẩu phải có ít nhất 6 kí tự!" });
  }

  // Check if a user with the provided email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email này đã tồn tại!" });
  }

  // Hash the user's password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    return res.status(200).json({ message: "Đăng ký thành công!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi trong quá trình đăng ký!" });
  }
};

// [POST] /api/user/login
export const login = async (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    return res.status(400).json({ message: "Bạn phải điền đủ thông tin!" });
  }

  // Check Email & Password
  const existingUser = await User.findOne({ email });
  // Check if the user exists and the password is valid
  if (
    !existingUser ||
    !(await bcrypt.compare(password, existingUser.password))
  ) {
    return res
      .status(404)
      .json({ message: "Địa chỉ email hoặc mật khẩu không đúng!" });
  }

  try {
    // Generate access token
    const accessToken = generateAccessToken(existingUser);

    // Generate refresh token
    const refreshToken = generateRefreshToken(existingUser);

    // Save refresh to cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });

    // save refreshToken with data
    const arr_refreshToken = await new RefreshToken({ token: refreshToken });
    await arr_refreshToken.save();

    const { password, ...others } = existingUser._doc;
    return res.status(200).json({ ...others, accessToken });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// [POST] /api/user/google/login
export const loginGG = async (req, res) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      // Generate access token
      const accessToken = generateAccessToken(user);

      // Generate refresh token
      const refreshToken = generateRefreshToken(user);
      // Save refresh to cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      // save refreshToken with data
      const arr_refreshToken = await new RefreshToken({ token: refreshToken });
      await arr_refreshToken.save();

      const { password, ...others } = user._doc;
      return res.status(200).json({ ...others, accessToken });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(generatedPassword, salt);

      // Create new user
      const newUser = await new User({
        username: name,
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      // Save user to DB
      await newUser.save();
      // Generate access token
      const accessToken = generateAccessToken(newUser);

      // Generate refresh token
      const refreshToken = generateRefreshToken(newUser);
      // Save refresh to cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      // save refreshToken with data
      const arr_refreshToken = await new RefreshToken({ token: refreshToken });
      await arr_refreshToken.save();

      const { password, ...others } = newUser._doc;
      return res.status(200).json({ ...others, accessToken });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

// [POST] /api/user/forgot-password
export const forgotPassword = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({ message: "Bạn phải nhập email!" });
    }

    const validEmail = await User.findOne({ email: req.body.email });
    if (!validEmail) {
      return res.status(400).json({ message: "Không tìm thấy tài khoản!" });
    }

    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "levietduc4566@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "levietduc4566@gmail.com",
      to: req.body.email,
      subject: "Tạo mật khẩu mới",
      text: "Bạn vừa gửi yêu cầu reset mật khẩu?",
      html: `Click vào link sau để reset lại mật khẩu: http://localhost:3000/refresh-password/${validEmail._id}`,
    };

    await transport.sendMail(mailOptions);
    return res.status(200).json({
      message:
        "Hãy kiểm tra email của bạn. Sau đó nhấn vào link trong hộp thư để đổi lại mật khẩu.",
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// [PUT] /api/user/refresh-password/:id
export const refreshPassword = async (req, res) => {
  if (!req.body.password) {
    return res.status(400).json({ message: "Bạn cần điền mật khẩu mới!" });
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return res
        .status(400)
        .json({ message: "Mật khẩu phải có ít nhất 6 kí tự!" });
    }
    // Hash the user's password
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  try {
    await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          password: req.body.password,
        },
      },
      { new: true }
    );

    return res.status(200).json({ message: "Bạn có thể đăng nhập lại!" });
  } catch (err) {
    return res.status(500).json({
      message: "Lấy lại mật khẩu thất bại, kiểm tra lại mail của bạn!",
    });
  }
};

// [POST] /api/user/refreshToken
export const refreshToken = async (req, res) => {
  try {
    // Get the value refresh from the "refreshToken" user
    const refreshToken = req.cookies.refreshToken;

    // Send error if token is not valid
    if (!refreshToken) {
      return res.status(401).json("You're not acthenticated!");
    }

    const arr_token = await RefreshToken.findOne({ token: refreshToken });
    if (arr_token.token !== refreshToken) {
      return res.status(403).json("Refresh Token is not valid!");
    }
    jwt.verify(refreshToken, process.env.JWT_ACCESS_KEY, async (err, user) => {
      if (err) {
        console.log(err);
      }

      // Create new access token, redresh token and send to user
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

      await RefreshToken.findOneAndUpdate(
        { token: arr_token.token },
        {
          $set: {
            token: newRefreshToken,
          },
        },
        { new: true }
      );

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      return res.status(200).json({
        accessToken: newAccessToken,
      });
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// [POST] /api/user/logout
export const logout = async (req, res) => {
  // Delete token cookie
  const refreshToken = req.cookies.refreshToken;
  await RefreshToken.findOneAndDelete({ token: refreshToken });

  res.clearCookie("refreshToken", { path: "/" });
  return res.status(200).json({ message: "Đăng xuất thành công!" });
};

// [PUT] /api/user/:id
export const updateProfile = async (req, res) => {
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return res
        .status(400)
        .json({ message: "Mật khẩu phải có ít nhất 6 kí tự!" });
    }
    // Hash the user's password
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  if (req.body.phone) {
    if (req.body.phone.toString().length != 10) {
      return res.status(400).json({ message: "Số điện thoại phải đủ 10 số!" });
    }
  }

  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
          phoneNumber: req.body.phone,
        },
      },
      { new: true }
    );

    // Generate access token
    const accessToken = generateAccessToken(req.user);

    const { password, ...others } = updateUser._doc;
    return res.status(200).json({ ...others, accessToken });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// [GET] /api/user
export const getUser = async (req, res) => {
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

// [DELETE] /api/user/:id
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });
    }
    // Delete token
    const refreshToken = req.cookies.refreshToken;
    await RefreshToken.findOneAndDelete({ token: refreshToken });

    res.clearCookie("refreshToken", { path: "/" });

    return res.status(200).json({ message: "Xóa người dùng thành công!" });
  } catch (err) {
    return res.status(500).json(err);
  }
};
