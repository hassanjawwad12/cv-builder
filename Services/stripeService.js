import { config } from "dotenv";
config();
import supabase from "../Model/supabase.js";
import stripe from "stripe";

class Stripe {
  constructor() {
    console.log("Stripe Service Initialized");
    this.stripe = stripe(process.env.STRIPE_SECRET_KEY);
  }

  async fetchStipeCustomer(email) {
    try {
      const { data: customer_data, error: customer_err } = await supabase
        .from("customer")
        .select("*")
        .eq("email", email)
        .single();

      if (!customer_err && customer_data.stripe_customer_id) {
        return customer_data;
      }

      const customer = await this.stripe.customers.create({
        email: email,
        name: customer_data.name,
      });

      const { data } = await supabase
        .from("customer")
        .update({ stripe_customer_id: customer.id })
        .eq("email", email)
        .select("*")
        .single();
      return data;
    } catch (err) {
      return null;
    }
  }

  async fetchStipeProduct(plan_id) {
    try {
      const { data: plan_data, error: plan_err } = await supabase
        .from("plans")
        .select("*")
        .eq("plan_id", plan_id)
        .single();

      if (!plan_err && plan_data.stripe_plan_id != null) {
        return plan_data;
      }

      const data = await this.stripe.products.create({
        name: plan_data.name,
        default_price_data: {
          unit_amount: parseInt(plan_data.price * 100),
          currency: "usd",
          recurring: {
            interval: "month",
          },
        },
        description: "Level up.",
      });

      let { data: plans_data, error: plans_err } = await supabase
        .from("plans")
        .update({ stripe_plan_id: data.id, price_id: data.default_price })
        .eq("plan_id", plan_id)
        .select("*")
        .single();
      if (plans_err) {
        return null;
      }
      return plans_data;
    } catch (err) {
      console.log(err);
    }
    return null;
  }

  async createPaymentLink(email, plan_id, finalSuccessURL, finalCancelURL) {
    try {
      let customer = await this.fetchStipeCustomer(email);
      let product = await this.fetchStipeProduct(plan_id);

      if (
        customer?.stripe_customer_id == null ||
        product?.stripe_plan_id == null
      ) {
        return {
          err: "Input Parameters Missing. No Plan or Customer Provided....",
          data: null,
          status: 401,
        };
      }

      let session;

      if (plan_id === 1) {
        session = await this.stripe.checkout.sessions.create({
          success_url: finalSuccessURL,
          cancel_url: finalCancelURL,
          customer: customer.stripe_customer_id,
          line_items: [
            {
              price: product.price_id,
              quantity: 1,
            },
          ],
          subscription_data: {
            trial_settings: {
              end_behavior: {
                missing_payment_method: "cancel",
              },
            },
          },
          payment_method_collection: "if_required",
          mode: "subscription",
        });
      } else {
        session = await this.stripe.checkout.sessions.create({
          success_url: finalSuccessURL,
          cancel_url: finalCancelURL,
          customer: customer.stripe_customer_id,
          allow_promotion_codes: true,
          line_items: [
            {
              price: product.price_id,
              quantity: 1,
            },
          ],

          mode: "subscription",
        });
      }
      return {
        err: null,
        data: session.url,
        status: 200,
      };
    } catch (err) {
      console.log(err);

      return {
        status: 500,
        err: err.message,
        data: null,
      };
    }
  }
}

const _Stripe = new Stripe();

export default _Stripe;
