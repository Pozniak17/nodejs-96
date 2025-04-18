import express from "express";

const PORT = 8080;

const app = express();

app.get("/", (request, response) => {
  response.send("Hello, Express!");
});

app.post("/movies", (request, response) => {
  response.send("POST Movies:)");
});

app.listen(PORT, () => {
  console.log(`Server stated on port ${PORT}`);
});
