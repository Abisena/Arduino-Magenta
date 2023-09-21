import all from "../models/arduino.js";

export const create = async (req, res) => {
  try {
    const { 
      item, 
      suhu, 
      kelembapan, 
      jarak, 
      status, 
    } = req.body;

    const date = new Date();
    const time_at = date.setHours(date.getHours() + 7);

    const newall = new all({
      item: item,
      suhu: suhu,
      kelembapan: kelembapan,
      jarak: jarak,
      status: status,
      time_at: time_at,
    });

    await newall.save();

    res.status(201).json({
      message: "Data berhasil dibuat",
      data: newall,
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Terjadi kesalahan saat membuat data",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const alls = await all.find().sort({ time_at: 1 });

    res.status(200).json(alls);
  } catch (error) {
    res.status(500).json({
      error: "Gagal mendapatkan data",
    });
  }
};

export const deleteStatus = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      res.status(400).json({
        message: "Ids are required as an array",
      });

      return;
    }

    const delItems = await all.find({ _id: { $in: ids } });

    if (delItems.length !== ids.length) {
      res.status(404).json({
        message: "Some Id not found",
      });

      return;
    }

    await all.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      message: "Ids deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
