import { HeadObjectCommand } from "@aws-sdk/client-s3";
import { HTTP_STATUS, MESSAGES } from "../config/constants.js";
import s3 from "../config/s3.js";

const checkS3ObjectExists = async (bucket, key) => {
  try {
    await s3.send(
      new HeadObjectCommand({
        Bucket: bucket,
        Key: key,
      })
    );
    return true;
  } catch (err) {
    if (err.name === "NotFound" || err.$metadata?.httpStatusCode === 404) {
      return false;
    }

    throw createError(HTTP_STATUS.NOT_FOUND, MESSAGES.ERROR.VIDEO_NOT_FOUND);
  }
};

export default checkS3ObjectExists;
