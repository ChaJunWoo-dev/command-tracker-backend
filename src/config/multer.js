import multer from "multer";
import multerS3 from "multer-s3";
import { randomUUID } from "crypto";

import s3Client from "./s3.js";
import env from "./env.js";
import { MESSAGES, VIDEO_MAX_SIZE } from "./constants.js";

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: env.S3_BUCKET_NAME,
    key: function (req, file, cb) {
      const s3Key = `${Date.now()}_${randomUUID()}`;
      req.s3Key = s3Key;
      cb(null, s3Key);
    },
  }),
  limits: {
    fileSize: VIDEO_MAX_SIZE,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "video/mp4",
      "video/webm",
      "video/quicktime",
      "video/x-msvideo",
      "video/x-matroska",
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(MESSAGES.ERROR.INVALID_FILE_TYPE));
    }
  },
});

export default upload;
