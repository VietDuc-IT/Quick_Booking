import Schedule from "../models/schedule.model";

//[POST] /api/schedule
export const schedule = async (req, res) => {
  const { renterId, hostId, postId, date, time } = req.body;

  if (!date || !time || time.length === 0) {
    return res.status(400).json({ message: "Bạn phải chọn ngày và giờ!" });
  }
  try {
    // Create a new user instance
    const newSchedule = new Schedule({
      renterId,
      hostId,
      postId,
      date,
      time,
    });

    // Save the new user to the database
    await newSchedule.save();

    return res.status(200).json({ message: "Đặt lịch thành công!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi trong quá trình đăng ký!" });
  }
};

//[GET] /api/schedule
export const getAllSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.find()
      .populate("renterId")
      .populate("hostId")
      .populate("postId");

    const totalSchedule = await Schedule.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthSchedule = await Schedule.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    return res
      .status(200)
      .json({ schedule: schedule, totalSchedule, lastMonthSchedule });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi hệ thống!" });
  }
};

//[GET] /api/schedule/:userid
export const getSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.find({ renterId: req.params.userid })
      .populate("renterId")
      .populate("hostId")
      .populate("postId");

    return res.status(200).json(schedule);
  } catch (error) {
    return res.status(500).json({ message: "Lỗi hệ thống!" });
  }
};

// [DELETE] /api/schedule/:scheduleId
export const deleteSchedule = async (req, res) => {
  try {
    await Schedule.findByIdAndDelete(req.params.scheduleId);
    res.status(200).json({ message: "Xóa thành công!" });
  } catch (err) {
    return res.status(500).json({ message: "Xóa thất bại!" });
  }
};

// [PUT] /api/schedule/v1/status/:scheduleId
export const statusSchedule = async (req, res) => {
  if (req.body.status === "Chờ duyệt") {
    req.body.status = "Hũy lịch";
  } else {
    req.body.status = "Chờ duyệt";
  }

  try {
    await Schedule.findByIdAndUpdate(
      req.params.scheduleId,
      { $set: { status: req.body.status } },
      { new: true }
    );

    return res.status(200).json({ message: "Bạn nhớ lịch hẹn nhé!" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Cập nhật trạng trái thất bại!", err });
  }
};
