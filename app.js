import express from "express";
import createLamp from "./routes/ardu.js";
import getAllLamps from "./routes/ardu.js";
import db from "./config/conn.js";
import bodyParser from "body-parser";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(createLamp);
app.use(getAllLamps);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("Connected to database");
});

// app.post("/data", (req, res) => {
//   const dataFromESP8266 = req.body;
//   console.log("Data received from ESP8266:", dataFromESP8266);
//   res.status(200).json({ message: "Data received successfully" });
// });

app.listen(port, () => {
  console.log(`Run Server http://localhost:${port}`);
});
