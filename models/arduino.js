import mongoose from "mongoose";

const arduinoSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  time_at: {
    type: String, // Menggunakan tipe data Date untuk waktu
    required: true,
  },
});

const Lamp = mongoose.model("Lamp", arduinoSchema);

export default Lamp;
