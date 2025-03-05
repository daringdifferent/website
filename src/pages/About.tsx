// About.tsx
import React, { useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  BookOpen, 
  Heart, 
  Mic2, 
  Users, 
  Sparkles, 
  ArrowRight, 
  Star, 
  Headphones,
  Coffee,
  Calendar,
  Lightbulb,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

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

const About = () => {
  // Scroll animation values
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  
  // Scroll triggered animations
  const heroOpacity = useTransform(smoothScrollProgress, [0, 0.2], [1, 0]);
  const bioScale = useTransform(smoothScrollProgress, [0.1, 0.3], [0.95, 1]);
  const bioOpacity = useTransform(smoothScrollProgress, [0.1, 0.3], [0, 1]);

  return (
    <div className="relative min-h-screen flex flex-col bg-[#F7F9FC] overflow-hidden">
      {/* Progress indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#FF9E1B] origin-left z-50"
        style={{ scaleX: smoothScrollProgress }}
      />
      
      {/* ENHANCED HERO SECTION */}
      <motion.section
        className="relative min-h-[80vh] flex items-center overflow-hidden"
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
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt="Ciara speaking"
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
                <Sparkles className="w-4 h-4 mr-2" />
                Empowering Voices & Breaking Barriers
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="relative inline-block">
                <span className="relative z-10">About <span className="text-[#FF9E1B]">Ciara</span></span>
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
              Podcast Host • Author • Life Coach • Disability Rights Advocate
            </motion.p>
            
            {/* Dynamic badges */}
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              {[
                { icon: <Users className="w-4 h-4" />, text: "Community Leader" },
                { icon: <Mic2 className="w-4 h-4" />, text: "Podcast Creator" },
                { icon: <BookOpen className="w-4 h-4" />, text: "Author" },
                { icon: <Heart className="w-4 h-4" />, text: "Advocate" }
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

      {/* ENHANCED BIOGRAPHY SECTION */}
      <motion.section 
        className="py-32 relative overflow-hidden"
       
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Column with enhanced design */}
            <motion.div
              variants={fadeInRight}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <motion.div 
                className="inline-block mb-6 px-4 py-1.5 bg-[#0A2240]/5 rounded-full"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <span className="text-[#0A2240] font-medium text-sm flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-[#FF9E1B]" />
                  The Journey
                </span>
              </motion.div>
              
              <h2 className="text-4xl font-bold mb-8 text-[#0A2240] relative inline-block">
                About Ciara
                <motion.div 
                  className="absolute -bottom-2 left-0 w-full h-2 bg-[#FF9E1B] rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                />
              </h2>
              
              <div className="space-y-6 text-[#0A2240]/80">
                <p className="text-lg">
                  Ciara is a certified Life Coach, Inclusion and Accessibility Advocate, Community Leader, Mentor, and Aspiring Author with a passion for empowering others. As the host of the podcast Daring Different, Ciara provides a platform for individuals living with disabilities to share their powerful stories of resilience, inspiring listeners worldwide.
                </p>
                
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF9E1B] to-[#00B2A9]"></div>
                  <p className="text-lg pl-6 italic text-[#0A2240]/90">
                    A former award-winning actress and media personality, Ciara has seamlessly transitioned her creative talents into advocacy and activism, driven by her own experiences living with invisible and often misunderstood disabilities.
                  </p>
                </div>
                
                <p className="text-lg">
                  In Ciara's eyes, no one is "disabled"—everyone is "ably different." Her work centers on breaking barriers, fostering inclusivity, and building meaningful connections within her community and beyond.
                </p>
                
                <p className="text-lg">
                  Whether through coaching, storytelling, or advocacy, Ciara continues to inspire others to embrace their uniqueness, find strength in their challenges, and discover the power of resilience.
                </p>
              </div>
              
              {/* Facts and figures */}
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6">
                {[
                  { number: "5+", label: "Years of Experience" },
                  { number: "50+", label: "Podcast Episodes" },
                  { number: "10K+", label: "Lives Impacted" }
                ].map((stat, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + (idx * 0.1) }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-[#FF9E1B]">{stat.number}</div>
                    <div className="text-sm text-[#0A2240]/70">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Image Column with enhanced 3D effect */}
            <motion.div
              variants={fadeInLeft}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative perspective-[1000px]"
            >
              {/* Floating abstract shapes */}
              <motion.div 
                className="absolute -left-10 -top-10 w-32 h-32 rounded-full bg-[#FF9E1B]/20 blur-md z-10"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <motion.div 
                className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-[#00B2A9]/20 blur-md z-10"
                animate={{ 
                  y: [0, 15, 0],
                  rotate: [0, -10, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Main image container */}
              <motion.div
                className="relative rounded-3xl overflow-hidden transform hover:rotate-y-3 transition-all duration-700"
                whileHover={{ scale: 1.03 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2240]/50 via-transparent to-transparent z-10" />
                  
                  <img
                    src="https://drive.google.com/thumbnail?id=17pkkWrQR8b3TVnBCF-TmxoEoi_Frt8mv&sz=w1000"
                    alt="Ciara"
                    className="w-full h-full object-cover rounded-3xl transform scale-105 hover:scale-100 transition-transform duration-700"
                  />
                  
                  {/* Quote overlay */}
                  <div className="absolute left-0 right-0 bottom-0 p-6 z-20">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                      <svg className="w-8 h-8 text-[#FF9E1B]/80 mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-white/90 italic text-sm md:text-base">
                        "I believe in the power of storytelling to change perceptions and build bridges of understanding."
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <motion.div
                  className="absolute -z-10 -inset-4 bg-gradient-to-br from-[#FF9E1B]/20 to-[#00B2A9]/20 rounded-[32px] blur-md"
                  animate={{ 
                    opacity: [0.4, 0.7, 0.4],
                    rotate: [0, 2, 0, -2, 0],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
              
              {/* Featured badge */}
              <motion.div
                className="absolute -right-5 top-10 bg-white rounded-xl py-2 px-3 shadow-xl border border-[#E1E5EB] z-20 flex items-center gap-2"
                initial={{ opacity: 0, x: 20, rotate: 5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 5 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <Award className="w-5 h-5 text-[#FF9E1B]" />
                <span className="text-sm font-medium text-[#0A2240]">Award Winning</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ENHANCED ACHIEVEMENTS SECTION */}
      <motion.section 
        className="py-32 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Background with gradient and noise texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A2240] to-[#081d36]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-40" />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#FF9E1B]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#00B2A9]/5 rounded-full blur-3xl" />
        
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
                className="inline-block py-1.5 px-4 rounded-full text-sm font-medium bg-white/10 text-white"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Award className="w-4 h-4 inline mr-2 text-[#FF9E1B]" />
                Highlights
              </motion.span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 relative inline-block">
              Impact & Achievements
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-2 bg-[#FF9E1B] rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mt-4">
              Creating meaningful change through storytelling, advocacy, and community building.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <BookOpen className="w-12 h-12 text-white" />,
                title: "Published Works",
                description: "Author of multiple best-selling books sharing insights and experiences on disability awareness and inclusive practices.",
                color: "#FF9E1B",
                gradient: "linear-gradient(135deg, #FF9E1B 0%, #FFBE5C 100%)",
                features: ["3 Published Books", "International Distribution", "100,000+ Copies Sold"]
              },
              {
                icon: <Mic2 className="w-12 h-12 text-white" />,
                title: "Podcast Impact",
                description: "Reaching thousands of listeners worldwide with inspiring stories of resilience, courage, and transformative experiences.",
                color: "#00B2A9",
                gradient: "linear-gradient(135deg, #00B2A9 0%, #3FD5CC 100%)",
                features: ["50+ Episodes", "10,000+ Monthly Listeners", "Global Audience"]
              },
              {
                icon: <Heart className="w-12 h-12 text-white" />,
                title: "Community Building",
                description: "Creating spaces for connection, support, and empowerment for people with disabilities and their allies.",
                color: "#F15A5A",
                gradient: "linear-gradient(135deg, #F15A5A 0%, #F48B8B 100%)",
                features: ["Online Community", "In-Person Events", "Mentorship Program"]
              }
            ].map((achievement, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ translateY: -15 }}
                className="relative group perspective-[1000px]"
              >
                <div 
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"
                  style={{ background: achievement.gradient }}
                />
                
                <motion.div
                  className="relative h-full bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg group-hover:shadow-2xl
                            transition-all duration-500 transform group-hover:rotateX-3 border border-white/20"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Top colored section with icon */}
                  <div 
                    className="relative aspect-[3/1] flex flex-col items-center justify-center px-8 py-10 text-center"
                    style={{ background: achievement.gradient }}
                  >
                    {/* Layered background patterns for depth */}
                    <div className="absolute inset-0 overflow-hidden">
                      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 opacity-10">
                        <path d="M0,0 L100,0 L100,100 Z" fill="#FFFFFF" />
                      </svg>
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoMnYyaC0yek00MCAzNGgydjJoLTJ6TTQ0IDM0aDJ2MmgtMnpNMzQgMzBoMnYyaC0yek0zNCAyNmgydjJoLTJ6TTM0IDIyaDJ2MmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
                    </div>
                    
                    {/* Icon container with pulsing background */}
                    <div className="relative z-10">
                      <motion.div 
                        className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4"
                        animate={{ 
                          boxShadow: [
                            "0 0 0 0 rgba(255,255,255,0)",
                            "0 0 0 10px rgba(255,255,255,0.1)",
                            "0 0 0 20px rgba(255,255,255,0)",
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                      >
                        {achievement.icon}
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold text-white relative z-10">{achievement.title}</h3>
                    </div>
                  </div>
                  
                  {/* Content section */}
                  <div className="px-8 py-8 flex flex-col h-full">
                    <p className="text-white/80 mb-6">{achievement.description}</p>
                    
                    {/* Feature list */}
                    <div className="space-y-3 mb-6">
                      {achievement.features.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div 
                            className="w-4 h-4 rounded-full flex-shrink-0"
                            style={{ backgroundColor: achievement.color }}
                          />
                          <span className="text-sm text-white/90">{item}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-auto">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 rounded-full flex items-center justify-center gap-2 font-semibold text-[#0A2240] transition-all"
                        style={{ background: achievement.gradient }}
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* NEW: TIMELINE SECTION */}
      <motion.section 
        className="py-32 relative overflow-hidden bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-noise.png')] opacity-5" />
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#FF9E1B]/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#00B2A9]/5 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />
        
        <div className="max-w-5xl mx-auto px-4 relative z-10">
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
                Journey
              </motion.span>
            </div>
            
            <h2 className="text-4xl font-bold text-[#0A2240] mb-4 relative inline-block">
              Professional Timeline
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-2 bg-[#FF9E1B] rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
            </h2>
            <p className="text-xl text-[#0A2240]/70 max-w-3xl mx-auto mt-4">
              Explore Ciara's journey of impact and advocacy over the years.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF9E1B] via-[#00B2A9] to-[#0A2240]"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            
            {/* Timeline items */}
            {[
              {
                year: "2017",
                title: "Career Beginnings",
                description: "Started advocacy work after personal experiences highlighted the need for greater disability awareness.",
                icon: <Lightbulb className="w-6 h-6 text-[#FF9E1B]" />,
                side: "left"
              },
              {
                year: "2019",
                title: "Podcast Launch",
                description: "Created 'Daring Different' to amplify voices of people with disabilities and share their stories.",
                icon: <Mic2 className="w-6 h-6 text-[#00B2A9]" />,
                side: "right"
              },
              {
                year: "2020",
                title: "First Book Published",
                description: "Released debut book exploring themes of identity, resilience, and disability rights.",
                icon: <BookOpen className="w-6 h-6 text-[#FF9E1B]" />,
                side: "left"
              },
              {
                year: "2022",
                title: "Community Foundation",
                description: "Established support network connecting people with disabilities to resources and each other.",
                icon: <Users className="w-6 h-6 text-[#00B2A9]" />,
                side: "right"
              },
              {
                year: "2024",
                title: "Global Recognition",
                description: "Received international acclaim for advocacy work and continued podcast success.",
                icon: <Award className="w-6 h-6 text-[#FF9E1B]" />,
                side: "left"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className={`relative mb-16 flex ${item.side === 'left' ? 'justify-end md:justify-start' : 'justify-end'} md:w-1/2 ${item.side === 'right' ? 'md:ml-auto' : ''}`}
                initial={{ opacity: 0, x: item.side === 'left' ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 * index, duration: 0.7 }}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 * index, duration: 0.5, type: "spring" }}
                  >
                    {item.icon}
                  </motion.div>
                </div>
                
                {/* Content card */}
                <div className={`relative w-full md:w-90 max-w-sm ${item.side === 'right' ? 'ml-12 md:ml-16' : 'mr-12 md:mr-16'}`}>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="text-sm font-bold text-[#FF9E1B] mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold text-[#0A2240] mb-2">{item.title}</h3>
                    <p className="text-[#0A2240]/70">{item.description}</p>
                  </div>
                  
                  {/* Connecting line */}
                  <div 
                    className={`absolute top-1/2 transform -translate-y-1/2 ${
                      item.side === 'left' ? 'right-0 translate-x-[6px] md:translate-x-full' : 'left-0 -translate-x-[6px] md:-translate-x-full'
                    } h-[2px] bg-gradient-to-${item.side === 'left' ? 'r' : 'l'} from-white to-gray-300 w-12`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* NEW: CALL TO ACTION SECTION */}
      <motion.section 
        className="py-20 relative overflow-hidden"
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

          {/* Decorative shapes */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1440 400" className="absolute inset-0 opacity-20">
              <motion.path 
                d="M0,128L48,144C96,160,192,192,288,202.7C384,213,480,203,576,181.3C672,160,768,128,864,128C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                fill="#FFFFFF"
                fillOpacity="0.1"
                animate={{ d: [
                  "M0,128L48,144C96,160,192,192,288,202.7C384,213,480,203,576,181.3C672,160,768,128,864,128C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,96L48,122.7C96,149,192,203,288,213.3C384,224,480,192,576,176C672,160,768,160,864,186.7C960,213,1056,267,1152,266.7C1248,267,1344,213,1392,186.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ] }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoMnYyaC0yek00MCAzNGgydjJoLTJ6TTQ0IDM0aDJ2MmgtMnpNMzQgMzBoMnYyaC0yek0zNCAyNmgydjJoLTJ6TTM0IDIyaDJ2MmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Content */}
            <motion.div 
              className="md:col-span-8 text-center md:text-left"
              variants={fadeInRight}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Join Ciara's Journey?
              </h2>
              <p className="text-xl text-white/80">
                Discover powerful stories, engage with the community, and be part of the movement for greater inclusion and understanding.
              </p>
            </motion.div>
            
            {/* Buttons */}
            <motion.div 
              className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-4 justify-center md:justify-end"
              variants={fadeInLeft}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <Link to="/podcast">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-[#FF9E1B] text-[#0A2240] rounded-full font-bold
                            flex items-center justify-center gap-2 shadow-lg"
                >
                  <Headphones className="w-5 h-5" />
                  <span>Listen to Podcast</span>
                </motion.button>
              </Link>
              
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-bold
                            flex items-center justify-center gap-2 border border-white/20
                            hover:bg-white/20 transition-colors"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;