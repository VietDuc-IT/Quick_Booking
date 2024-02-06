import userRouter from "./user";
import authRouter from "./auth";

function route(app) {
  app.use("/user", userRouter);
  app.use("/auth", authRouter);
}

export default route;
