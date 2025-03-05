import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import {
  Heart,
  Users,
  Sparkles,
  ArrowRight,
  Coffee,
  ThumbsUp,
  Headphones,
  BookOpen,
  Star,
  Gift,
  ChevronDown,
  Share2,
  PlusCircle,
  Check,
  Info
} from 'lucide-react';

// Replace with your actual Payment Link URL from Stripe
const PAYMENT_LINK_URL = 'https://buy.stripe.com/test_5kA03R25PeEWcMMfYY';

// Hubtel-inspired color palette with expanded options
const colors = {
  primary: '#0A2240',      // Navy Blue
  primaryDark: '#061830',  // Darker Navy
  primaryLight: '#1A3A5A', // Lighter Navy
  secondary: '#FF9E1B',    // Orange
  secondaryDark: '#E08000', // Darker Orange
  secondaryLight: '#FFBE5C', // Lighter Orange
  accent: '#00B2A9',       // Teal
  accentDark: '#008C84',   // Darker Teal
  accentLight: '#3FD5CC',  // Lighter Teal
  highlight: '#F15A5A',    // Coral Red
  white: '#FFFFFF',
  light: '#F7F9FC',
  gray: '#E1E5EB',
  dark: '#062040',
  gradient: {
    primary: 'linear-gradient(135deg, #0A2240 0%, #1A3A5A 100%)',
    secondary: 'linear-gradient(135deg, #FF9E1B 0%, #FFBE5C 100%)',
    accent: 'linear-gradient(135deg, #00B2A9 0%, #3FD5CC 100%)',
    vibrant: 'linear-gradient(135deg, #FF9E1B 0%, #00B2A9 100%)',
    cool: 'linear-gradient(135deg, #0A2240 0%, #00B2A9 100%)',
    hot: 'linear-gradient(135deg, #0A2240 0%, #FF9E1B 100%)',
  }
};

// Advanced animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const fadeInDown = {
  initial: { opacity: 0, y: -40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const fadeInRight = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const fadeInLeft = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

// Particle shapes for background animation
const ParticleShape = ({ className }) => {
  const y = useMotionValue(0);
  const x = useMotionValue(0);
  
  useEffect(() => {
    const randomX = Math.random() * 20 - 10;
    const randomY = Math.random() * 20 - 10;
    const randomDuration = 10 + Math.random() * 20;
    
    const animateParticle = () => {
      y.set(randomY);
      x.set(randomX);
      
      // Animate with slight delay for more natural feel
      setTimeout(() => {
        y.set(-randomY);
        x.set(-randomX);
        
        // Reverse after duration
        setTimeout(() => {
          animateParticle();
        }, randomDuration * 1000);
      }, 100);
    };
    
    animateParticle();
  }, []);
  
  return (
    <motion.div 
      className={className}
      style={{ y, x }}
      transition={{ duration: 20, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
    />
  );
};

// Floating animation for heart
const FloatingHeart = ({ delay = 0, duration = 10, size = 30 }) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ 
        y: 0, 
        x: Math.random() * 100 - 50,
        opacity: 0,
        scale: Math.random() * 0.5 + 0.5,
      }}
      animate={{ 
        y: [-20, -200], 
        opacity: [0, 1, 0],
        rotate: Math.random() * 60 - 30,
      }}
      transition={{ 
        duration: duration, 
        delay: delay,
        ease: "easeOut",
        times: [0, 0.2, 1],
      }}
      style={{
        width: size,
        height: size,
      }}
    >
      <Heart className="w-full h-full text-[#F15A5A]" />
    </motion.div>
  );
};

