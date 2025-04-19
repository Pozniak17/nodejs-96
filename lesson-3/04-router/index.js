import expess from "express";
import routes from "./routes/index.js";

const PORT = 8080;

const app = expess();

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
