import mongoose from "mongoose";

const DB_URI =
  "mongodb+srv://studentGlock:hruhru@cluster0.dqc8z5n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
  try {
    await mongoose.connect(DB_URI);
    console.info("Database connection successfully");
  } finally {
    await mongoose.disconnect();
  }
}

run().catch((error) => console.error(error));
