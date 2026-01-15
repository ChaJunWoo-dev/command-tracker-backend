import { HTTP_STATUS, MESSAGES, QUEUE } from "../config/constants.js";
import { publishToQueue } from "../utils/rabbitmqService.js";

const editController = (req, res, next) => {
  try {
    const { trimStart, trimEnd, email, position, character } =
      req.validatedFields;
    const filename = req.filename;

    publishToQueue(QUEUE.VIDEO_PROCESS, {
      email,
      filename,
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
