import mongoose from "mongoose";

const arduinoSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  suhu: {
    type: String,
    required: true,
  },
  kelembapan: {
    type: String,
    required: true,
  },
  jarak: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  time_at: {
    type: Date,
    required: true,
  },
});
const all = mongoose.model("Lamp", arduinoSchema);
export default all;
