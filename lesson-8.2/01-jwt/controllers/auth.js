import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function register(req, res, next) {
  const { name, email, password } = req.body;
  const emailInLowerCase = email.toLowerCase();

  try {
    const user = await User.findOne({ email: emailInLowerCase });

    // якщо є в системі
    if (user !== null) {
      return res.status(409).send({ message: "User already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await User.create({
      name,
      email: emailInLowerCase,
      password: passwordHash,
    });

    console.log({ result });

    res.status(201).send({ message: "Registration successfully" });
  } catch (error) {
    next(error);
  }
}

//todo Заняття 7.2
async function login(req, res, next) {
  const { email, password } = req.body;

  const emailInLowerCase = email.toLowerCase();
  try {
    const user = await User.findOne({ email: emailInLowerCase });

    // перевірка на емейл в системі
    if (user === null) {
      console.log("Email");
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    // якщо користувач є в системі, треба порівняти паролі
    // порівнює пароль та хеш-пароль(наш який в системі)
    const isMatch = await bcrypt.compare(password, user.password);
    // якщо пароль не пройшов
    if (isMatch === false) {
      console.log("Password");
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    //todo Заняття 8.1
    // створюємо токен jwt.sign(payload, secret, час дії), який будемо передавати при успішному логіні
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // якщо все ОК, емейл знайшло в системі, пароль зійшовся, повертаємо токен
    res.send({ token });
  } catch (error) {
    next(error);
  }
}

export default {
  register,
  login,
};
