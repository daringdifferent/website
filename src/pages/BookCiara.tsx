import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  MessageCircle, 
  Send, 
  ArrowRight,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Mic,
  Sparkles,
  Coffee,
  BookOpen
} from 'lucide-react';
import { supabase } from '../lib/supabase';

// Hubtel-inspired color palette
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

const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

// Particle shapes for background animation
const ParticleShape = ({ className }) => {
  const y = motion.useMotionValue(0);
  const x = motion.useMotionValue(0);
  
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

const BookCiara: React.FC = () => {
  // Scroll animation values
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  
  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('Speaking Engagement');
  const [eventDateTime, setEventDateTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [audienceSize, setAudienceSize] = useState('');
  const [message, setMessage] = useState('');

  // Form step
  const [currentStep, setCurrentStep] = useState(1);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Field touched state (for validation)
  const [touchedFields, setTouchedFields] = useState({
    fullName: false,
    email: false,
    phone: false,
    eventDateTime: false,
    eventLocation: false,
    audienceSize: false,
    message: false
  });

  const markAsTouched = (field) => {
    setTouchedFields({ ...touchedFields, [field]: true });
  };

  // Helper functions for form validation
  const getFieldValidationClass = (field, value) => {
    if (!touchedFields[field]) return "";
    return value ? "border-green-400 focus:border-green-500" : "border-red-400 focus:border-red-500";
  };

  // Move to next step
  const handleNextStep = (e) => {
    e.preventDefault();
    
    // Validate fields in current step
    if (currentStep === 1) {
      setTouchedFields({
        ...touchedFields,
        fullName: true,
        email: true,
        phone: true
      });
      
      if (!fullName || !email || !phone) {
        return;
      }
    }
    
    setCurrentStep(currentStep + 1);
  };

  // Move to previous step
  const handlePrevStep = (e) => {
    e.preventDefault();
    setCurrentStep(currentStep - 1);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Mark all fields as touched for validation
    setTouchedFields({
      fullName: true,
      email: true,
      phone: true,
      eventDateTime: true,
      eventLocation: true,
      audienceSize: true,
      message: true
    });
    
    // Validate all fields
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
      return;
    }
    
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

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
      setTouchedFields({
        fullName: false,
        email: false,
        phone: false,
        eventDateTime: false,
        eventLocation: false,
        audienceSize: false,
        message: false
      });
      setCurrentStep(1);
      setSuccessMsg('Thank you! Your booking request was submitted successfully.');
    } catch (error) {
      console.error('Error creating booking:', error.message);
      setErrorMsg('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-[#F7F9FC] overflow-hidden">
      {/* Progress indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#FF9E1B] origin-left z-50"
        style={{ scaleX: smoothScrollProgress }}
      />
      
      {/* ENHANCED HERO SECTION */}
      <motion.section
        className="relative min-h-[60vh] flex items-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
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
              src="https://images.unsplash.com/photo-1508923567004-3a6b8004f3d1?auto=format&fit=crop&w=1950&q=80"
              alt="Book Ciara Background"
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
                <Calendar className="w-4 h-4 mr-2" />
                Schedule an Event
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="relative inline-block">
                <span className="relative z-10">Book <span className="text-[#FF9E1B]">Ciara</span></span>
                <motion.div 
                  className="absolute -bottom-2 left-0 h-4 bg-[#FF9E1B]/20 w-full -z-0"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </div>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Secure Ciara for your next speaking engagement or coaching session.
            </motion.p>
            
            {/* Service badges */}
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              {[
                { text: "Speaking Engagements", icon: <Mic className="w-4 h-4" /> },
                { text: "Coaching Sessions", icon: <Coffee className="w-4 h-4" /> },
                { text: "Workshops", icon: <Users className="w-4 h-4" /> },
                { text: "Book Signings", icon: <BookOpen className="w-4 h-4" /> }
              ].map((badge, idx) => (
                <motion.div 
                  key={idx} 
                  className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white flex items-center gap-2"
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: "rgba(255, 158, 27, 0.2)" 
                  }}
                >
                  {badge.icon}
                  <span>{badge.text}</span>
                </motion.div>
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

      {/* ENHANCED BOOKING FORM SECTION */}
      <motion.section
        className="py-24 relative overflow-hidden bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-noise.png')] opacity-5" />
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#FF9E1B]/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#00B2A9]/5 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />
        
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
                <Calendar className="w-4 h-4 inline mr-2 text-[#FF9E1B]" />
                Request a Booking
              </motion.span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A2240] mb-4 relative inline-block">
              Book Your Event
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-2 bg-[#FF9E1B] rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
            </h2>
            <p className="text-lg text-[#0A2240]/70 max-w-2xl mx-auto mt-4">
              Fill out the form below with your event details, and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative"
          >
            {/* Form progress indicator */}
            <div className="w-full px-6 pt-6">
              <div className="relative flex items-center justify-between">
                {/* Step indicators */}
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex flex-col items-center relative z-10">
                    <motion.div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                        currentStep === step 
                          ? 'bg-[#FF9E1B]' 
                          : currentStep > step 
                            ? 'bg-[#00B2A9]' 
                            : 'bg-[#E1E5EB]'
                      }`}
                      whileHover={currentStep > step ? { scale: 1.1 } : {}}
                      onClick={() => currentStep > step && setCurrentStep(step)}
                      style={{ cursor: currentStep > step ? 'pointer' : 'default' }}
                    >
                      {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
                    </motion.div>
                    <span className={`text-xs mt-2 font-medium ${
                      currentStep >= step ? 'text-[#0A2240]' : 'text-[#0A2240]/40'
                    }`}>
                      {step === 1 ? 'Contact' : step === 2 ? 'Event Details' : 'Message'}
                    </span>
                  </div>
                ))}
                
                {/* Progress line */}
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-[#E1E5EB] -z-0">
                  <motion.div 
                    className="h-full bg-[#00B2A9]"
                    initial={{ width: '0%' }}
                    animate={{ 
                      width: currentStep === 1 
                        ? '0%' 
                        : currentStep === 2 
                          ? '50%' 
                          : '100%' 
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>

            {/* Success message */}
            <AnimatePresence>
              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mx-6 mt-6"
                >
                  <div className="bg-[#00B2A9]/10 border border-[#00B2A9]/20 rounded-xl p-4 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#00B2A9] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-[#00B2A9]">Request Submitted Successfully</h3>
                      <p className="text-[#0A2240]/70 text-sm">{successMsg}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error message */}
            <AnimatePresence>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mx-6 mt-6"
                >
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-red-700">Error</h3>
                      <p className="text-red-600 text-sm">{errorMsg}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form content */}
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block mb-2 text-sm font-medium text-[#0A2240]">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User className="w-5 h-5 text-[#0A2240]/30" />
                            </div>
                            <input
                              type="text"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              onBlur={() => markAsTouched('fullName')}
                              className={`w-full pl-10 pr-4 py-3 bg-[#F7F9FC] border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A2240]/20 transition-all ${
                                getFieldValidationClass('fullName', fullName)
                              }`}
                              placeholder="Your Name"
                              required
                            />
                            {touchedFields.fullName && !fullName && (
                              <div className="text-red-500 text-xs mt-1">Full name is required</div>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block mb-2 text-sm font-medium text-[#0A2240]">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="w-5 h-5 text-[#0A2240]/30" />
                            </div>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              onBlur={() => markAsTouched('email')}
                              className={`w-full pl-10 pr-4 py-3 bg-[#F7F9FC] border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A2240]/20 transition-all ${
                                getFieldValidationClass('email', email)
                              }`}
                              placeholder="yourname@example.com"
                              required
                            />
                            {touchedFields.email && !email && (
                              <div className="text-red-500 text-xs mt-1">Email is required</div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block mb-2 text-sm font-medium text-[#0A2240]">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="w-5 h-5 text-[#0A2240]/30" />
                          </div>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            onBlur={() => markAsTouched('phone')}
                            className={`w-full pl-10 pr-4 py-3 bg-[#F7F9FC] border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A2240]/20 transition-all ${
                              getFieldValidationClass('phone', phone)
                            }`}
                            placeholder="(555) 123-4567"
                            required
                          />
                          {touchedFields.phone && !phone && (
                            <div className="text-red-500 text-xs mt-1">Phone number is required</div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block mb-2 text-sm font-medium text-[#0A2240]">
                          Service Type
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mic className="w-5 h-5 text-[#0A2240]/30" />
                          </div>
                          <select
                            value={serviceType}
                            onChange={(e) => setServiceType(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-[#F7F9FC] border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A2240]/20 transition-all appearance-none"
                          >
                            <option value="Speaking Engagement">Speaking Engagement</option>
                            <option value="Coaching">Coaching</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Book Signing">Book Signing</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <ChevronDown className="w-5 h-5 text-[#0A2240]/40" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end pt-4">
                        <motion.button
                          type="button"
                          onClick={handleNextStep}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-6 py-3 bg-[#0A2240] text-white rounded-xl
                                    flex items-center gap-2 shadow-md hover:shadow-lg
                                    transform transition-all"
                        >
                          <span>Continue</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Step 2: Event Details */}
                <AnimatePresence mode="wait">
                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block mb-2 text-sm font-medium text-[#0A2240]">
                            Event Date & Time <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Calendar className="w-5 h-5 text-[#0A2240]/30" />
                            </div>
                            <input
                              type="datetime-local"
                              value={eventDateTime}
                              onChange={(e) => setEventDateTime(e.target.value)}
                              onBlur={() => markAsTouched('eventDateTime')}
                              className={`w-full pl-10 pr-4 py-3 bg-[#F7F9FC] border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A2240]/20 transition-all ${
                                getFieldValidationClass('eventDateTime', eventDateTime)
                              }`}
                              required
                            />
                            {touchedFields.eventDateTime && !eventDateTime && (
                              <div className="text-red-500 text-xs mt-1">Event date and time are required</div>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block mb-2 text-sm font-medium text-[#0A2240]">
                            Event Location <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <MapPin className="w-5 h-5 text-[#0A2240]/30" />
                            </div>
                            <input
                              type="text"
                              value={eventLocation}
                              onChange={(e) => setEventLocation(e.target.value)}
                              onBlur={() => markAsTouched('eventLocation')}
                              className={`w-full pl-10 pr-4 py-3 bg-[#F7F9FC] border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A2240]/20 transition-all ${
                                getFieldValidationClass('eventLocation', eventLocation)
                              }`}
                              placeholder="City, Venue, or Address"
                              required
                            />
                            {touchedFields.eventLocation && !eventLocation && (
                              <div className="text-red-500 text-xs mt-1">Event location is required</div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block mb-2 text-sm font-medium text-[#0A2240]">
                          Audience Size <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Users className="w-5 h-5 text-[#0A2240]/30" />
                          </div>
                          <input
                            type="number"
                            value={audienceSize}
                            onChange={(e) => setAudienceSize(e.target.value)}
                            onBlur={() => markAsTouched('audienceSize')}
                            className={`w-full pl-10 pr-4 py-3 bg-[#F7F9FC] border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A2240]/20 transition-all ${
                              getFieldValidationClass('audienceSize', audienceSize)
                            }`}
                            placeholder="Estimated number of attendees"
                            required
                          />
                          {touchedFields.audienceSize && !audienceSize && (
                            <div className="text-red-500 text-xs mt-1">Audience size is required</div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-between pt-4">
                        <motion.button
                          type="button"
                          onClick={handlePrevStep}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-6 py-3 border border-[#0A2240]/20 text-[#0A2240] rounded-xl
                                    flex items-center gap-2 hover:bg-[#0A2240]/5
                                    transform transition-all"
                        >
                          <ArrowRight className="w-4 h-4 transform rotate-180" />
                          <span>Back</span>
                        </motion.button>
                        
                        <motion.button
                          type="button"
                          onClick={handleNextStep}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-6 py-3 bg-[#0A2240] text-white rounded-xl
                                    flex items-center gap-2 shadow-md hover:shadow-lg
                                    transform transition-all"
                        >
                          <span>Continue</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Step 3: Additional Details */}
                <AnimatePresence mode="wait">
                  {currentStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block mb-2 text-sm font-medium text-[#0A2240]">
                          Additional Details <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                            <MessageCircle className="w-5 h-5 text-[#0A2240]/30" />
                          </div>
                          <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onBlur={() => markAsTouched('message')}
                            rows={8}
                            className={`w-full pl-10 pr-4 py-3 bg-[#F7F9FC] border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A2240]/20 transition-all ${
                              getFieldValidationClass('message', message)
                            }`}
                            placeholder="Tell us about your event or what you'd like to discuss..."
                            required
                          />
                          {touchedFields.message && !message && (
                            <div className="text-red-500 text-xs mt-1">Additional details are required</div>
                          )}
                        </div>
                        <div className="text-[#0A2240]/40 text-xs mt-2">
                          Please include any specific topics, themes, or requirements for your event.
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap justify-between pt-4 gap-4">
                        <motion.button
                          type="button"
                          onClick={handlePrevStep}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-6 py-3 border border-[#0A2240]/20 text-[#0A2240] rounded-xl
                                    flex items-center gap-2 hover:bg-[#0A2240]/5
                                    transform transition-all"
                        >
                          <ArrowRight className="w-4 h-4 transform rotate-180" />
                          <span>Back</span>
                        </motion.button>
                        
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
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative px-8 py-3 bg-[#FF9E1B] text-[#0A2240] rounded-xl
                                      font-medium flex items-center gap-2 shadow-lg
                                      transform transition-all z-10"
                          >
                            {isSubmitting ? (
                              <>
                                <motion.div
                                  className="w-5 h-5 border-2 border-[#0A2240] border-t-transparent rounded-full"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                                <span>Submitting...</span>
                              </>
                            ) : (
                              <>
                                <Send className="w-5 h-5" />
                                <span>Submit Booking</span>
                              </>
                            )}
                          </motion.button>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
          
          {/* Additional Information */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 p-6 bg-[#0A2240]/5 rounded-2xl"
          >
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-[#FF9E1B] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-[#0A2240] text-lg mb-2">Booking Information</h3>
                <p className="text-[#0A2240]/70 mb-4">
                  Please note that all bookings are subject to availability. We will contact you within 
                  2-3 business days to confirm your request and discuss the details.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#FF9E1B]" />
                    <span>Please book at least 4 weeks in advance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#FF9E1B]" />
                    <span>Both virtual and in-person events available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#FF9E1B]" />
                    <span>Events for 20-1000+ attendees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#FF9E1B]" />
                    <span>Sessions from 1 hour to full day</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default BookCiara;