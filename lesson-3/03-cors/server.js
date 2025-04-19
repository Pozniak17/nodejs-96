import * as fs from "node:fs/promises";
import path from "node:path";
import express from "express";
import cors from "cors";

const app = express();
const PORT = 8080;

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     optionsSuccessStatus: 200,
//   })
// );

// app.get("/movies", async (req, res) => {
//   const data = await fs.readFile(path.resolve("movies.txt"), {
//     encoding: "utf-8",
//   });

//   res.send(data);
// });

// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });
