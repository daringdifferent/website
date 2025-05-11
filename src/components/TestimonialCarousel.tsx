import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialCarousel = () => {
  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Community Member",
      quote: "Listening to Ciara's podcast has transformed my perspective on disability awareness. Her authenticity and warmth shine through every episode, making complex topics accessible and inspiring.",
      image: "https://images.unsplash.com/photo-1570158268183-d296b2892211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "#00A7B5"
    },
    {
      id: 2,
      name: "Emily Roberts",
      role: "Educator",
      quote: "Ciara's courage to speak up for disability awareness is truly inspiring. Her podcast provides valuable insights that I've implemented in my classroom to create a more inclusive environment.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "#FF9E18"
    },
    {
      id: 3,
      name: "Michael Green",
      role: "Healthcare Professional",
      quote: "The podcast is a must-listen for anyone interested in real stories and genuine empowerment. Ciara's approach to discussing disability challenges has helped me become a better practitioner.",
      image: "https://images.unsplash.com/photo-1590080876115-9c8fc3b0ca65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "#F15B41"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayTimerRef = useRef(null);

  // Card variants for animations
  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      rotateY: direction > 0 ? -15 : 15,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      rotateY: direction < 0 ? -15 : 15,
      scale: 0.8,
      transition: {
        duration: 0.5
      }
    })
  };

  // Navigation functions
  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    resetAutoPlay();
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    resetAutoPlay();
  };

  // Auto-play functionality
  const startAutoPlay = () => {
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    autoPlayTimerRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);
  };

  const resetAutoPlay = () => {
    if (isAutoPlaying) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      startAutoPlay();
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Set up auto-play on component mount
  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    }
    
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlaying]);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A2240] to-[#00A7B5]/80 z-0" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5 z-0"
           style={{
             backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E\")"
           }} />

      {/* Light beam effects */}
      <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-b from-[#FF9E18]/20 to-transparent blur-3xl opacity-30 z-0" />
      <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-gradient-to-t from-[#00A7B5]/20 to-transparent blur-3xl opacity-30 z-0" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-[#00A7B5] to-[#FF9E18] 
                     mx-auto mb-6"
          />
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            What People Are Saying
          </motion.h2>
          
          <motion.p
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Hear from our community who've been inspired by Ciara's journey
          </motion.p>
        </motion.div>

        {/* Testimonial carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main carousel */}
          <div className="relative h-[500px] overflow-visible flex items-center justify-center perspective-1000">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={testimonials[currentIndex].id}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full max-w-2xl"
                style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
              >
                <div className="relative rounded-3xl overflow-hidden 
                             bg-gradient-to-br from-white/10 to-white/5 
                             backdrop-blur-md border border-white/20
                             shadow-2xl group h-full p-8 md:p-12
                             transition-all duration-500 ease-out hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
                >
                  {/* Quote icon */}
                  <div className="absolute top-6 right-6 text-white/20">
                    <Quote className="w-12 h-12" />
                  </div>

                  {/* Color accent */}
                  <div 
                    className="absolute top-0 left-0 w-2 h-full" 
                    style={{ background: testimonials[currentIndex].color }} 
                  />

                  {/* Content */}
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    {/* Image with border and effects */}
                    <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00A7B5] to-[#F15B41] blur-sm opacity-70 group-hover:opacity-100 transition-opacity" />
                      <img 
                        src={testimonials[currentIndex].image} 
                        alt={testimonials[currentIndex].name}
                        className="relative w-full h-full object-cover rounded-full border-2 border-white/30" 
                      />
                    </div>
                    
                    {/* Quote and details */}
                    <div className="flex-1">
                      <p className="text-xl md:text-2xl text-white mb-6 italic leading-relaxed">
                        "{testimonials[currentIndex].quote}"
                      </p>
                      
                      <div>
                        <h4 className="text-xl font-bold text-white">
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-white/70">
                          {testimonials[currentIndex].role}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 
                               bg-gradient-to-tr from-[#00A7B5]/30 to-transparent 
                               rounded-full blur-2xl opacity-40 z-0" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center mt-8">
            <div className="flex gap-3">
              <motion.button
                onClick={prevTestimonial}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full flex items-center justify-center
                         bg-white/10 backdrop-blur-md border border-white/20
                         text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              
              <motion.button
                onClick={nextTestimonial}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full flex items-center justify-center
                         bg-white/10 backdrop-blur-md border border-white/20
                         text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
            
            {/* Pagination */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                    resetAutoPlay();
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-white scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Auto-play toggle */}
            <motion.button
              onClick={toggleAutoPlay}
              className={`px-4 py-1 rounded-full text-sm
                         transition-colors duration-300
                         ${isAutoPlaying 
                            ? 'bg-white/20 text-white' 
                            : 'bg-white/10 text-white/70'}`}
            >
              {isAutoPlaying ? 'Auto-playing' : 'Paused'}
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;