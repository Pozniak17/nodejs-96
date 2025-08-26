//* Callback
// const fs = require("node:fs");

// console.log("Start"); //виконається 1

// зчитування файлу, це асинхронний метод
// приймає колбек функцію (помилка, дані), також робимо розкодування, бо видасть буфер
// виконається 3, бо асинхронна функція readFile
// fs.readFile("read.txt", { encoding: "utf-8" }, (err, data) => {
//   if (err) {
//     throw err;
//   }
//   console.log(data);
// });

// console.log("End"); //виконається 2

// node readFile.js - щоб запустити

//* Promises
const fs = require("node:fs/promises");

console.log("Start"); //виконається 1

// тут без колбеку, як на 9 рядку, бо promises
// fs.readFile("read.txt", { encoding: "utf-8" })
//   .then((data) => console.log(data))
//   .catch((err) => {
//     throw err;
//   });

//   тепер доступні ось такі плюшки в промісах, зчитуємо 3 файли паралельно
const p1 = fs.readFile("read.txt", { encoding: "utf-8" });
const p2 = fs.readFile("read.txt", { encoding: "utf-8" });
const p3 = fs.readFile("read.txt", { encoding: "utf-8" });

Promise.all([p1, p2, p3])
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    throw err;
  });

console.log("End"); //виконається 2
