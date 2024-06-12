import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 6,
      max: 20,
      unique: false,
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
      default:
        "https://firebasestorage.googleapis.com/v0/b/quickbooking-7ae9f.appspot.com/o/1708786061810LogoUser.jpg?alt=media&token=18286512-14d7-4927-9aaf-4468e14c3f94",
    },
    phoneNumber: {
      type: Number,
      default: null,
    },
    // role = [Admin, User, Customer]
    role: {
      type: String,
      default: "Customer",
    },
    // renter
    sign: {
      type: Boolean,
      default: false,
    },
    cccdtruocUrl: {
      type: String,
      default: null,
    },
    cccdsauUrl: {
      type: String,
      default: null,
    },
    faceUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
