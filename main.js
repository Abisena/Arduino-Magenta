const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const mongoURI = "mongodb://localhost:27017/arduino_lamp"; // Ganti dengan URI MongoDB Anda
let db;

app.get("/", (req, res) => {
  const serverAddress = `http://${req.headers.host}`;
  res.send(`Alamat server Arduino: ${serverAddress}`);
});

MongoClient.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      console.error("Koneksi MongoDB gagal:", err);
    } else {
      console.log("Terhubung ke MongoDB");
      db = client.db();
    }
  }
);

let lightStatus = "Mati"; // Status awal lampu

app.get("/get_light_status", (req, res) => {
  res.json({ lightStatus });
});

app.post("/update_light", (req, res) => {
  const { lightStatus } = req.body;

  if (lightStatus !== "Nyala" && lightStatus !== "Mati") {
    return res.status(400).json({ error: "Status lampu tidak valid" });
  }

  // Simpan data ke MongoDB
  db.collection("status_lamp").insertOne(
    { status: lightStatus },
    (err, result) => {
      if (err) {
        console.error("Gagal menyimpan data ke MongoDB:", err);
        return res.status(500).json({ error: "Gagal menyimpan data" });
      }

      console.log("Data berhasil disimpan ke MongoDB");
      res.json({ message: "Status lampu diperbarui", lightStatus });
    }
  );
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
