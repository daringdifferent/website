import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';

// Use process.env if available, otherwise fallback to import.meta.env (for Vite)
const stripeKey =
  typeof process !== 'undefined'
    ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    : import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

const stripePromise = loadStripe(stripeKey || '');

const Donate: React.FC = () => {
  const [donationAmount, setDonationAmount] = useState('10');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleDonate = async () => {
    setIsProcessing(true);
    setErrorMsg('');
    try {
      // Create a checkout session on your backend
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ donationAmount: Number(donationAmount) }),
      });

      const session = await response.json();

      if (session.error) {
        setErrorMsg(session.error);
        setIsProcessing(false);
        return;
      }

      const stripe = await stripePromise;
      if (!stripe) {
        setErrorMsg('Stripe could not be loaded.');
        setIsProcessing(false);
        return;
      }

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (error) {
        setErrorMsg(error.message || 'An error occurred during checkout.');
      }
    } catch (error: any) {
      console.error(error);
      setErrorMsg('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-b from-white to-pink-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1950&q=80"
            alt="Donate Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Donate to Ciara&apos;s Work
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Your support empowers Ciara&apos;s mission to inspire and help others.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Donation Form */}
      <section className="flex-grow py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white shadow-md rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-[#01576E]">
              Make a Donation
            </h2>
            {errorMsg && (
              <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-200 rounded">
                {errorMsg}
              </div>
            )}
            <div className="space-y-6">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Donation Amount (USD)
                </label>
                <input
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#01576E]"
                  min="1"
                  step="1"
                />
              </div>
              <div className="text-center">
                <button
                  onClick={handleDonate}
                  disabled={isProcessing}
                  className="px-6 py-2 bg-[#01576E] text-white rounded hover:bg-[#014f63] focus:outline-none focus:ring-2 focus:ring-[#01576E]"
                >
                  {isProcessing ? 'Processing...' : 'Donate Now'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Donate;
