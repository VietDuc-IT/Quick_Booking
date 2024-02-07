import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();

let arr_refreshToken = [];
const ACCESS_TOKEN_EXPIRES_TIME = "60s";
const REFRESH_TOKEN_EXPIRES_TIME = "1d";

// [POST] /auth/register
export const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // Hash the user's password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create new user
  const newUser = await new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    // Save user to DB
    await newUser.save();
    return res.status(200).json({ message: "Registered successful!" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Generate access token
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      admin: user.admin,
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
      admin: user.admin,
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: REFRESH_TOKEN_EXPIRES_TIME }
  );
};

// [POST] /auth/login
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if ((!username, !password)) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const validUser = await User.findOne({ username });

    if (!validUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    const validPassword = await bcrypt.compare(password, validUser.password);

    if (!validPassword) {
      return res.status(404).json({ message: "Wrong password!" });
    }

    if (validUser && validPassword) {
      // Generate access token
      const accessToken = generateAccessToken(validUser);

      // Generate refresh token
      const refreshToken = generateRefreshToken(validUser);

      arr_refreshToken.push(refreshToken);

      // Save refresh to cookie
      res.cookie("refresh_Token", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      const { password, ...others } = validUser._doc;
      return res.status(200).json({ ...others, accessToken });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

// [POST] /auth/refresh
export const requestRefreshToken = async (req, res) => {
  try {
    // Get the value refresh from the "refresh_Token" user
    const refreshToken = req.cookies.refresh_Token;

    // Send error if token is not valid
    if (!refreshToken) {
      return res.status(401).json("You're not acthenticated!");
    }
    if (!arr_refreshToken.includes(refreshToken)) {
      return res.status(403).json("Refresh Token is not valid!");
    }
    jwt.verify(refreshToken, process.env.JWT_ACCESS_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      arr_refreshToken = arr_refreshToken.filter(
        (token) => token !== refreshToken
      );

      // Create new access token, redresh token and send to user
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

      arr_refreshToken.push(newRefreshToken);
      res.cookie("refresh_Token", newRefreshToken, {
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

// [POST] /auth/logout
export const logoutUser = async (req, res) => {
  arr_refreshToken = arr_refreshToken.filter(
    (token) => token !== req.cookies.refreshToken
  );

  res.clearCookie("refresh_Token");
  return res.status(200).json("Logged out successfully!");
};
