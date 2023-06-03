import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://database:jTLpzf5VcNScKCw9@cluster0.6epawmb.mongodb.net/banhang"
    );
    console.log("DB connected okiii!!");
  } catch (error) {
    console.log("DB connect fail !!");
  }
}