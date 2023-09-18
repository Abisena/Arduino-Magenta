const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const port = process.env.PORT || 3000;
const five = require("johnny-five");
const board = new five.Board();

app.use(bodyParser.urlencoded({ extended: true }));

let lightStatus = "Mati";
let db;

app.get("/", (req, res) => {
  const serverAddress = `http://${req.headers.host}`;
  res.send(`Alamat server Arduino: ${serverAddress}`);
});

const mongoURI = "mongodb://localhost:27017/arduino_db";
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

board.on("ready", () => {
  const lampuPin = new five.Led(2);

  app.get("/get_light_status", (req, res) => {
    res.json({ lightStatus });
  });

  app.post("/update_light", (req, res) => {
    const { lightStatus } = req.body;

    if (lightStatus !== "Nyala" && lightStatus !== "Mati") {
      return res.status(400).json({ error: "Status lampu tidak valid" });
    }

    lampuPin.toggle();
    lightStatus = lampuPin.isOn ? "Nyala" : "Mati";

    db.collection("lamp_statuses").insertOne(
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
});
