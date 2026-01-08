// можна не вик. якщо додати змінні оточення в render.com
//! import "dotenv/config";
import path from "node:path";
import express from "express";
import routes from "./routes/index.js";

import "./db.js";

const app = express();
const PORT = process.env.PORT || 8080;

// налаштовуємо маршрут для отримання картинок (статичні файли)
// можна додатково передати мідлвару authMiddleware, якщо треба щоб залогінені бачили
app.use("/avatars", express.static(path.resolve("public/avatars")));

app.use("/api", routes);

// Handle 404 Error
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

// Handle 500 Error
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send("Internal Server Error");
});

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
