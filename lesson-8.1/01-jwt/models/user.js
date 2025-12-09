import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, //це для унікальних значень, дивитися в compass у вкладні indexes (повинно з'явитися email) (перевірка на рівні бд)
    },
    password: {
      type: String,
      required: true,
    },
    // зберігаємо токен користувача для logout
    token: {
      type: String,
      default: null, //токен записується тільки після login, а за замовчуванням null
    },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("User", userSchema);
