import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://arduino:arduino12345@cluster0.cmqrijy.mongodb.net/arduino_lamp",
  // "mongodb://localhost:27017/arduino_lamp",
  {
    useNewUrlparser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

export default db;
