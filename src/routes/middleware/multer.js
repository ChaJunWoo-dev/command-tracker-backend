import multer from "multer";
import multerS3 from "multer-s3";
import { randomUUID } from "crypto";

import s3Client from "../../config/s3.js";
import env from "../../config/env.js";
import { MESSAGES, VIDEO_MAX_SIZE, S3_KEY } from "../../config/constants.js";

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: env.S3_BUCKET_NAME,
    key: function (req, file, cb) {
      let ext = "";

      switch (file.mimetype) {
        case "video/mp4":
          ext = ".mp4";
          break;
        case "video/webm":
          ext = ".webm";
          break;
        case "video/quicktime":
          ext = ".mov";
          break;
        case "video/x-msvideo":
          ext = ".avi";
          break;
        case "video/x-matroska":
          ext = ".mkv";
          break;
        default:
          ext = "";
      }
      const filename = `${S3_KEY.ORIGINAL_PREFIX}/${Date.now()}_${randomUUID()}${ext}`;
      req.filename = filename;
      cb(null, filename);
    }
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
