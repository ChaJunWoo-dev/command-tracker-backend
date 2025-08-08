import { HTTP_STATUS, MESSAGES } from "../config/constants.js";
import env from "../config/env.js";
import { getYoutubeVideo, uploadVideoToS3 } from "../services/videoService.js";
import generateSignedUrl from "../utils/generateSignedUrl.js";

const uploadVideoRequests = async (req, res, next) => {
  const { youtubeUrl } = req.body;

  try {
    const videoStream = await getYoutubeVideo(youtubeUrl);
    const fileName = `${env.ORIGINAL_PREFIX}/${req.videoId}`;

    await uploadVideoToS3(videoStream, fileName);

    const signedUrl = await generateSignedUrl(fileName);

    res.status(HTTP_STATUS.CREATED).json({
      status: HTTP_STATUS.CREATED,
      message: MESSAGES.SUCCESS.VIDEO_LOAD,
      download_url: signedUrl,
      video_id: req.videoId,
    });
  } catch (error) {
    next(error);
  }
};

export default uploadVideoRequests;
