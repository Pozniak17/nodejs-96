import express from "express";

const app = express();

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Movie ${id}`);
});

app.get("/movies/2", (req, res) => {
  res.send("Movie 2");
});

app.listen(8080, () => {
  console.log("Server started on PORT 8080");
});
