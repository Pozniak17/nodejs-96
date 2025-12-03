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
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("User", userSchema);
