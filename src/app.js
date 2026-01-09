import "dotenv/config";
import cors from "cors";
import express from "express";
import createError from "http-errors";
import multer from "multer";

import { HTTP_STATUS, MESSAGES } from "./config/constants.js";
import env from "./config/env.js";
import editRoutes from "./routes/editRoutes.js";

const app = express();
app.use("/images", express.static("public/images"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${env.API_PREFIX}/edit`, editRoutes);

app.use((req, res, next) => {
  next(createError(HTTP_STATUS.NOT_FOUND, MESSAGES.ERROR.NOT_FOUND_PAGE));
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.log(err);
    return res.status(500).json({
      message: MESSAGES.ERROR.FAILED_UPLOAD_VIDEO,
    });
  }

  res.status(err.status || HTTP_STATUS.SERVER_ERROR).json({
    status: err.status,
    message: err.message || MESSAGES.ERROR.SERVER_ERROR,
    details: err.details,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

export default app;
