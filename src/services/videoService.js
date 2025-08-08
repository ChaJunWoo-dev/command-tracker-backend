import { pipeline } from "stream/promises";

import ytdl from "@distube/ytdl-core";
import s3 from "../config/s3.js";

const getYoutubeVideo = async (youtubeUrl) => {
  const videoStream = ytdl(youtubeUrl, { quality: "highestvideo" });

  return videoStream;
};

const uploadVideoToS3 = async (stream, fileName) => {
  const pass = new PassThrough();
  const upload = s3
    .upload({
      Bucket: env.S3_BUCKET_NAME,
      Key: fileName,
      Body: pass,
      ContentType: "video/webm",
    })
    .promise();

  await pipeline(stream, pass);

  const result = await upload;

  return result.Location;
};

export { getYoutubeVideo, uploadVideoToS3 };
