import User from "../models/user.js";
import bcrypt from "bcrypt";

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

export default {
  register,
};
