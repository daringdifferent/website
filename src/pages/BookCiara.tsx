import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

const BookCiara: React.FC = () => {
  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('Speaking Engagement');
  const [eventDateTime, setEventDateTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [audienceSize, setAudienceSize] = useState('');
  const [message, setMessage] = useState('');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Simple Framer Motion animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    // Basic client-side validation
    if (
      !fullName ||
      !email ||
      !phone ||
      !eventDateTime ||
      !eventLocation ||
      !audienceSize ||
      !message
    ) {
      setErrorMsg('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([
          {
            full_name: fullName,
            email,
            phone,
            service_type: serviceType,
            event_date_time: eventDateTime,
            event_location: eventLocation,
            audience_size: audienceSize,
            message,
          },
        ])
        .single();

      if (error) {
        throw error;
      }

      // Reset form fields
      setFullName('');
      setEmail('');
      setPhone('');
      setServiceType('Speaking Engagement');
      setEventDateTime('');
      setEventLocation('');
      setAudienceSize('');
      setMessage('');
      setSuccessMsg('Thank you! Your booking request was submitted successfully.');
    } catch (error: any) {
      console.error('Error creating booking:', error.message);
      setErrorMsg('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-b from-white to-pink-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1508923567004-3a6b8004f3d1?auto=format&fit=crop&w=1950&q=80"
            alt="Book Ciara Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#01576E]/70 to-[#FFFFFF]/50" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-24 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Book Ciara</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Secure Ciara for your next speaking engagement or counseling session.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Booking Form */}
      <section className="flex-grow py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-md rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-[#01576E]">
              Request Booking
            </h2>

            {/* Error and success messages */}
            {errorMsg && (
              <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-200 rounded">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="mb-4 p-3 text-green-700 bg-green-100 border border-green-200 rounded">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#01576E]"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#01576E]"
                  placeholder="yourname@example.com"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#01576E]"
                  placeholder="(555) 123-4567"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">Service Type</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#01576E]"
                >
                  <option value="Speaking Engagement">Speaking Engagement</option>
                  <option value="Counseling">Counseling</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Event Date &amp; Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  value={eventDateTime}
                  onChange={(e) => setEventDateTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#01576E]"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Event Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#01576E]"
                  placeholder="City, Venue, or Address"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Audience Size <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={audienceSize}
                  onChange={(e) => setAudienceSize(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#01576E]"
                  placeholder="Estimated number of attendees"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Additional Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#01576E]"
                  placeholder="Tell us about your event or what you'd like to discuss..."
                  required
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-[#01576E] text-white rounded hover:bg-[#014f63] focus:outline-none focus:ring-2 focus:ring-[#01576E]"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Booking'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BookCiara;
