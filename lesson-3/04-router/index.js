import express from "express";
import routes from "./routes/index.js";

const PORT = 8080;
const app = express();

// використовуємо головний routes
app.use(routes);

// ще можна ось так, якщо в нас є додаткові версії
//* app.use("/api/v1", routes)
//* app.use("/api/v2", routes)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
