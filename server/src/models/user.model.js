import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 6,
      max: 20,
    },
    email: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "https://furness.media/wp-content/uploads/2023/01/Boy.png",
    },
    phoneNumber: {
      type: Number,
      default: 0,
    },
    // role = [Admin, User, Customer]
    role: {
      type: String,
      default: "Customer",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
export default User;
