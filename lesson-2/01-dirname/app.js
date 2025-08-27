const movies = require("./movies");

// коли імпортуємо з іменного
movies
  .readMovies()
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// коли імпортуємо з дефолтного
// movies()
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));
