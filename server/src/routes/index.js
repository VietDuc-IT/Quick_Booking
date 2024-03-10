import userRouter from "./user.route";
import postRouter from "./post.route";
import categoryRouter from "./category.route";
import commentRouter from "./comment.route";

function route(app) {
  app.use("/api/user", userRouter);
  app.use("/api/post", postRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/comment", commentRouter);
}

export default route;
