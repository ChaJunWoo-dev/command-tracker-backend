import jwt from "jsonwebtoken";
import env from "../config/env.js";
import { JWT } from "../config/constants.js";

export const generateToken = (payload, expiresIn = JWT.TOKEN_EXPIRE) => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
};

export const validateToken = (token) => {
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};
