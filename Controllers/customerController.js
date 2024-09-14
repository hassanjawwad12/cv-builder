import express from "express";
import {
  getCustomer,
  getCustomerBuilds,
} from "../Services/userService.js";

const app = express();
// api/customer/get
app.get("/get", async (req, res) => {
  const id = req.user.id;

  res.send(await getCustomer(id));
});

app.get("/get-builds", async (req, res) => {
  const id = req.user.id;

  res.send(await getCustomerBuilds(id));
});
export default app;
