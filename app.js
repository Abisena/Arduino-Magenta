const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

let lightStatus = "Mati"; // Status awal lampu

app.get("/update_light", (req, res) => {
  const onLightStatus = "Nyala";
  const offLightStatus = "Mati";

  if (lightStatus == onLightStatus) {
    lightStatus = offLightStatus;
  } else {
    lightStatus = onLightStatus;
  }

  console.log("Status lampu otomatis diperbarui:", lightStatus);

  // Kirim respons dengan status lampu yang diperbarui
  res.json({ message: "Status lampu otomatis diperbarui", lightStatus });
});

app.get("/get_light_status", (req, res) => {
  // Kirim status lampu yang diperoleh dari Arduino
  res.json({ lightStatus });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
