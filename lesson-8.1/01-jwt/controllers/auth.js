import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

async function register(req, res, next) {
  const { name, email, password } = req.body;

  const emailInLowerCase = email.toLowerCase();

  try {
    const user = await User.findOne({ email: emailInLowerCase });

    if (user !== null) {
      return res.status(409).send({ message: "User already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email: emailInLowerCase,
      password: passwordHash,
    });

    res.status(201).send({ message: "Registration successfully" });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  const emailInLowerCase = email.toLowerCase();
  try {
    const user = await User.findOne({ email: emailInLowerCase });
    // ! порівнюємо email
    if (user === null) {
      console.log("Email");
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    //! порівнюємо password з хешом який в БД
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      console.log("Password");
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    // створюємо token, передаємо 3 аргументи payload (id та name), secretKey зберігаємо в .env та options(скільки часу буде жити наш token)
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.send({ token });
  } catch (error) {
    next(error);
  }
}

export default {
  register,
  login,
};
