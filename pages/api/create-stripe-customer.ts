import Stripe from "stripe";
import { supabase } from "../../services/supabase";

const handler = async (req: any, res: any) => {
  if (req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
    return res.status(401).send("Not authorized");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-08-01",
  });

  const customer = await stripe.customers.create({
    email: req.body.record.email,
  });

  await supabase
    .from("profile")
    .update({ stripe_customer: customer.id })
    .eq("id", req.body.record.id);

  res.send({ message: `stripe customer created: ${customer.id}` });
};

export default handler;
