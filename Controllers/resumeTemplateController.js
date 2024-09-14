import express from "express";
import {
  getAllResumeTemplateService,
  getSingleResumeTemplateService,
} from "../Services/resumeTemplateService.js";

const app = express();

app.get("/get-all-resume-templates", async (req, res) => {
  const userId = req.user.id;
  res.send(await getAllResumeTemplateService(userId));
});

app.get("/get-single-resume-templates", async (req, res) => {
  const id = req.query.id;
  res.send(await getSingleResumeTemplateService(id));
});
export default app;
