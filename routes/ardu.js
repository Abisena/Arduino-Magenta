import express from "express";
import Lamp from "../models/arduino.js";
import dummyData from "../dumy/dumy.js";
import { createLamp, getAllLamps } from "../controllers/arduinos.js";

const router = express.Router();

router.post("/add", createLamp);    // menambahkan data
router.get("/lampstatus", getAllLamps);   // menampilkan data

router.post("/addDummy", async (req, res) => {    // menampilkan data dummy
  try {
    for (const data of dummyData) {
      const newLamp = new Lamp(data);
      await newLamp.save();
    };

    res
      .status(201)
      .json({ 
        message: "Data dummy berhasil ditambahkan" 
      });

  } catch (error) {
    res
      .status(500)
      .json({ 
        error: "Gagal menambahkan data dummy" 
      });
  };
});

export default router;
