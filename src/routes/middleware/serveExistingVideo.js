import ytdl from "@distube/ytdl-core";
import { HTTP_STATUS, MESSAGES } from "../../config/constants.js";
import env from "../../config/env.js";
import generateSignedUrl from "../../utils/generateSignedUrl.js";

const serveExistingVideo = async (req, res, next) => {
  const { youtubeUrl } = req.body;
  const videoId = ytdl.getURLVideoID(youtubeUrl);
  const fileName = `${env.ORIGINAL_PREFIX}/${videoId}`;

  try {
    const exists = await checkS3ObjectExists(env.S3_BUCKET_NAME, fileName);

    if (!exists) {
      req.videoId = videoId;

      return next();
    }

    const signedUrl = await generateSignedUrl(fileName);

    res.status(HTTP_STATUS.OK).json({
      status: HTTP_STATUS.OK,
      message: MESSAGES.SUCCESS.VIDEO_LOAD,
      download_url: signedUrl,
      video_id: videoId,
    });
  } catch (error) {
    next(error);
  }
};

export default serveExistingVideo;
