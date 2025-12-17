import express from "express";
import AuthController from "../controllers/auth.js";

const router = express.Router();
const jsonParser = express.json();

router.post("/register", jsonParser, AuthController.register);
//todo Заняття 7.2
router.post("/login", jsonParser, AuthController.login);

export default router;
