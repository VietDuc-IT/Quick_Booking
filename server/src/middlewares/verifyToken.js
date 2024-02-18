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

export const verifyTokenAndAdminAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id == req.params.id || req.user.admin) {
      next();
    } else {
      return res.status(403).json("You're not allowed to delete this user!");
    }
  });
};

export const verifyTokenUpdate = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log("===================================");
    console.log(">> params.id", req.params.id);
    console.log(">> user.id", req.user.id);
    console.log("===================================");
    if (req.user.id == req.params.id) {
      next();
    } else {
      return res.status(403).json("You're not allowed to update user other!");
    }
  });
};
