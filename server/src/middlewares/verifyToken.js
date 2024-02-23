import jwt from "jsonwebtoken";
require("dotenv").config();

export const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You're not authenticated!");
  }
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role == "Admin") {
      next();
    } else {
      return res.status(403).json("You're not allowed!");
    }
  });
};

export const verifyAdminAndUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role == "Admin" || req.user.role == "User") {
      next();
    } else {
      return res.status(403).json("You're not allowed!");
    }
  });
};

export const verifyUpdate = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id == req.params.id) {
      next();
    } else {
      return res.status(403).json("You're not allowed to update user other!");
    }
  });
};

export const verifyDelete = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id == req.params.id || req.user.role === "Admin") {
      next();
    } else {
      return res.status(403).json("You're not allowed to delete user other!");
    }
  });
};
