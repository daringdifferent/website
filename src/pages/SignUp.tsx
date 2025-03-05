// /pages/SignUp.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Mail, Check, CreditCard } from 'lucide-react';
import { supabase } from '../lib/supabase'; // adjust the path as needed

// A simple Google icon component
const GoogleIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      d="M21.35 11.1H12v2.8h5.35c-.2 1.8-1.3 3.3-2.8 4.3v3.6h4.5c2.6-2.4 4.1-5.9 4.1-9.7 0-.65-.05-1.3-.15-1.9z"
      fill="#4285F4"
    />
    <path
      d="M12 22c2.9 0 5.35-.95 7.13-2.58l-4.5-3.6c-1.25.85-2.85 1.35-3.63 1.35-2.78 0-5.13-1.88-5.97-4.42H1.1v3.53C2.88 19.95 7.13 22 12 22z"
      fill="#34A853"
    />
    <path
      d="M6.03 13.37a7.1 7.1 0 0 1 0-4.74V5.1H1.1a11.99 11.99 0 0 0 0 13.8l4.93-3.53z"
      fill="#FBBC05"
    />
    <path
      d="M12 4.44c1.58 0 2.99.55 4.11 1.63l3.08-3.08C17.35 1.55 14.9 0 12 0 7.13 0 2.88 2.05 1.1 5.1l4.93 3.53C6.87 6.32 9.22 4.44 12 4.44z"
      fill="#EA4335"
    />
  </svg>
);

const SUBSCRIPTION_LINK = 'https://buy.stripe.com/test_14kg2P25PdAS2885kl';

const SignUp: React.FC = () => {
  // Read query parameter to determine the plan ("free" or "premium")
  const [searchParams] = useSearchParams();
  const plan = searchParams.get('plan') || 'free';
  const navigate = useNavigate();
  const location = useLocation();

  // Separate states for free and premium sign up
  const [freeName, setFreeName] = useState('');
  const [freeEmail, setFreeEmail] = useState('');
  const [freePassword, setFreePassword] = useState('');

  const [premiumName, setPremiumName] = useState('');
  const [premiumEmail, setPremiumEmail] = useState('');
  const [premiumPassword, setPremiumPassword] = useState('');

  const [message, setMessage] = useState<string | null>(null);

  // Handler for free tier sign up via email/password
  const handleFreeSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    const { error } = await supabase.auth.signUp(
      { email: freeEmail, password: freePassword },
      { data: { full_name: freeName } }
    );
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Check your email for a confirmation link!');
    }
  };

  // Handler for free tier Google sign up
  const handleFreeGoogleSignUp = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) {
      setMessage(error.message);
    }
    // Supabase handles redirection on success
  };

  // Handler for premium tier sign up via email/password then proceed to checkout
  const handlePremiumEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    const { error } = await supabase.auth.signUp(
      { email: premiumEmail, password: premiumPassword },
      { data: { full_name: premiumName } }
    );
    if (error) {
      setMessage(error.message);
    } else {
      // After successful sign up, proceed to checkout by redirecting to the subscription link.
      handlePaidSubscription();
    }
  };

  // Handler for premium tier Google sign up; assume Google sign in sets up the account.
  const handlePremiumGoogleSignUp = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) {
      setMessage(error.message);
    }
    // Supabase will redirect on success; after return, you might prompt them to proceed to checkout.
  };

  // Handler to redirect to Stripe checkout for premium subscription
  const handlePaidSubscription = async () => {
    try {
      window.location.href = SUBSCRIPTION_LINK;
    } catch (err) {
      setMessage('An error occurred while redirecting to checkout.');
    }
  };

  // Close modal: if opened as overlay, go back; otherwise, navigate home.
  const handleClose = () => {
    if (location.state && (location.state as any).backgroundLocation) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-md p-8 relative"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
          aria-label="Close"
        >
          X
        </button>

        {plan === 'free' ? (
          <div>
            <h2 className="text-2xl font-bold text-center text-[#01576E] mb-4">
              Sign Up for Free
            </h2>
            {message && <div className="mb-4 text-center text-red-600">{message}</div>}
            <form onSubmit={handleFreeSignUp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={freeName}
                  onChange={(e) => setFreeName(e.target.value)}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#01576E] focus:border-[#01576E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={freeEmail}
                  onChange={(e) => setFreeEmail(e.target.value)}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#01576E] focus:border-[#01576E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={freePassword}
                  onChange={(e) => setFreePassword(e.target.value)}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#01576E] focus:border-[#01576E]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#01576E] text-white rounded-md hover:bg-[#014356] transition-colors"
              >
                Sign Up
              </button>
            </form>
            <div className="my-6 flex items-center justify-center">
              <span className="text-gray-500 text-sm">or</span>
            </div>
            <button
              onClick={handleFreeGoogleSignUp}
              className="w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <GoogleIcon />
              <span className="ml-2 text-gray-700">Sign up with Google</span>
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center text-[#01576E] mb-4">
              Premium Subscription
            </h2>
            {message && <div className="mb-4 text-center text-red-600">{message}</div>}
            <p className="mb-4 text-gray-700 text-center">
              Get unlimited access to all premium content.
            </p>
            <form onSubmit={handlePremiumEmailSignUp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={premiumName}
                  onChange={(e) => setPremiumName(e.target.value)}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#01576E] focus:border-[#01576E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={premiumEmail}
                  onChange={(e) => setPremiumEmail(e.target.value)}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#01576E] focus:border-[#01576E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={premiumPassword}
                  onChange={(e) => setPremiumPassword(e.target.value)}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#01576E] focus:border-[#01576E]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#01576E] text-white rounded-md hover:bg-[#014356] transition-colors"
              >
                Proceed to Checkout
              </button>
            </form>
            <div className="my-6 flex items-center justify-center">
              <span className="text-gray-500 text-sm">or</span>
            </div>
            <button
              onClick={handlePremiumGoogleSignUp}
              className="w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <GoogleIcon />
              <span className="ml-2 text-gray-700">Sign up with Google</span>
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SignUp;
