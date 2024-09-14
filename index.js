import express from "express";
import controller from "./Controllers/index.js";
import cors from "cors";
import Stripe from "stripe";
import supabase from "./Model/supabase.js";
import { fileURLToPath } from 'url';
import path from 'path';
import compression from "compression";

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];
    let event;
    console.log("webhook called");
    let tolerance = 8000;
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        sig,
        endpointSecret,
        tolerance
      );
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    switch (event.type) {
      case "customer.subscription.created":
        const customerSubscriptionCreated = event.data.object;

        if (customerSubscriptionCreated) {
          const plan = customerSubscriptionCreated.plan;

          const { data: planData } = await supabase
            .from("plans")
            .select("*")
            .eq("stripe_plan_id", plan.product)
            .single();

          await supabase
            .from("customer")
            .update({
              plan: planData.plan_id,
              builds_limit: planData.builds_limit,
            })
            .eq("stripe_customer_id", customerSubscriptionCreated.customer);

          console.log("The Customer Subscription is Created.");
        }
        break;

      case "customer.subscription.updated":
        const customerSubscriptionUpdated = event.data.object;
        console.log("status", customerSubscriptionUpdated.status);
        const plan = customerSubscriptionUpdated.plan;

        const { data: planData } = await supabase
          .from("plans")
          .select("*")
          .eq("stripe_plan_id", plan.product)
          .single();
        console.log("this is plans data", planData);
        if (planData) {
          await supabase
            .from("customer")
            .update({
              plan: planData.plan_id,
              builds_limit: planData.builds_limit,
            })
            .eq("stripe_customer_id", customerSubscriptionUpdated.customer);
          console.log("The Customer Subscription is Updated.");
        }

        break;
      case "customer.subscription.deleted":
        const customerSubscriptionDeleted = event.data.object;
        await supabase
          .from("customer")
          .update({
            plan: null,
            builds_limit: 0,
          })
          .eq("stripe_customer_id", customerSubscriptionDeleted.customer);
        break;
      default:
    }
    response.send();
  }
);

app.use(cors());
app.use(compression());
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'views')));

app.use("/api", controller);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
