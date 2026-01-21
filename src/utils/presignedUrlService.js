import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import s3Client from "../config/s3.js";
import env from "../config/env.js";
import { PRESIGNED_URL_EXPIRES } from "../config/constants.js";

export const generatePresignedUrl = async (key) => {
  const command = new GetObjectCommand({
    Bucket: env.S3_BUCKET_NAME,
    Key: key,
  });

  const presignedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: PRESIGNED_URL_EXPIRES,
  });

  return presignedUrl;
};
