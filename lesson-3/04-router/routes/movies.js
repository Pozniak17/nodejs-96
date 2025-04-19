import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("GET movies");
});

router.post("/", (req, res) => {
  res.send("POST Movies");
});

export default router;
