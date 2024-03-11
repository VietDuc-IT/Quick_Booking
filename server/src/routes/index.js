import express from "express";

import userRouter from "./user.route";
import postRouter from "./post.route";
import categoryRouter from "./category.route";
import commentRouter from "./comment.route";
import path from "path";
import { uploadImage } from "../utils/uploadFile";

const handleUpload = (req, res) => {
  let file = req.files["file"][0];
  if (!file) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: "No files were uploaded.",
    });
  }

  return res.status(200).json({
    success: true,
    code: 200,
    message: "File uploaded successfully.",
    file: file,
  });
};

function route(app) {
  app.use("/public", express.static(path.join(__dirname, "../../public")));
  app.use("/api/user", userRouter);
  app.use("/api/post", postRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/comment", commentRouter);

  app.post(
    "/uploadFile",
    uploadImage.fields([{ name: "file", maxCount: 1 }]),
    handleUpload
  );
}

export default route;
