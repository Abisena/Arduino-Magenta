import express from "express";
import { createLamp, getAllLamps } from "../controllers/arduinos.js";
import Lamp from "../models/arduino.js";
import dummyData from "../dumy/dumy.js"; // Sesuaikan dengan lokasi berkas dummy data Anda

const router = express.Router();

router.post("/add", createLamp);

router.post("/addDummy", async (req, res) => {
  try {
    for (const data of dummyData) {
      const newLamp = new Lamp(data);
      await newLamp.save();
    }

    res.status(201).json({ message: "Data dummy berhasil ditambahkan." });
  } catch (error) {
    res.status(500).json({ error: "Gagal menambahkan data dummy." });
  }
});

// Rute untuk mendapatkan semua data lampu
router.get("/lampstatus", getAllLamps);

export default router;
