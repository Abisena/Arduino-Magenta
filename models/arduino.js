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
<<<<<<< HEAD
    type: Date, // Menggunakan tipe data Date untuk waktu
=======
    type: Date,
>>>>>>> ce034b13a6a8d6edde4883c9854c4ba25f200e61
    required: true,
  },
});

const Lamp = mongoose.model("Lamp", arduinoSchema);

export default Lamp;
