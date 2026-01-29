import express from "express";

import upload from "./middleware/multer.js";
import videoValidation from "./middleware/validation/videoValidation.js";
import tokenValidation from "./middleware/validation/tokenValidation.js";
import videoPrepareController from "../controllers/videoPrepareController.js";
import videoController from "../controllers/videoController.js";

const router = express.Router();

router.post("/prepare", videoValidation, videoPrepareController);
router.post("/upload", tokenValidation, upload.single("video"), videoController);

export default router;
