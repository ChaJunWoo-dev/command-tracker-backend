import express from "express";

import upload from "../config/multer.js";
import editValidation from "./middleware/validation/editValidation.js";
import editController from "../controllers/editController.js";

const router = express.Router();

router.post("/", upload.single("video"), editValidation, editController);

export default router;
