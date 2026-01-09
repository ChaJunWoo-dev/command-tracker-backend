import amqp from "amqplib";
import createError from "http-errors";

import { HTTP_STATUS, MESSAGES, QUEUE } from "./constants.js";
import env from "./env.js";

let connection = null;
let channel = null;
let reconnecting = false;

const reconnect = () => {
  if (reconnecting) return;
  reconnecting = true;

  connection = null;
  channel = null;

  setTimeout(() => {
    reconnecting = false;
    connectRabbitMQ();
  }, 5000);
};

const connectRabbitMQ = async () => {
  if (connection || channel) return;

  try {
    connection = await amqp.connect(env.rabbitmqUrl);
    channel = await connection.createConfirmChannel();

    connection.on("error", reconnect);
    connection.on("close", reconnect);

    channel.on("error", reconnect);
    channel.on("close", reconnect);

    channel.prefetch(1);

    await channel.assertQueue(QUEUE.VIDEO_PROCESS, { durable: true });
    await channel.assertQueue(QUEUE.VIDEO_RESULT, { durable: true });
  } catch (err) {
    reconnect();
  }
};

const getChannel = () => {
  if (!channel) {
    throw createError(HTTP_STATUS.SERVER_ERROR, MESSAGES.ERROR.SERVER_ERROR);
  }
  return channel;
};

process.on("SIGINT", async () => {
  try {
    if (channel) await channel.close();
    if (connection) await connection.close();
  } finally {
    process.exit(0);
  }
});

export { connectRabbitMQ, getChannel };
