//todo мідлвара user все закидає в tmp, а контролер uploadAvatar розносить по різним папкам (для аватарів поле avatar, для постерів поле - posters, в базі даних)
import * as fs from "node:fs/promises";
import path from "node:path";

import User from "../models/user.js";

async function uploadAvatar(req, res, next) {
  // приймає старий шлях і новий куди треба перемістити та як назвати (filename називаємо)
  try {
    await fs.rename(
      req.file.path,
      path.resolve("public/avatars", req.file.filename)
    );

    // записуємо користувачу поле аватар з картинкою
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: req.file.filename },
      { new: true }
    );

    // це перевірка на не знайденого користувача (але в мідлварі auth ми там вже робимо її, це більше для TypeScript)
    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send(user);
  } catch (error) {
    next(error);
  }
}

// берево аватарку
async function getAvatar(req, res, next) {
  try {
    // шукаємо користувача
    const user = await User.findById(req.user.id);

    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }

    // якщо в кор-ча немає аватарки
    if (user.avatar === null) {
      return res.status(404).send({ message: "Avatar not found" });
    }

    // якщо аватарка є, треба повернути файл аватарки
    res.sendFile(path.resolve("public/avatars", user.avatar));
  } catch (error) {
    next(error);
  }
}

export default { uploadAvatar, getAvatar };

//! в req.file вся інформація про картинку, яка з мідлвари upload.js
// todo це req.file з multer
// {
//   fieldname: 'avatar',
//   originalname: 'wp6784523-web-developer-wallpapers.jpg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   destination: 'C:\\Users\\pozni\\Documents\\GitHub\\nodejs-96\\lesson-9\\tmp',
//   filename: 'wp6784523-web-developer-wallpapers-de75c826-6ca6-4a07-98cd-d134c8822e2e.jpg',
//   path: 'C:\\Users\\pozni\\Documents\\GitHub\\nodejs-96\\lesson-9\\tmp\\wp6784523-web-developer-wallpapers-de75c826-6ca6-4a07-98cd-d134c8822e2e.jpg',
//   size: 200794
// }
