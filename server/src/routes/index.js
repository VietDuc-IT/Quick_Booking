import userRouter from "./user.route";
import authRouter from "./auth.route";

function route(app) {
  app.use("/user", userRouter);
  app.use("/auth", authRouter);
}

export default route;
