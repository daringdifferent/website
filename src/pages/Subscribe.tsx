import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Lock,
  Check,
  CreditCard,
  Shield,
  Star,
  Users,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const benefits = [
  {
    icon: <Lock className="w-6 h-6 text-secondary" />,
    title: "Full Access to Premium Content",
    description: "Unlock all episodes and exclusive content",
  },
  {
    icon: <Users className="w-6 h-6 text-secondary" />,
    title: "Join Our Community",
    description: "Connect with like-minded listeners",
  },
  {
    icon: <Star className="w-6 h-6 text-secondary" />,
    title: "Early Access",
    description: "Be the first to hear new episodes",
  },
];

const SubscribeModal: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black bg-opacity-70 overflow-auto"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white w-full max-w-5xl mx-auto my-8 rounded-lg shadow-lg relative"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 text-gray-600 hover:text-gray-800 focus:outline-none"
          aria-label="Close"
        >
          X
        </button>

        {/* Modal Header / Hero */}
        <div className="pt-16">
          <section className="relative py-20">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-r from-[#01576E]/90 to-[#01576E]/70" />
              <img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="Subscribe background"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white text-center"
              >
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  Join Our Community
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                  Choose the plan that suits you best.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Subscription Options */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Free Tier Option */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
                >
                  <div className="p-8 bg-gradient-to-r from-[#01576E] to-[#01576E]/90 text-white">
                    <h2 className="text-3xl font-bold mb-4">Free Tier Subscription</h2>
                    <p className="text-gray-200 mb-6">
                      Enjoy standard features — excluding premium podcast videos and audio.
                    </p>
                    <button
                      onClick={() => navigate('/signup?plan=free')}
                      className="w-full bg-white text-[#01576E] hover:bg-white/90 py-3 rounded-full flex items-center justify-center transition-colors"
                    >
                      <span>Activate Free Tier</span>
                    </button>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-semibold text-[#01576E] mb-6">
                      What's Included:
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-secondary mt-1 mr-3" />
                        <span>Access to all standard episodes</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-secondary mt-1 mr-3" />
                        <span>Exclusive behind-the-scenes content</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-secondary mt-1 mr-3" />
                        <span>Early access to new episodes</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-secondary mt-1 mr-3" />
                        <span>Ad-free listening experience</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-secondary mt-1 mr-3" />
                        <span>Access to our private community</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-secondary mt-1 mr-3" />
                        <span>Excludes premium podcast videos and audio</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Premium Subscription Option */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
                >
                  <div className="p-8 bg-gradient-to-r from-[#01576E] to-[#01576E]/90 text-white">
                    <h2 className="text-3xl font-bold mb-4">Premium Subscription</h2>
                    <p className="text-gray-200 mb-6">
                      Get unlimited access to all content and features.
                    </p>
                    <div className="flex items-baseline mb-6">
                      <span className="text-5xl font-bold">
                        ${isAnnual ? "96" : "10"}
                      </span>
                      <span className="ml-2 text-gray-200">
                        /{isAnnual ? "year" : "month"}
                      </span>
                    </div>
                    <button
                      onClick={() => navigate('/signup?plan=premium')}
                      className="w-full bg-white text-[#01576E] hover:bg-white/90 py-3 rounded-full flex items-center justify-center transition-colors"
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      <span>Subscribe Now</span>
                    </button>
                  </div>
                  <div className="p-8">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center space-x-2 bg-gray-100 p-1 rounded-full">
                        <button
                          onClick={() => setIsAnnual(false)}
                          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                            !isAnnual ? "bg-white shadow-md text-[#01576E]" : "text-gray-600"
                          }`}
                        >
                          Monthly
                        </button>
                        <button
                          onClick={() => setIsAnnual(true)}
                          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                            isAnnual ? "bg-white shadow-md text-[#01576E]" : "text-gray-600"
                          }`}
                        >
                          Annually
                          <span className="ml-2 text-xs text-secondary">Save 20%</span>
                        </button>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-[#01576E] mb-6">
                      What's Included:
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-secondary mt-1 mr-3" />
                        <span>Full access to all premium episodes</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-secondary mt-1 mr-3" />
                        <span>Exclusive behind-the-scenes content</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-secondary mt-1 mr-3" />
                        <span>Early access to new episodes</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-secondary mt-1 mr-3" />
                        <span>Ad-free listening experience</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-secondary mt-1 mr-3" />
                        <span>Access to our private community</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-[#01576E] mb-6">
                  Why Subscribe?
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Join our community of listeners and get access to exclusive content and features.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white p-8 rounded-2xl shadow-lg"
                  >
                    <div className="mb-4">{benefit.icon}</div>
                    <h3 className="text-xl font-bold text-[#01576E] mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Security Notice */}
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center text-gray-600">
                <Shield className="w-5 h-5 mr-2" />
                <span>
                  Secure payment processing • Cancel anytime • 30-day money-back guarantee
                </span>
              </div>
            </div>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SubscribeModal;
