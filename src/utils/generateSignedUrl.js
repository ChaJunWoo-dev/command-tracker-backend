import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import createError from "http-errors";

import { HTTP_STATUS, MESSAGES, S3 } from "../config/constants.js";
import env from "../config/env.js";
import s3 from "../config/s3.js";

const generateSignedUrl = async (fileName) => {
  const command = new GetObjectCommand({
    Bucket: env.S3_BUCKET_NAME,
    Key: fileName,
  });

  try {
    const url = await getSignedUrl(s3, command, {
      expiresIn: S3.PRE_SIGNED_URL.EXPIRE,
    });

    return url;
  } catch {
    throw createError(
      HTTP_STATUS.SERVER_ERROR,
      MESSAGES.ERROR.FAILED_GENERATE_SIGNED_URL
    );
  }
};

export default generateSignedUrl;
