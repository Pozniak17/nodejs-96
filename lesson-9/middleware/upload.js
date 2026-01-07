// Заняття 9
import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";

// зберігаємо на диску а не в оперативній пам'яті
const storage = multer.diskStorage({
  // відповідає в яку директорію зберегти файл з форм дати
  destination(req, file, cb) {
    //* передаємо помилку та шлях
    // console.log(path.resolve("tmp"));
    cb(null, path.resolve("tmp"));
  },
  // відповідає з якою назвою має зберегтися файл
  //! треба відділити назву і формат і додати id, це щоб не перезатиралася картинка з однаковою назвою
  filename(req, file, cb) {
    //* file.originalname = TrevorPhilips-GTAV.png
    //* 1. var1 = "TrevorPhilips-GTAV"; var2 = ".png"
    //* 2. var3 = "49ef37fd-dfb8-4240-8dc2-b45b317925fb"
    //* 3. var1 + "-" + var3 + var2 => "TrevorPhilips-GTAV-49ef37fd-dfb8-4240-8dc2-b45b317925fb"
    const extname = path.extname(file.originalname); // повертає розширення файлу, яке ми передаємо = .png
    const basename = path.basename(file.originalname, extname); // TrevorPhilips-GTAV
    const suffix = crypto.randomUUID(); // унікальний id

    console.log(`${basename}-${suffix}${extname}`); //TrevorPhilips-GTAV-69c6b6ca-b342-4a48-ac55-3a8ef91c1064.png
    // хочемо зберегти з оригінальним ім'ям
    cb(null, `${basename}-${suffix}${extname}`);
  },
});

export default multer({ storage });

// todo в file міститься
// file: {
//     fieldname: 'avatar',
//     originalname: '2008-Mitsubishi-Lancer-Evolution-X-001-1080.jpg',
//     encoding: '7bit',
//     mimetype: 'image/jpeg'
//   }
