import { HTTP_STATUS, MESSAGES, QUEUE } from "../config/constants.js";
import { publishToQueue } from "../utils/rabbitmqService.js";

const editController = (req, res, next) => {
  try {
    const { start, end, email, position, character } = req.body;
    const s3Key = req.s3Key;

    publishToQueue(QUEUE.VIDEO_PROCESS, {
      email,
      key: s3Key,
      position,
      character,
      trimStart: start,
      trimEnd: end,
    });

    res.status(HTTP_STATUS.CREATED).json({
      message: MESSAGES.SUCCESS.VIDEO_REQUEST,
    });
  } catch (err) {
    next(err);
  }
};

export default editController;
