const fs = require("node:fs/promises");
const path = require("node:path");

// замість змінної __dirname використовують пакет path і в ньому метод join() - приймає шлях і об'єднує в один
//! __dirname - працює тільки в commonJS, в ES6 не працює
async function readMovies() {
  //* використовуємо
  const filePath = path.join(__dirname, "movies.txt");

  console.log(`${__dirname}/movies.txt`); // абсолютний шлях, метод не зручний, використовують path.join(), він ще й нормалізує дужки
  console.log(filePath);
  const data = await fs.readFile(filePath, { encoding: "utf-8" });

  return data;
}

// аналог іменного експорту
module.exports = {
  readMovies,
};

// аналог дефолтного експорту
// module.exports = readMovies;
