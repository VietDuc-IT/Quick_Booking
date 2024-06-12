import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
  {
    renterId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Post",
    },
    date: {
      type: String,
      require: true,
    },
    time: {
      type: Array,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;