const Donate = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [donationAmount, setDonationAmount] = useState(25);
  const [donationFrequency, setDonationFrequency] = useState('one-time');
  const [showHearts, setShowHearts] = useState(false);
  const [hearts, setHearts] = useState([]);

  // Scroll animation values
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  
  // Scroll triggered animations
  const heroOpacity = useTransform(smoothScrollProgress, [0, 0.2], [1, 0]);
  const formScale = useTransform(smoothScrollProgress, [0.1, 0.3], [0.95, 1]);
  const formOpacity = useTransform(smoothScrollProgress, [0.1, 0.3], [0, 1]);

  const handleDonate = () => {
    setIsProcessing(true);
    // Create animation effect
    setShowHearts(true);
    
    // Add hearts to animate
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      delay: i * 0.2,
      duration: Math.random() * 5 + 5,
      size: Math.random() * 20 + 20,
    }));
    
    setHearts([...hearts, ...newHearts]);
    
    // Redirect after animation
    setTimeout(() => {
      window.location.href = PAYMENT_LINK_URL;
    }, 1000);
  };

  const donationOptions = [
    { value: 10, label: "$10" },
    { value: 25, label: "$25" },
    { value: 50, label: "$50" },
    { value: 100, label: "$100" },
    { value: 'custom', label: "Custom" }
  ];

  const impactItems = [
    { 
      icon: <Coffee />, 
      title: "Podcast Production", 
      description: "Help fund equipment, editing, and production costs for new episodes." 
    },
    { 
      icon: <BookOpen />, 
      title: "Education Resources", 
      description: "Support the creation of inclusive educational materials and workshops." 
    },
    { 
      icon: <Users />, 
      title: "Community Events", 
      description: "Enable in-person and virtual gatherings for our supportive community." 
    }
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-[#F7F9FC] overflow-hidden">
      {/* Progress indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#FF9E1B] origin-left z-50"
        style={{ scaleX: smoothScrollProgress }}
      />
      
      {/* Floating hearts animation */}
      <AnimatePresence>
        {showHearts && hearts.map(heart => (
          <FloatingHeart 
            key={heart.id} 
            delay={heart.delay} 
            duration={heart.duration}
            size={heart.size}
          />
        ))}
      </AnimatePresence>
      
      {/* ENHANCED HERO SECTION */}
      <motion.section
        className="relative min-h-[70vh] flex items-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ opacity: heroOpacity }}
      >
        {/* Complex background with layered elements */}
        <div className="absolute inset-0 z-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A2240] to-[#01576E]" />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDJ2MmgtMnpNNDAgMzRoMnYyaC0yek00NCAzNGgydjJoLTJ6TTM0IDMwaDJ2MmgtMnpNMzQgMjZoMnYyaC0yek0zNCAyMmgydjJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10" />
          
          {/* Background image with overlay */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A2240]/90 to-[#0A2240]/70 z-10" />
            <img
              src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1950&q=80"
              alt="Donate Background"
              className="w-full h-full object-cover opacity-40"
            />
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-[#FF9E1B]/10 blur-3xl transform -translate-y-1/2" />
          <div className="absolute bottom-[30%] right-[5%] w-96 h-96 rounded-full bg-[#00B2A9]/10 blur-3xl" />
          
          {/* Animated small dots */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`dot-${i}`}
                className="absolute w-1 h-1 rounded-full bg-white/30"
                initial={{ 
                  x: Math.random() * 100 + "%", 
                  y: Math.random() * 100 + "%",
                  opacity: Math.random() * 0.5 + 0.3
                }}
                animate={{ 
                  y: ["-10%", "110%"],
                  opacity: [0, 1, 0.5, 0]
                }}
                transition={{ 
                  duration: Math.random() * 20 + 15, 
                  repeat: Infinity,
                  delay: Math.random() * 10
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white"
          >
            <motion.div 
              className="inline-block mb-6 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <span className="text-[#FF9E1B] font-medium text-sm flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                Make a Difference Today
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="relative inline-block">
                <span className="relative z-10">Support <span className="text-[#FF9E1B]">Ciara's</span> Work</span>
                <motion.div 
                  className="absolute -bottom-2 left-0 h-4 bg-[#FF9E1B]/20 w-full -z-0"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </div>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Your generous support empowers Ciara's mission to inspire and create positive change through advocacy, education, and community building.
            </motion.p>
            
            {/* Stats */}
            <motion.div 
              className="flex flex-wrap justify-center gap-8 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {[
                { count: "200+", label: "Monthly Donors" },
                { count: "10K+", label: "People Impacted" },
                { count: "100%", label: "Goes to Mission", icon: <Star className="w-4 h-4 text-[#FF9E1B]" /> }
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                    {stat.icon || <Heart className="w-6 h-6 text-[#FF9E1B]" />}
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-white">{stat.count}</div>
                    <div className="text-xs text-white/70">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 12, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-10 h-16 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div 
              className="w-2 h-2 bg-white rounded-full mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* ENHANCED DONATION FORM SECTION */}
      <motion.section 
        className="py-32 relative overflow-hidden"
        style={{ opacity: formOpacity, scale: formScale }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-white" />
        
        {/* Diagonal background sections */}
        <div className="absolute inset-0 -skew-y-3 bg-[#F7F9FC]/80 -translate-y-32 z-0" />
        
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-5 z-0" />
        
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#FF9E1B]/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 z-0" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#00B2A9]/5 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3 z-0" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Form Column */}
            <motion.div
              variants={fadeInRight}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl p-8 border border-gray-100"
            >
              <div className="text-center mb-8">
                <motion.div 
                  className="inline-block mb-4 px-4 py-1.5 bg-[#0A2240]/5 rounded-full"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <span className="text-[#0A2240] font-medium text-sm flex items-center">
                    <Gift className="w-4 h-4 mr-2 text-[#FF9E1B]" />
                    Donation Form
                  </span>
                </motion.div>
                
                <h2 className="text-3xl font-bold text-[#0A2240] mb-3">
                  Make a Donation
                </h2>
                <p className="text-[#0A2240]/70">
                  Choose an amount to support our mission
                </p>
              </div>
              
              {errorMsg && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-start gap-3">
                  <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <p>{errorMsg}</p>
                </div>
              )}
              
              {/* Donation frequency */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-[#0A2240]/70 mb-3">
                  Donation Frequency
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'one-time', label: 'One Time' },
                    { id: 'monthly', label: 'Monthly' }
                  ].map(option => (
                    <motion.button
                      key={option.id}
                      type="button"
                      onClick={() => setDonationFrequency(option.id)}
                      className={`px-4 py-3 rounded-xl border text-center transition-all ${
                        donationFrequency === option.id
                          ? 'bg-[#0A2240] text-white border-[#0A2240]'
                          : 'bg-white text-[#0A2240]/70 border-gray-200 hover:border-[#0A2240]/30'
                      }`}
                      whileHover={donationFrequency !== option.id ? { scale: 1.02 } : {}}
                      whileTap={donationFrequency !== option.id ? { scale: 0.98 } : {}}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Donation amount */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-[#0A2240]/70 mb-3">
                  Donation Amount
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {donationOptions.map(option => (
                    <motion.button
                      key={option.value}
                      type="button"
                      onClick={() => setDonationAmount(option.value)}
                      className={`px-3 py-3 rounded-xl border text-center transition-all ${
                        donationAmount === option.value
                          ? 'bg-[#FF9E1B] text-white border-[#FF9E1B]'
                          : 'bg-white text-[#0A2240]/70 border-gray-200 hover:border-[#FF9E1B]/50'
                      }`}
                      whileHover={donationAmount !== option.value ? { scale: 1.05 } : {}}
                      whileTap={donationAmount !== option.value ? { scale: 0.95 } : {}}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
                
                {donationAmount === 'custom' && (
                  <div className="mt-4">
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0A2240]/70">$</div>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        className="w-full px-8 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF9E1B]"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Payment button */}
              <div className="mb-6">
                <motion.div
                  className="group relative"
                  whileHover="hover"
                >
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-[#FF9E1B] blur-md opacity-0 group-hover:opacity-70 transition-all duration-300"
                    variants={{
                      hover: { scale: 1.05 }
                    }}
                  />
                  <motion.button
                    onClick={handleDonate}
                    disabled={isProcessing}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="relative w-full py-4 bg-[#0A2240] text-white rounded-xl font-bold text-lg
                              shadow-md hover:shadow-lg z-10 flex items-center justify-center gap-2"
                  >
                    <Heart className="w-5 h-5" />
                    <span>{isProcessing ? 'Processing...' : 'Donate Now'}</span>
                  </motion.button>
                </motion.div>
              </div>
              
              {/* Secure payment notice */}
              <div className="text-center text-[#0A2240]/60 text-sm flex items-center justify-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 11H5V21H19V11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 9V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Secure payment processed by Stripe</span>
              </div>
            </motion.div>
            
            {/* Impact Column */}
            <motion.div
              variants={fadeInLeft}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <motion.div 
                className="inline-block mb-4 px-4 py-1.5 bg-[#0A2240]/5 rounded-full"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <span className="text-[#0A2240] font-medium text-sm flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-[#FF9E1B]" />
                  Your Impact
                </span>
              </motion.div>
              
              <h2 className="text-3xl font-bold mb-6 text-[#0A2240] relative inline-block">
                How Your Donation Helps
                <motion.div 
                  className="absolute -bottom-2 left-0 w-full h-2 bg-[#FF9E1B] rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                />
              </h2>
              
              <p className="text-[#0A2240]/70 mb-8">
                Your contribution directly supports Ciara's work in advocacy, education, and community building. Here's how your donation makes a difference:
              </p>
              
              {/* Impact cards */}
              <div className="space-y-6">
                {impactItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + (index * 0.1) }}
                    className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#0A2240]/5 flex items-center justify-center flex-shrink-0">
                      <div className="text-[#FF9E1B]">{item.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0A2240] mb-1">{item.title}</h3>
                      <p className="text-[#0A2240]/70 text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Testimonial */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                className="mt-8 bg-[#0A2240]/5 rounded-2xl p-6"
              >
                <div className="flex items-start gap-3">
                  <svg className="w-10 h-10 text-[#FF9E1B] mt-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <div>
                    <p className="text-[#0A2240]/80 italic mb-4">
                      "Thanks to generous donations, we've been able to reach more people than ever before with our message of inclusivity and empowerment."
                    </p>
                    <div className="font-bold text-[#0A2240]">Ciara</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* WAYS TO SUPPORT SECTION */}
      <motion.section 
        className="py-32 relative overflow-hidden bg-[#F7F9FC]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-noise.png')] opacity-5" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-3">
              <motion.span 
                className="inline-block py-1.5 px-4 rounded-full text-sm font-medium bg-[#0A2240]/5 text-[#0A2240]"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <ThumbsUp className="w-4 h-4 inline mr-2 text-[#FF9E1B]" />
                More Ways to Help
              </motion.span>
            </div>
            
            <h2 className="text-4xl font-bold text-[#0A2240] mb-4 relative inline-block">
              Support Our Mission
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-2 bg-[#FF9E1B] rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
            </h2>
            <p className="text-xl text-[#0A2240]/70 max-w-3xl mx-auto mt-4">
              Beyond financial contributions, there are many ways to get involved and support our work.
            </p>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Users className="w-12 h-12 text-white" />,
                title: "Volunteer",
                description: "Contribute your time and skills to help with events, outreach, and community building.",
                cta: "Join Our Team",
                color: "#FF9E1B",
                gradient: "linear-gradient(135deg, #FF9E1B 0%, #FFBE5C 100%)",
              },
              {
                icon: <Share2 className="w-12 h-12 text-white" />,
                title: "Spread the Word",
                description: "Share our podcast, events, and resources with your network to expand our reach.",
                cta: "Share Now",
                color: "#00B2A9",
                gradient: "linear-gradient(135deg, #00B2A9 0%, #3FD5CC 100%)",
              },
              {
                icon: <BookOpen className="w-12 h-12 text-white" />,
                title: "Corporate Sponsorship",
                description: "Partner with us to support our mission while showcasing your company's commitment to inclusion.",
                cta: "Become a Sponsor",
                color: "#0A2240",
                gradient: "linear-gradient(135deg, #0A2240 0%, #1A3A5A 100%)",
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
              >
                {/* Header */}
                <div 
                  className="px-6 py-8 flex flex-col items-center text-center"
                  style={{ background: item.gradient }}
                >
                  <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                </div>
                
                {/* Content */}
                <div className="px-6 py-8">
                  <p className="text-[#0A2240]/70 mb-6 text-center">
                    {item.description}
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 rounded-full flex items-center justify-center gap-2 font-bold text-white"
                    style={{ background: item.gradient }}
                  >
                    <span>{item.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ ACCORDION SECTION */}
      <motion.section 
        className="py-32 relative overflow-hidden bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-5" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-3">
              <motion.span 
                className="inline-block py-1.5 px-4 rounded-full text-sm font-medium bg-[#0A2240]/5 text-[#0A2240]"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Info className="w-4 h-4 inline mr-2 text-[#FF9E1B]" />
                Common Questions
              </motion.span>
            </div>
            
            <h2 className="text-4xl font-bold text-[#0A2240] mb-4 relative inline-block">
              Frequently Asked Questions
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-2 bg-[#FF9E1B] rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
            </h2>
          </motion.div>
          
          <div className="space-y-6">
            {[
              {
                question: "Is my donation tax-deductible?",
                answer: "Yes, all donations are tax-deductible to the extent allowed by law. You will receive a receipt for your records after your donation is processed."
              },
              {
                question: "How is my donation used?",
                answer: "Your donation directly supports our mission through funding podcast production, educational resources, community events, and advocacy initiatives."
              },
              {
                question: "Can I make a recurring donation?",
                answer: "Yes, you can choose to make a one-time donation or a monthly recurring donation by selecting your preference on the donation form."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, debit cards, and digital payment methods through our secure payment processor, Stripe."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
              >
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer p-6">
                    <h3 className="text-lg font-semibold text-[#0A2240]">{item.question}</h3>
                    <motion.div
                      animate={{ rotate: 0 }}
                      variants={{
                        open: { rotate: 180 }
                      }}
                      className="text-[#0A2240]/70"
                    >
                      <ChevronDown className="w-5 h-5 transform transition-transform group-open:rotate-180" />
                    </motion.div>
                  </summary>
                  <div className="px-6 pb-6 text-[#0A2240]/70">
                    <p>{item.answer}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-10 text-center"
          >
            <p className="text-[#0A2240]/70 mb-6">
              Have more questions about donating or our work?
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-white text-[#0A2240] rounded-full font-medium
                          inline-flex items-center gap-2 shadow-md hover:shadow-lg border border-gray-200"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* THANK YOU BANNER */}
      <motion.section 
        className="py-16 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2240] to-[#00B2A9]">
          {/* Animated gradient overlay */}
          <motion.div 
            className="absolute inset-0"
            animate={{ 
              background: [
                "radial-gradient(circle at 20% 50%, rgba(255,158,27,0.4) 0%, rgba(10,34,64,0) 50%)",
                "radial-gradient(circle at 80% 50%, rgba(255,158,27,0.4) 0%, rgba(10,34,64,0) 50%)",
                "radial-gradient(circle at 20% 50%, rgba(255,158,27,0.4) 0%, rgba(10,34,64,0) 50%)"
              ],
              backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoMnYyaC0yek00MCAzNGgydjJoLTJ6TTQ0IDM0aDJ2MmgtMnpNMzQgMzBoMnYyaC0yek0zNCAyNmgydjJoLTJ6TTM0IDIyaDJ2MmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10" />
        </div>
        
        <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-6">
              <motion.div 
                className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center"
                animate={{ 
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(255,255,255,0.3)",
                    "0 0 0 10px rgba(255,255,255,0.1)",
                    "0 0 0 0 rgba(255,255,255,0.3)",
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Heart className="w-8 h-8 text-[#FF9E1B]" />
              </motion.div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Thank You for Your Support!
            </h2>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Your generosity makes our work possible and helps us create positive change in our community.
            </p>
            
            <motion.button
              onClick={handleDonate}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#FF9E1B] text-[#0A2240] rounded-full font-bold
                        inline-flex items-center gap-2 shadow-lg"
            >
              <Heart className="w-5 h-5" />
              <span>Donate Today</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Donate;