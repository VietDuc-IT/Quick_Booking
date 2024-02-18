import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

const refreshToken = mongoose.model("refreshToken", refreshTokenSchema);
export default refreshToken;
