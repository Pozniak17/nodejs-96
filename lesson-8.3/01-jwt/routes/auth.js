import express from "express";
import AuthController from "../controllers/auth.js";
//todo Заняття 8.2
import authMiddleware from "../middleware/auth.js";

const router = express.Router();
const jsonParser = express.json();

router.post("/register", jsonParser, AuthController.register);
//todo Заняття 7.2
router.post("/login", jsonParser, AuthController.login);
//todo Заняття 8.2
router.get("/logout", authMiddleware, AuthController.logout);

export default router;
