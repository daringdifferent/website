// server.ts
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';


console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY);
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { donationAmount } = req.body;
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
            unit_amount: donationAmount * 100, // convert dollars to cents
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/donate-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/donate-cancel`,
    });
    res.status(200).json({ id: session.id });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});
