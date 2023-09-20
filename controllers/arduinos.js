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
      item: item,
      status: status,
      time_at: time_at,
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
<<<<<<< HEAD
res.status(500)
      .json({ 
        message: "Terjadi kesalahan saat membuat data" 
      });
  };
=======

    
>>>>>>> ce034b13a6a8d6edde4883c9854c4ba25f200e61
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
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      res
        .status(400)
        .json({ 
          message: "Ids are required as an array" 
        });

      return;
    }

    const delItems = await Lamp.find({ _id: { $in: ids } });

    if (delItems.length !== ids.length) {
      res
        .status(404)
        .json({ 
          message: "Some Ids not found" 
        });

      return;
    }

    await Lamp.deleteMany({ _id: { $in: ids } });

    res
      .status(200)
      .json({ 
        message: "Ids deleted successfully" 
      });

  } catch (error) {
    res
      .status(500)
      .json({ 
        message: "Internal Server Error"
      });
  };
};
