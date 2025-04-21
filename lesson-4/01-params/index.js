import express from "express";

const app = express();
const PORT = 8080;

app.get("/movies/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  res.send(`Movie ${id}`);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
