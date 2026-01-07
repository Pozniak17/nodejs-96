// Заняття 9
import express from "express";
import UserController from "../controllers/user.js";

import uploadMiddlare from "../middleware/upload.js";

const router = express.Router();

// патч бо будемо додавати 1 поле (картинку), single це завантаження 1 файлу
// в дужках вказуємо "avatar" це поле також буде в postman ключем Key
router.patch(
  "/avatar",
  uploadMiddlare.single("avatar"),
  UserController.uploadAvatar
);

export default router;
