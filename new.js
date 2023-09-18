const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Middleware untuk mengizinkan pengolahan data JSON
app.use(bodyParser.json());

// Simulasi status lampu (ON atau OFF)
let suaraValue = "OFF";

// Endpoint untuk mengambil status lampu
app.get("/api/lampu", (req, res) => {
  res.json({ status: suaraValue });
});

// Endpoint untuk mengubah status lampu berdasarkan data suara
app.post("/api/lampu", (req, res) => {
  const dataSuara = req.body.soundValue; // Data sensor suara yang dikirimkan dalam body permintaan POST

  // Lakukan sesuatu dengan data suara untuk mengontrol lampu (misalnya, berdasarkan ambang tertentu)
  if (dataSuara > 100) {
    suaraValue = "ON";
  } else {
    suaraValue = "OFF";
  }

  // Respon dengan status lampu yang baru
  res.json({ status: lampuStatus });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
