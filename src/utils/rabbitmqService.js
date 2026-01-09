import createError from "http-errors";

import { MESSAGES } from "../config/constants.js";
import env from "../config/env.js";
import { getChannel } from "../config/rabbitmq.js";
import { sendEmail } from "../services/emailService.js";

const publishToQueue = (queueName, message) => {
  const channel = getChannel();
  const isSent = channel.sendToQueue(
    queueName,
    Buffer.from(JSON.stringify(message)),
    { persistent: true }
  );

  if (!isSent) {
    throw createError.InternalServerError(
      MESSAGES.ERROR.FAILED_PUBLISH_MESSAGE
    );
  }
};

const consumeFromQueue = (queueName, messageHandler) => {
  const channel = getChannel();

  channel.consume(queueName, async (msg) => {
    if (!msg) return;

    try {
      const messageContent = JSON.parse(msg.content.toString());
      await messageHandler(messageContent);
      channel.ack(msg);
    } catch (err) {
      //todo: 재시도 큐로 전송
      channel.nack(msg, false, false);
    }
  });
};

const consumeEmailQueue = () => {
  consumeFromQueue(env.emailQueue, async (messageContent) => {
    const { email, code, message: emailMessage, url } = messageContent;
    await sendEmail({ email, code, message: emailMessage, url });
  });
};

export { publishToQueue, consumeFromQueue, consumeEmailQueue };
