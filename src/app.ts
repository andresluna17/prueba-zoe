import express, { Application } from "express";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import router from "./router";

export const createApp = () => {
  const app: Application = express();
  app.use(express.json());
  app.use(fileUpload());
  if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

  app.use(router);

  return app;
};
