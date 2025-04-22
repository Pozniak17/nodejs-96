// import express from "express";
// import crypto from "node:crypto";

// const app = express();
// const port = 8080;

// //* цей метод розпарсить req.body, для post,put,patch, тому глабально ми її не робимо
// //! app.use(express.json());
// //* тому
// const jsonParser = express.json();

// app.post("/movies", jsonParser, (req, res) => {
//   //   console.log(req.body);
//   const { title, producer, year } = req.body;

//   res.status(201).send({ id: crypto.randomUUID(), title, producer, year });
// });

// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });
