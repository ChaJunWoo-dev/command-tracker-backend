import createError from "http-errors";

import {
  MESSAGES,
  REGEX_PATTERNS,
  VALID_VALUES,
} from "../../../config/constants.js";

const editValidation = (req, res, next) => {
  try {
    const { trimStart, trimEnd, position, character, email } = req.body;

    if (
      trimStart === undefined ||
      !trimEnd === undefined ||
      !position ||
      !character ||
      !email
    ) {
      throw createError.BadRequest(MESSAGES.ERROR.MISSING_REQUIRED_FIELD);
    }

    const start = Number(trimStart);
    const end = Number(trimEnd);

    if (isNaN(start) || isNaN(end) || start < 0 || end < 0 || start >= end) {
      throw createError.BadRequest(MESSAGES.ERROR.INVALID_TRIM);
    }

    const MAX_TRIM_SECONDS = 30 * 60;
    if (end - start > MAX_TRIM_SECONDS) {
      throw createError.BadRequest(MESSAGES.ERROR.TRIM_TOO_LONG);
    }

    if (!VALID_VALUES.POSITION.includes(position)) {
      throw createError.BadRequest(MESSAGES.ERROR.INVALID_POSITION);
    }

    if (!VALID_VALUES.CHARACTER.includes(character)) {
      throw createError.BadRequest(MESSAGES.ERROR.INVALID_CHARACTER);
    }

    if (!REGEX_PATTERNS.EMAIL.test(email)) {
      throw createError.BadRequest(MESSAGES.ERROR.INVALID_EMAIL);
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default editValidation;
