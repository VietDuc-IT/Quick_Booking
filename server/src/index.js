import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
require("dotenv").config();

import route from "./routes";
import database from "./config/db";

// Connect to DB
database();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

route(app);

app.listen(port, () => {
  console.log(`Server is runing on port ${port}`);
});
