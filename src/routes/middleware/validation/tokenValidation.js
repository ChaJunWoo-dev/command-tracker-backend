import createError from "http-errors";

import { MESSAGES } from "../../../config/constants.js";
import { validateToken } from "../../../utils/tokenService.js";

const tokenValidation = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      throw createError.BadRequest(MESSAGES.ERROR.MISSING_TOKEN);
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw createError.BadRequest(MESSAGES.ERROR.MISSING_TOKEN);
    }

    const decoded = validateToken(token);
    if (!decoded) {
      throw createError.Unauthorized(MESSAGES.ERROR.INVALID_TOKEN);
    }

    req.validatedFields = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

export default tokenValidation;
