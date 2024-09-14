import express from "express";
import { testService } from "../Services/testService.js";
const app = express();

app.get("/", async (req, res) => {
  res.send(await testService());
});

export default app;
