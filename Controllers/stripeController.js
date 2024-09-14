import express from "express";
import _Stripe from "../Services/stripeService.js";
const app = express();

app.post("/subscription-checkout-session", async (req, res) => {
  const { plan_id, success_url, cancel_url } = req.body;
  const email = req.user.email;

  const defaultSuccessURL = "https://www.facebook.com";
  const defaultCancelURL = "https://www.google.com";

  const finalSuccessURL = success_url || defaultSuccessURL;
  const finalCancelURL = cancel_url || defaultCancelURL;

  res.send(
    await _Stripe.createPaymentLink(
      email,
      plan_id,
      finalSuccessURL,
      finalCancelURL
    )
  );
});

export default app;
