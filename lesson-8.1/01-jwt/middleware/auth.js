//! middleware яка буде показувати дані тільки якщо токен валідний

import jwt from "jsonwebtoken";

import User from "../models/user.js";

function auth(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  //* перевірки токену
  //! 1.чи є взагалі в нас токен, може бути або string або undefined
  if (typeof authorizationHeader === "undefined") {
    return res.status(401).send({ message: "Invalid token" });
  }

  //! 2. якщо string, то має містити "Bearer" і токен
  // розділяємо по пробілу і вказуємо що має бути лише 2 елементи, робимо деструктуризацію
  const [bearer, token] = authorizationHeader.split(" ", 2);

  // перевірка на "Bearer"
  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "Invalid token" });
  }

  // перевірка токену самого(чи це токен випущений нашою системою), приймає token, secret з .env, та колбек(err, decode)
  // якщо вставити інший токен, то видасть помилку
  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }

    try {
      const user = await User.findById(decode.id);
      // перевірки якщо токен протух або після logout = null
      // якщо користувача немає
      if (user === null) {
        return res.status(401).send({ message: "Invalid token" });
      }

      // якщо токен не валідний
      if (user.token !== token) {
        return res.status(401).send({ message: "Invalid token" });
      }

      console.log({ decode });

      //! нам треба розділяти користувачів і їх запити, тому полю req додаємо поле user, це для персоналізованих відповідей на запити користувачів
      // в controllers в getBooks в req є тепер поле user
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

//todo req.headers витягує ось такий об'єкт, де зберігається наш токен
// {
//*   authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MmRiOTQ3NjA5YzkwMDViMzk0NzRhMyIsIm5hbWUiOiJNYXJpYSIsImlhdCI6MTc2NTIwMTQ5MywiZXhwIjoxNzY1MjA1MDkzfQ.3_wdQTb1T8q01UIZ-Hsh7322eYqS5n3RgmdJgEuT2Oc',
//   'user-agent': 'PostmanRuntime/7.49.1',
//   accept: '*/*',
//   'postman-token': '92683480-2da0-48c2-97f9-60796285df0d',
//   host: 'localhost:8080',
//   'accept-encoding': 'gzip, deflate, br',
//   connection: 'keep-alive'
// }

//todo decode - це наш payload і в ньому об'єкт, з токену дані
//   decode: {
//     id: '692db947609c9005b39474a3',
//     name: 'Maria',
//     iat: 1765205557,
//     exp: 1765209157
//   }
