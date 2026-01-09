import { MESSAGES } from "../config/constants.js";
import { generateToken } from "../utils/tokenService.js";

const editPrepareController = (req, res, next) => {
  try {
    const { trimStart, trimEnd, position, character, email } = req.body;

    const token = generateToken({
      trimStart,
      trimEnd,
      position,
      character,
      email,
    });

    res.json({
      message: MESSAGES.SUCCESS.VALIDATION_PASSED,
      uploadToken: token,
    });
  } catch (err) {
    next(err);
  }
};

export default editPrepareController;
