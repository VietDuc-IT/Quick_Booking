import userRouter from "./user.route";
import authRouter from "./auth.route";
import postRouter from "./post.route";

function route(app) {
  app.use("/user", userRouter);
  app.use("/auth", authRouter);
  app.use("/post", postRouter);
}

export default route;
