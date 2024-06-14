import { compareFaces } from "../faceRecognition/compareFaces";
import User from "../models/user.model";

//[PUT] /api/renter/sign/:id
export const renterSign = async (req, res) => {
  const { phoneNumber, cccdtruocUrl, cccdsauUrl, faceUrl } = req.body;

  const { role } = req.user;
  if (role === "Admin" || role === "User") {
    return res.status(400).json({ message: "Bạn không được đăng ký!" });
  }

  if (phoneNumber) {
    if (phoneNumber.toString().length != 10) {
      return res.status(400).json({ message: "Số điện thoại phải đủ 10 số!" });
    }
  }

  if (!cccdtruocUrl || !cccdsauUrl || !faceUrl) {
    return res.status(400).json({ message: "Không được bỏ trống!" });
  }

  try {
    const confidence = await compareFaces(cccdtruocUrl, faceUrl);

    if (confidence === null) {
      return res.status(400).json({
        message: "Không tìm thấy khuôn mặt trong một hoặc cả hai hình ảnh.",
      });
    }

    if (confidence < 80) {
      return res
        .status(400)
        .json({ message: "Khuôn mặt không khớp, dưới 80%!" });
    }

    await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          phoneNumber,
          cccdtruocUrl,
          cccdsauUrl,
          faceUrl,
          sign: 1,
        },
      },
      { new: true }
    );

    const integerPart = Math.floor(confidence);

    return res.status(200).json({
      message: `Tỷ lệ khớp: ${integerPart}%, Chờ duyệt!`,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

//[GET] /api/renter/sign
export const getrenter = async (req, res) => {
  const user = await User.find({ sign: true });

  try {
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json("No one renter");
  }
};

//[PUT] /api/confirm/accept/:id
export const confirm = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          role: "User",
          sign: false,
        },
      },
      { new: true }
    );
    return res.status(200).json({ message: "Cho phép thành công!" });
  } catch (err) {
    return res.status(500).json({ message: "Thất bại!" });
  }
};

//[PUT] /api/remove/accept/:id
export const remove = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          sign: false,
        },
      },
      { new: true }
    );
    return res.status(200).json({ message: "Đã hũy yêu cầu phê duyệt!" });
  } catch (err) {
    return res.status(500).json({ message: "Thất bại!" });
  }
};
