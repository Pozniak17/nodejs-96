import express from "express";

const PORT = 8080;
const app = express();

app.get("/movies/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  res.send(`Movies ${id}`);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
