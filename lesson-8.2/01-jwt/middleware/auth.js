import jwt from "jsonwebtoken";

import User from "../models/user.js";

// мідлвара контролер (перевірятиме токен і дозволятиме побачити приватні дані)
function auth(req, res, next) {
  //   витягуємо токен
  const authorizationHeader = req.headers.authorization;

  // Перевіряємо чи є в нас взагалі токен, якщо є то string, якщо немає то undefined
  if (typeof authorizationHeader === "undefined") {
    return res.status(401).send({ message: "Invalid token" });
  }

  // якщо є = string, а чи є там Bearer (розділяємо по пробілу і вказуємо що там 2 елементи)
  const [bearer, token] = authorizationHeader.split(" ", 2);

  console.log({ bearer, token });

  // перевіряємо в bearer чи є "Bearer"
  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "Invalid token" });
  }

  // перевіряємо токен, (token, secret.key, callback(помилка, декодоване значення нашого токену))
  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    // якщо помилка (наприклад токен не наший)
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }

    //todo Заняття 8.2
    // тут перевірка, щоб при логауті викидувало користувача (не можна було робити запити)
    try {
      const user = await User.findById(decode.id);

      if (user === null) {
        return res.status(401).send({ message: "Invalid token" });
      }

      if (user.token !== token) {
        return res.status(401).send({ message: "Invalid token" });
      }

      console.log({ decode });

      //мутуємо створюємо на req => user з даними (для для того, щоб виводити персоналізовані дані користувача)
      // req.user = {
      //   id: decode.id,
      //   name: decode.name,
      // };

      req.user = {
        id: user._id,
        name: user.name,
      };

      next();
    } catch (error) {
      next(error);
    }
  });
}

export default auth;

// todo це в нас в decode (декодоване значення token лежить)
// decode: {
//     id: '692db947609c9005b39474a3',
//     name: 'Maria',
//     iat: 1766495437,
//     exp: 1766502637
//   }
