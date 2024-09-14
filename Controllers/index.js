import express from "express";
import test_controller from "./test.js";
import stripe_controller from "./stripeController.js";
import customer_controller from "./customerController.js";
import create_ats_resume_controller from "./atsResumeController.js";
import resume_template_controller from "./resumeTemplateController.js";
import { authentication } from "../Middleware/authentication.js";

const controller = express();

controller.use("/test", test_controller);

controller.use(express.json());
controller.use(express.urlencoded({ extended: true }));

controller.get("/", (req, res) => {
  res.send("Hello World in index Controller.");
});

controller.use(authentication);

// /api/customer
controller.use("/customer", customer_controller);
controller.use("/create-ats", create_ats_resume_controller);
controller.use("/resume-template", resume_template_controller);
controller.use("/stripe", stripe_controller);


export default controller;
