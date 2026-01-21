import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import ejs from "ejs";
import createError from "http-errors";
import mjml2html from "mjml";
import nodemailer from "nodemailer";

import { MESSAGES } from "../config/constants.js";
import env from "../config/env.js";
import { generatePresignedUrl } from "../utils/presignedUrlService.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.email_user,
    pass: env.email_pass,
  },
});

const readEmailTemplate = async ({ detail, resultVideoUrl }) => {
  try {
    if (detail) {
      const filePath = path.join(dirname, "../views", "errorTemplate.mjml.ejs");
      const template = await fs.readFile(filePath, "utf-8");
      const htmlContent = ejs.render(template, { message: detail });
      const { html } = mjml2html(htmlContent, {
        validationLevel: "strict",
      });

      return html;
    }
    const filePath = path.join(dirname, "../views", "emailTemplate.mjml.ejs");
    const template = await fs.readFile(filePath, "utf-8");
    const htmlContent = ejs.render(template, { url: resultVideoUrl });
    const { html } = mjml2html(htmlContent, {
      validationLevel: "strict",
    });

    return html;
  } catch (err) {
    throw createError.InternalServerError(MESSAGES.ERROR.FAILED_READ_TEMPLATE);
  }
};

const sendEmail = async ({ email, detail, resultVideoUrl }) => {
  try {
    const html = await readEmailTemplate({ detail, resultVideoUrl });
    const mailOptions = {
      from: env.email_user,
      to: email,
      subject: "Command Tracker",
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    throw createError.InternalServerError(MESSAGES.ERROR.SERVER_ERROR);
  }
};

export { sendEmail, readEmailTemplate };
