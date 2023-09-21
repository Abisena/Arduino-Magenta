import suhus from "./suhu.js";

export const createsuhu = async (req, res) => {
  try {
    const { suhu, status } = req.body;

    if (!suhu || !status) {
      return res.status(400).json({ message: "Bad request. Missing data." });
    }

    const newsuhu = new suhus({
      suhu: suhu,
      status: status,
    });
    await newsuhu.save();

    res.status(200).json({ massage: "success", data: newsuhu });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error" });
  }
};

export const getAllsuhu = async (req, res) => {
  try {
    const getAll = await suhus.find();

    res.status(200).json(getAll);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
