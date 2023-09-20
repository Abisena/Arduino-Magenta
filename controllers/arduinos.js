import Lamp from "../models/arduino.js";

export const createLamp = async (req, res) => {
  try {
    const { 
      item, 
      status, 
    } = req.body;

    const date = new Date();
    const time_at = date.setHours(date.getHours() + 7);
    
    const newLamp = new Lamp({
      item,
      status,
      time_at,
    });

    await newLamp.save();

    res
      .status(201)
      .json({ 
        message: "Data berhasil dibuat", 
        data: newLamp, 
      });

  } catch (error) {
    console.error(error);

    res
      .status(500)
      .json({ 
        message: "Terjadi kesalahan saat membuat data" 
      });
  };
};

export const getAllLamps = async (req, res) => {
  try {
    const lamps = await Lamp.find();

    res
      .status(200)
      .json(lamps);

  } catch (error) {
    res
      .status(500)
      .json({ 
        error: "Gagal mendapatkan data" 
      });
  };
};

export const deleteStatus = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      res
        .status(400)
        .json({ 
          message: "Id is required" 
        });

      return;
    }

    const delItem = await Lamp.findOne({ _id: id });

    if (!delItem) {
      res
        .status(404)
        .json({ 
          message: "Id not found" 
        });

      return;
    }

    await Lamp.deleteOne({ _id: id });

    res
      .status(200)
      .json({ 
        message: "Id deleted successfully" 
      });

  } catch (error) {
    res
      .status(500)
      .json({ 
        message: "Internal Server Error"
      });
  };
};
