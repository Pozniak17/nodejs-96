const fs = require("node:fs/promises");

const str = JSON.stringify([1, 2, 3, 4]);

// записуємо в write.txt текст, writeFile перезатирає, а також створює файл, якщо його немає в папці write.txt
fs.writeFile("write.txt", "I love Node.js")
  .then((data) => console.log(data))
  .catch((err) => {
    throw err;
  });

// або
fs.writeFile("write.txt", str)
  .then((data) => console.log(data))
  .catch((err) => {
    throw err;
  });
