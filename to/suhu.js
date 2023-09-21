import { createsuhu, getAllsuhu } from "./suhus.js";
import express from "express";

const routes = express.Router();
routes.post("/create", createsuhu);
routes.get("/getSuhu", getAllsuhu);
export default routes;
