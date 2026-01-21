import express from "express";

import upload from "./middleware/multer.js";
import editValidation from "./middleware/validation/editValidation.js";
import tokenValidation from "./middleware/validation/tokenValidation.js";
import editPrepareController from "../controllers/editPrepareController.js";
import editController from "../controllers/editController.js";

const router = express.Router();

router.post("/prepare", editValidation, editPrepareController);
router.post("/upload", tokenValidation, upload.single("video"), editController);

export default router;
