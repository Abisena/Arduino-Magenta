import Lamp from "../models/arduino.js";

export const createLamp = async (req, res) => {
  try {
    const { item, status, time_at } = req.body;
    const newLamp = new Lamp({
      item,
      status,
      time_at,
    });
    await newLamp.save();

    res.status(201).json({ message: "Data Lampu dibuat", data: newLamp });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat membuat data Lampu" });
  }
};

export const getAllLamps = async (req, res) => {
  try {
    const lamps = await Lamp.find();
    res.status(200).json(lamps);
  } catch (error) {
    res.status(500).json({ error: "Gagal mendapatkan data lampu." });
  }
};
