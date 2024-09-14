import express from "express";
import {
  createAtsResume,
  createAtsTemplate,
} from "../Services/atsResumeService.js";

const app = express();

app.post("/resume", async (req, res) => {
  const { name, query } = req.body;
  const id = req.user.id;

  res.send(await createAtsResume(name, query, id));
});

app.post("/template", async (req, res) => {
  const { name, query } = req.body;

  const id = req.user.id;

  res.send(await createAtsTemplate(name, query, id));
});

export default app;
