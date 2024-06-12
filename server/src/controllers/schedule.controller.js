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

    return res.status(200).json(schedule);
  } catch (error) {
    console.error("Error fetching schedule:", error);
    return res.status(500).json({ message: "Lỗi hệ thống!" });
  }
};
