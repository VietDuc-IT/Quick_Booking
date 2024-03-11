import multer from "multer";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
// Multer configuration

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = "public/file/images";

    return cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

export const uploadImage = multer({ storage: storage });
