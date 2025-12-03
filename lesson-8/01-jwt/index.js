// не потрібен, видалили, бо зчитуємо з env в render.com які додали
// import "dotenv/config";

import express from "express";
import routes from "./routes/index.js";

import "./db.js";

const PORT = process.env.PORT || 8080;

const app = express();

app.use("/api", routes);

// Handle 404 Error
app.use((req, res, next) => {
  res.status(404).send("Not found");
});

// Handle 500 Error
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send("Internal Server Error");
});

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
