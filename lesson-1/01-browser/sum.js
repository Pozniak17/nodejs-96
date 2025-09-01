function sum(a, b) {
  return a + b;
}

console.log(sum(1, 2));
console.log(sum(2, 2));
console.log(sum(3, 3));

// пишиме node sum.js і покаже в консолі

// приклад спільного api (це з browser api)
alert(sum(1, 2)); // Not work in Node.js
localStorage.setItem("sum", sum(1, 2)); // Not work in Node.js

// якщо спробувати запустити цей код☝️, буде помилка у виконанні node.js api (browser api помилка в node.js api)
