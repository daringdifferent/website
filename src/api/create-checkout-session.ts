// pages/api/create-checkout-session.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { donationAmount } = req.body;

      // Create a Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: "Donation to Ciara's Work",
              },
              unit_amount: donationAmount * 100, // Convert dollars to cents
            },
            quantity: 1,
          },
        ],
        // Replace these URLs with your own success and cancel pages
        success_url: `${req.headers.origin}/donate-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/donate-cancel`,
      });

      res.status(200).json({ id: session.id });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
