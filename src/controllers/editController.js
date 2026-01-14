import { HTTP_STATUS, MESSAGES, QUEUE } from "../config/constants.js";
import { publishToQueue } from "../utils/rabbitmqService.js";

const editController = (req, res, next) => {
  try {
    const { trimStart, trimEnd, email, position, character } =
      req.validatedFields;
    const s3Key = req.s3Key;

    publishToQueue(QUEUE.VIDEO_PROCESS, {
      email,
      key: s3Key,
      position,
      character,
      trimStart: Number(trimStart),
      trimEnd: Number(trimEnd),
    });

    res.status(HTTP_STATUS.CREATED).json({
      message: MESSAGES.SUCCESS.VIDEO_REQUEST,
    });
  } catch (err) {
    next(err);
  }
};

export default editController;
