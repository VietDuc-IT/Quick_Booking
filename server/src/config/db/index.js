import mongoose from "mongoose";
require("dotenv").config();

const URI = process.env.MONGODB_URL;

async function connect() {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useCreateIndex: true,
    });
    console.log("Connected to DB successful.");
  } catch (error) {
    console.log("Connect to DB fail. " + error);
  }
}

export default connect;
