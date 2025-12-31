import jwt from "jsonwebtoken";
import User from "../models/user.js";

function auth(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  console.log(authorizationHeader);

  // чи взагалі є токен
  if (typeof authorizationHeader === "undefined") {
    return res.status(401).send({ message: "Invalid token" });
  }

  // розділяємо по пробілу і 2 елементи
  const [bearer, token] = authorizationHeader.split(" ", 2);

  console.log({ bearer, token });

  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "Invalid token" });
  }

  // перевірка чи валідний токен, чи це дійсно той токен, який був випущений нашою системою
  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }

    try {
      //todo Заняття 8.2 перевірки при логауті
      const user = await User.findById(decode.id);

      if (user === null) {
        return res.status(401).send({ message: "Invalid token" });
      }

      if (user.token !== token) {
        return res.status(401).send({ message: "Invalid token" });
      }

      console.log({ decode });

      //   створюємо об'єкт, щоб знати від якого кор-ча приходить запит, щоб повертати йому персоналізовану відповідь
      // req.user = {
      //   id: decode.id,
      //   name: decode.name,
      // };

      //todo якщо більше потрібно інформації то

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

// todo decode це наш payload

//  decode: {
//     id: '692db90f609c9005b394749f',
//     name: 'Michael',
//     iat: 1767007081,
//     exp: 1767014281
//   }
