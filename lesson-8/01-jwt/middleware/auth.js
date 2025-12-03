import jwt from "jsonwebtoken";

function auth(req, res, next) {
  // беремо токен зі вкладки headers authorization
  const authorizationHeader = req.headers.authorization;

  console.log(authorizationHeader); //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjQ1NTc3ZmU5MmI5MDYzY2RmMGE3OCIsIm5hbWUiOiJNYXJpYSIsImlhdCI6MTc2NDMyODM5OSwiZXhwIjoxNzY0MzMxOTk5fQ.uJngfAJ5vEIIVQn7EVZOayUR1t07o0nXTTao7BlGHb8

  // 1. перевіряємо чи є в нас токен (чи він не протух)
  if (typeof authorizationHeader === "undefined") {
    return res.status(401).send({ message: "Invalid token" });
  }

  const [bearer, token] = authorizationHeader.split(" ", 2); // наш bearer розділяємо на 2 елементи по пробілу
  console.log({ bearer, token });
  //  bearer: 'Bearer',
  //   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjQ1NTc3ZmU5MmI5MDYzY2RmMGE3OCIsIm5hbWUiOiJNYXJpYSIsImlhdCI6MTc2NDMyODM5OSwiZXhwIjoxNzY0MzMxOTk5fQ.uJngfAJ5vEIIVQn7EVZOayUR1t07o0nXTTao7BlGHb8";

  // 2. перевіряємо на Bearer
  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "Invalid token" });
  }

  // 3.валідація токену (чи це дійсно токен випущений нашою системою), приймає (токен рядок, секрет, та колбек)
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }

    console.log({ decode });

    next();
  });
}

export default auth;

// 50:00
