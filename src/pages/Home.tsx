import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Youtube,
  Instagram,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Import your Supabase client
import { supabase } from '../lib/supabase'; // adjust the path as needed

// TikTokIcon Component (as provided)
const TikTokIcon = ({ color = "#000000" }) => {
  return (
    <svg
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="100%"
      height="100%"
    >
      <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
    </svg>
  );
};

// Primary color palette
const colors = {
  primary: '#F2245F',   // Pinkish-red
  secondary: '#FBB03B', // Vibrant orange
  accent: '#F52B62',    // Slightly darker red-pink
  navy: '#01576E',      // Darker teal
  white: '#FFFFFF',
};

// Simple fade-up variant
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

// Container stagger
const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.2 },
  },
};

// Slide transition variants for Testimonials
const slideVariants = {
  enter: { x: 300, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -300, opacity: 0 },
};

const Home = () => {
  // Mailing list subscription state
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Updated subscription handler to send email to Supabase
  const handleSubscribe = async (e) => {
    e.preventDefault();
    // Insert the email into the "mailing_list" table in Supabase
    const { error } = await supabase
      .from('mailing_list')
      .insert([{ email }]);
    if (error) {
      console.error('Error adding email to mailing list:', error);
      // Optionally, handle the error (e.g., show an error message to the user)
    } else {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  // Testimonials carousel logic
  const testimonials = [
    {
      name: 'Alex Johnson',
      quote:
        '“Listening to Ciara’s podcast has opened my eyes to new perspectives. Her authenticity and warmth shine through every episode.”',
      image:
        'https://images.unsplash.com/photo-1570158268183-d296b2892211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Emily Roberts',
      quote:
        '“Ciara’s courage to speak up for disability awareness is truly inspiring. I always look forward to her next conversation.”',
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Michael Green',
      quote:
        '“The podcast is a must-listen for anyone interested in real stories and genuine empowerment. Thank you for all you do!”',
      image:
        'https://images.unsplash.com/photo-1590080876115-9c8fc3b0ca65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide the testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Slide every 5 seconds
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // We'll store a ref if we need to manually clear the interval from the dots
  const slideRef = useRef();

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };
  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // 15-photo slideshow logic
  const slideshowImages = [
    'https://images.unsplash.com/photo-1618606478939-1fb335c5984b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1572283326184-cb48f917ef79?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1625472487334-0c69bd5afc4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1603113081514-2d24f7ebf25b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1595936111727-b883dfb6c4a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1623709710223-197cb622b0cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600727318796-9d6bbe0bf80c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600770943699-a7d81f078410?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1613126508806-f5648241a5c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1625002052055-4ee3b4be8d14?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1548454789-ec4c5f23886e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1611415512212-0299923caa25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1605168937333-2c18aa71c2da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1622810821188-c4b8bed8fc06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  ];

  const [slideIndex, setSlideIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* 1. HERO SECTION (Restore original background, add subtle parallax) */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-b from-white to-[#FBB03B]/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 pt-24 pb-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Left column (Text + CTA) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <motion.div className="mb-8">
                <img
                  src="https://drive.google.com/thumbnail?id=1q5EAHNm5ii_9xlcdtycwQZaPTpuj9FRO&sz=w1000"
                  alt="Daring Different with Ciara"
                  className="w-full max-w-md"
                />
              </motion.div>
              <p className="text-xl text-[#01576E] mb-8 leading-relaxed max-w-lg">
                Join us on an inspiring journey of breaking barriers and empowering voices.
              </p>

              {/* Gradient Buttons around #01576E */}
              <div className="flex flex-wrap gap-4">
                {/* Start Listening Button (goes to /podcast) */}
                <Link to="/podcast">
                  <motion.button
                    whileHover={{ scale: 1.08, rotateX: 5 }}
                    whileTap={{ scale: 0.95, rotateX: 0 }}
                    className="relative px-8 py-4 font-bold text-white rounded-full
                               transition-transform duration-300
                               shadow-lg ring-2 ring-offset-0 ring-[#01576E]
                               hover:shadow-xl outline-none
                               [transform-style:preserve-3d]"
                    style={{
                      background: 'linear-gradient(to right, #014356, #01576E, #017e99)',
                    }}
                  >
                    <span className="drop-shadow-md">Start Listening</span>
                  </motion.button>
                </Link>

                {/* Learn More Button (goes to /about) */}
                <Link to="/about">
                  <motion.button
                    whileHover={{ scale: 1.08, rotateX: 5 }}
                    whileTap={{ scale: 0.95, rotateX: 0 }}
                    className="relative px-8 py-4 font-bold text-white rounded-full
                               transition-transform duration-300
                               shadow-lg ring-2 ring-offset-0 ring-[#01576E]
                               hover:shadow-xl outline-none
                               [transform-style:preserve-3d]"
                    style={{
                      background: 'linear-gradient(to right, #014356, #01576E, #017e99)',
                    }}
                  >
                    <span className="drop-shadow-md">Learn More</span>
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Right column (Hero Image) */}
            <motion.div
              className="relative h-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-all duration-300">
                <img
                  src="https://drive.google.com/thumbnail?id=1pBaRkxpqw05F34DE2k3fT9FukUZ7lP7y&sz=w1000"
                  alt="Ciara"
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#01576E]/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Animated Chevron Down */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-8 h-8 text-[#01576E]" />
        </motion.div>
      </motion.section>

      {/* 2. TRAILER SECTION */}
      <motion.section
        className="relative py-20 bg-gradient-to-b from-[#e8e8e5] to-white overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Soft wave accent at the top */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block w-[calc(150%+1.3px)] h-32"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
          >
            <path
              d="M321.39,56.4C203.44,74,85.82,95.81,0,109.79V120H1200V0C1100.76,24.36,957.56,62.08,777.48,49.2C608.88,37.29,482.84,15.69,321.39,56.4Z"
              fill="#FBB03B"
              fillOpacity="0.15"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Section */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.7, ease: 'easeOut' }}
              className="text-center lg:text-left"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-teal-700 mb-4">
                Watch the Trailer
              </h2>
              <p className="text-lg md:text-xl text-black">
                Catch a glimpse of this incredible journey.
              </p>
            </motion.div>

            {/* Video Section */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
              className="relative rounded-2xl overflow-hidden shadow-2xl p-2
                        bg-white/10 border border-white/20 backdrop-blur-md 
                        hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)]
                        transition-all"
            >
              <div className="aspect-video relative rounded-2xl overflow-hidden">
                <iframe
                  src="https://drive.google.com/file/d/1NMtdE_LsZGhz6uRKyJzJkmOgdwI9InJ1/preview"
                  className="w-full h-full"
                  title="Daring Different Trailer"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 3. PICTURE SLIDESHOW (15 Photos) */}
      <section className="relative py-10 bg-gradient-to-b from-white to-[#e8e8e5]">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold text-[#01576E] mb-8">
            A Glimpse into Many Journeys
          </h2>
          <div className="overflow-hidden relative w-full h-[400px] mx-auto rounded-md shadow-lg">
            <AnimatePresence mode="wait">
              <motion.img
                key={slideshowImages[slideIndex]}
                src={slideshowImages[slideIndex]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute w-full h-full object-cover"
                alt="Slideshow of persons with disabilities"
              />
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. FEATURED CARDS (Revamped) */}
      <section className="relative py-24 bg-gradient-to-br from-white to-[#FBB03B]/10 overflow-hidden">
        {/* Decorative Wave Accent at the Top */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
          <svg
            className="block w-[calc(100%+1.3px)] h-24"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
          >
            <path
              d="M321.39,56.4C203.44,74,85.82,95.81,0,109.79V120H1200V0C1100.76,24.36,957.56,62.08,777.48,49.2C608.88,37.29,482.84,15.69,321.39,56.4Z"
              fill="#FBB03B"
              fillOpacity="0.15"
            />
          </svg>
        </div>

        {/* Optional Subtle Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/dots.png')] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                imageUrl:
                  'https://images.unsplash.com/photo-1511376777868-611b54f68947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                title: 'Latest Episodes',
                description: 'Explore conversations about disability awareness.',
                borderColor: '#FBB03B',
                link: '/podcast',
              },
              {
                imageUrl:
                  'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                title: 'Books by Ciara',
                description: 'Discover inspiring books sharing her journey.',
                borderColor: '#F2245F',
                link: '/books',
              },
              {
                imageUrl:
                  'https://images.unsplash.com/photo-1509223197845-458d87318791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                title: 'Support Us',
                description: 'Help us continue making a difference.',
                borderColor: '#01576E',
                link: '/donate',
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ rotateY: 8, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="group relative rounded-2xl overflow-hidden transition-all duration-300 border-2
                    [transform-style:preserve-3d] cursor-pointer
                    shadow-md hover:shadow-xl"
                style={{ borderColor: card.borderColor }}
              >
                {/* Image with gradient overlay */}
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/50" />
                </div>

                {/* Glass Morph Panel over text content */}
                <div className="relative px-6 py-8 bg-white/50 backdrop-blur-md -mt-6 mx-4 rounded-2xl shadow-lg">
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ color: card.borderColor }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-[#01576E] mb-4 leading-relaxed">
                    {card.description}
                  </p>
                  <Link
                    to={card.link}
                    className="inline-flex items-center space-x-2 font-semibold group"
                    style={{ color: card.borderColor }}
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. TESTIMONIALS WITH AUTO-SLIDE + DOTS */}
      <section className="relative py-24 bg-white overflow-hidden">
        {/* Decorative Wave Accent at the Top (optional) */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="block w-[calc(100%+1.3px)] h-24 rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
          >
            <path
              d="M321.39,56.4C203.44,74,85.82,95.81,0,109.79V120H1200V0
              C1100.76,24.36,957.56,62.08,777.48,49.2
              C608.88,37.29,482.84,15.69,321.39,56.4Z"
              fill="#FBB03B"
              fillOpacity="0.15"
            />
          </svg>
        </div>

        {/* Optional Subtle Pattern for Background */}
        <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/dots.png')] bg-repeat opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold text-[#01576E] mb-4">
              What People Are Saying
            </h2>
            <p className="text-xl text-[#01576E] max-w-2xl mx-auto">
              Hear from our community who’ve been inspired by Ciara’s journey and podcast episodes.
            </p>
          </motion.div>

          <div className="relative max-w-xl mx-auto">
            {/* Slide container */}
            <div className="overflow-hidden relative h-[380px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonials[currentIndex].name}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6 }}
                  className="absolute w-full flex items-center justify-center"
                >
                  <motion.div
                    className="rounded-2xl shadow-xl p-6
                              bg-white/30 backdrop-blur-md
                              flex flex-col items-center justify-center text-center
                              max-w-md mx-auto
                              cursor-pointer
                              transition-transform duration-500
                              hover:scale-105 hover:rotate-1"
                  >
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-20 h-20 rounded-full object-cover mb-4 shadow-md"
                    />
                    <p className="text-[#01576E] italic mb-4 leading-relaxed">
                      {testimonials[currentIndex].quote}
                    </p>
                    <h4 className="font-semibold text-[#01576E]">
                      {testimonials[currentIndex].name}
                    </h4>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Dots */}
            <div className="flex flex-col items-center justify-center gap-4 mt-6">
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      clearInterval(slideRef.current);
                      setCurrentIndex(i);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300
                      ${
                        i === currentIndex
                          ? 'bg-[#01576E] scale-125'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-4"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SUBSCRIPTION SECTION */}
      <section className="py-24 bg-[#FBB03B]/10" id="subscribe">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#01576E] mb-4">Join Our Mailing List</h2>
            <p className="text-xl text-[#01576E]">
              Stay updated on new episodes, behind-the-scenes content, and more!
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onSubmit={handleSubscribe}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 border-2 border-[#F2245F]/50 rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-[#F2245F] text-[#01576E]"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.08, rotateX: 5 }}
              whileTap={{ scale: 0.95, rotateX: 0 }}
              className="relative px-8 py-4 font-bold text-white rounded-full
                    transition-transform duration-300
                    shadow-lg ring-2 ring-offset-0 ring-[#01576E]
                    hover:shadow-xl outline-none
                    [transform-style:preserve-3d]"
              style={{
                background: 'linear-gradient(to right, #014356, #01576E, #017e99)',
              }}
            >
              <span className="drop-shadow-md">Subscribe</span>
            </motion.button>
          </motion.form>

          {subscribed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-green-600 font-semibold text-center"
            >
              Thank you for subscribing!
            </motion.div>
          )}
        </div>
      </section>

      {/* 7. CONTACT SECTION (3D tilt + glass effect) */}
      <section className="py-24 bg-white" id="contact">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#01576E] mb-4">Get in Touch</h2>
            <p className="text-xl text-[#01576E]">
              We’d love to hear from you! Whether you have questions, feedback, or just want to
              connect, reach out anytime.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Mail className="mx-auto mb-4 w-10 h-10 text-[#F2245F]" />,
                title: 'Email',
                text: 'info@daringdifferent.com.au',
              },
              {
                icon: <Phone className="mx-auto mb-4 w-10 h-10 text-[#F2245F]" />,
                title: 'Phone',
                text: '041 6407 730',
              },
              {
                icon: <MapPin className="mx-auto mb-4 w-10 h-10 text-[#F2245F]" />,
                title: 'Address',
                text: '123 Inspiring Lane\nEmpower City, EC 78910',
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="relative text-center bg-[#FBB03B]/10 rounded-2xl p-8 backdrop-blur-md 
                           cursor-pointer shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.6 }}
                whileHover={{ rotateY: 8 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {card.icon}
                <h3 className="text-xl font-semibold text-[#01576E] mb-2">{card.title}</h3>
                <p className="text-[#01576E] whitespace-pre-line">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FOOTER SECTION */}
      <footer className="bg-[#01576E] text-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="font-semibold">
              © {new Date().getFullYear()} Daring Different with Ciara. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/daringdifferent"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FBB03B] transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://www.tiktok.com/@daring.with.cici"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FBB03B] transition-colors"
              aria-label="TikTok"
            >
              <div className="w-6 h-6">
                <TikTokIcon color="currentColor" />
              </div>
            </a>
            <a
              href="https://www.youtube.com/@DARINGDIFFERENT1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FBB03B] transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/daringdifferent/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FBB03B] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
