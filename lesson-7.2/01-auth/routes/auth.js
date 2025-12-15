import express from "express";
import AuthController from "../controllers/auth.js";

const router = express.Router();
const jsonParser = express.json();

router.post("/register", jsonParser, AuthController.register);

export default router;
