import jwt from "jsonwebtoken";

async function auth(req, res, next) {
  const authorizationHeaders = req.headers.authorization;

  console.log(authorizationHeaders); //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MmRiOTQ3NjA5YzkwMDViMzk0NzRhMyIsIm5hbWUiOiJNYXJpYSIsImlhdCI6MTc2NDc2OTM5NCwiZXhwIjoxNzY0NzcyOTk0fQ.EWb2sHdnH1ryJxQaSt4YresZKYzn4dUtAY8eytid9l8

  //! перевірка 1, якщо не переданий токен або протух
  //   також впевнюємося що тут є string
  if (typeof authorizationHeaders === "undefined") {
    return res.status(401).send({ message: "Invalid token" });
  }

  //! перевірка 2, на те чи в рядку є слово Bearer, розділяємо по пробілу і вказуємо що повинно бути 2 елементи
  // елемент 1 в bearer,елемент 2 в token
  const [bearer, token] = authorizationHeaders.split(" ", 2);

  console.log({ bearer, token });

  //! перевірка 3 чи там в тексті не абракадабра
  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "Invalid token" });
  }

  //! перевірка 4 через JWT чи валідний токен, чи це саме той токен, який був випущений нашою системою
  // передаються token, secret і колбек (err, decode)
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }

    console.log({ decode });

    //! це мутування об'єкта user, для того аби персоналізувати відповідь, користувач1 отримує своє, користувач2 інше своє
    req.user = {
      id: decode.id,
      name: decode.name,
    };

    next();
  });
}

export default auth;

//todo в decode наш payload
//  decode: {
//     id: '692db947609c9005b39474a3',
//     name: 'Maria',
//     iat: 1764775989,
//     exp: 1764783189
//   }
