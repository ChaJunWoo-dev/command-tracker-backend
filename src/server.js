import app from "./app.js";
import { QUEUE } from "./config/constants.js";
import env from "./config/env.js";
import { connectRabbitMQ } from "./config/rabbitmq.js";
import { sendEmail } from "./services/emailService.js";
import { generatePresignedUrl } from "./utils/presignedUrlService.js";
import { consumeFromQueue } from "./utils/rabbitmqService.js";

const startServer = async () => {
  try {
    await connectRabbitMQ();

    consumeFromQueue(QUEUE.VIDEO_RESULT, async (messageContent) => {
      const { email, detail, key } = messageContent;
      const resultVideoUrl = await generatePresignedUrl(key);

      await sendEmail({ email, detail, resultVideoUrl });
    });

    const { port } = env;

    app.listen(port, () => {});
  } catch (error) {
    process.exit(1);
  }
};

startServer();
