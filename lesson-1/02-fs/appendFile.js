const fs = require("node:fs/promises");

// додає в кінець дані і створює файл append.txt, якщо такого немає. \n - вказує щоб з нового рядка
fs.appendFile("append.txt", "I love Node.js\n")
  .then((data) => console.log({ data }))
  .catch((err) => {
    throw err;
  });
