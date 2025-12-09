import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

async function register(req, res, next) {
  const { name, email, password } = req.body;

  const emailInLowerCase = email.toLowerCase();

  try {
    // перевіряємо на однаковість емейлу, findOne шукає по якому фільтру (якщо знайшов повертає документ, якщо ні то null)
    const user = await User.findOne({ email: emailInLowerCase });

    // якщо user знайшовся, то не дорівнює null, користувач є в системі (програмна перевірка)
    if (user !== null) {
      return res.status(409).send({ message: "User already registered" }); // 409 це конфліктні дані
    }

    // Хешуємо пароль (щоб не було видно розробнику пароль в БД), першим передаємо що саме, а друге сіль (зазвичай 10)
    const passwordHash = await bcrypt.hash(password, 10);

    // Зберігаємо користувача в базі даних
    const result = await User.create({
      name,
      email: emailInLowerCase,
      password: passwordHash,
    });

    console.log(result);
    res.status(201).send({ message: "Registration succesfully" });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  const emailInLowerCase = email.toLowerCase();

  try {
    // здійснюємо пошук чи є такий користувач
    // ! порівнюємо email
    const user = await User.findOne({ email: emailInLowerCase });
    // якщо користувача немає
    if (user === null) {
      console.log("Email");
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    // якщо знайдено по email, приймає 2 значення (пароль, захешована версія паролю) знаходиться в user.password
    //! порівнюємо password з хешом який в БД
    const isMatch = await bcrypt.compare(password, user.password);

    // ще одна перевірка на пароль
    if (isMatch === false) {
      console.log("Password");
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    //! передаємо {payload} - дані id, name;
    //! secretOrPrivateKey - зберігаємо в змінних оточення;
    //! options - expiresIn - скільки часу буде валідний токен;
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // записуємо в поле користувача токен при логіні
    await User.findByIdAndUpdate(user._id, { token });

    // якщо все успішно і емейл вірний введено і пароль пройшов перевірку, то повертаємо token з інформацією про користувача
    res.send({ token });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null }); //при logout ставимо токен в null
    res.status(204).end();
  } catch (error) {
    next(error);
  }
  res.send("Logout");
}

export default {
  register,
  login,
  logout,
};
