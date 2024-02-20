import User from "../models/user.model";
import RefreshToken from "../models/refreshToken.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();

const ACCESS_TOKEN_EXPIRES_TIME = "90s";
const REFRESH_TOKEN_EXPIRES_TIME = "24h";

// [POST] /auth/register
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json("All fields are required");
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
    return res.status(200).json("Registered successful!");
  } catch (err) {
    return res.status(500).json(err);
  }
};

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

// [POST] /auth/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    return res.status(400).json("All fields are required");
  }
  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return res.status(404).json("User not found!");
    }

    const validPassword = await bcrypt.compare(password, validUser.password);

    if (!validPassword) {
      return res.status(404).json("Wrong password!");
    }

    if (validUser && validPassword) {
      // Generate access token
      const accessToken = generateAccessToken(validUser);

      // Generate refresh token
      const refreshToken = generateRefreshToken(validUser);

      // save refreshToken with data
      const arr_refreshToken = await new RefreshToken({ token: refreshToken });
      await arr_refreshToken.save();

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

// [POST] /auth/google
export const loginGG = async (req, res) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      // Generate access token
      const accessToken = generateAccessToken(user);
      // Generate refresh token
      const refreshToken = generateRefreshToken(user);
      // save refreshToken with data
      const arr_refreshToken = await new RefreshToken({ token: refreshToken });
      await arr_refreshToken.save();
      // Save refresh to cookie
      res.cookie("refresh_Token", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
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

      const arr_refreshToken = await new RefreshToken({ token: refreshToken });
      await arr_refreshToken.save();

      // Save refresh to cookie
      res.cookie("refresh_Token", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      const { password, ...others } = newUser._doc;
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

// [PUT] /auth/update/:id
export const updateProfile = async (req, res) => {
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return res.status(400).json("Password must be at least 6 characters!");
    }
    // Hash the user's password
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  if (req.body.phone) {
    if (req.body.phone.toString().length != 10) {
      return res.status(400).json("PhoneNumber must be 10 number!");
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

// [POST] /auth/logout
export const logoutUser = async (req, res) => {
  // Delete token
  const refreshToken = req.cookies.refresh_Token;
  await RefreshToken.findOneAndDelete({ token: refreshToken });

  res.clearCookie("refresh_Token", { path: "/" });
  return res.status(200).json("Logged out successfully!");
};
