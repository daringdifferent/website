// About.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Heart, Mic2 } from 'lucide-react';
import { Link } from 'react-router-dom';

// Color palette (consistent with homepage)
const colors = {
  primary: '#F2245F',   // Pinkish-red
  secondary: '#FBB03B', // Vibrant orange
  accent: '#F52B62',    // Darker red-pink
  navy: '#01576E',      // Darker teal/navy
  white: '#FFFFFF',
};

// Motion variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.2 } },
};

const About: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* HERO SECTION */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-b from-white to-[#FBB03B]/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Image & Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#01576E]/90 to-[#FFFFFF]/70" />
          <img
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Ciara speaking"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              About Ciara
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Podcast Host • Author • Life Coach • Disability Rights Advocate
            </p>
          </motion.div>
        </div>
        {/* Decorative Wave Accent at Bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block w-full h-24"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
          >
            <path
              d="M321.39,56.4C203.44,74,85.82,95.81,0,109.79V120H1200V0C1100.76,24.36,957.56,62.08,777.48,49.2C608.88,37.29,482.84,15.69,321.39,56.4Z"
              fill={colors.secondary}
              fillOpacity="0.15"
            />
          </svg>
        </div>
      </motion.section>

      {/* BIOGRAPHY SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Column with Glass Morphism */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg space-y-6 text-[#01576E]"
            >
              <h2 className="text-4xl font-bold">About Ciara</h2>
              <p className="text-lg">
                Ciara is a certified Life Coach, Inclusion and Accessibility Advocate, Community Leader, Mentor, and Aspiring Author with a passion for empowering others. As the host of the podcast Daring Different, Ciara provides a platform for individuals living with disabilities to share their powerful stories of resilience, inspiring listeners worldwide.
              </p>
              <p className="text-lg">
                A former award-winning actress and media personality, Ciara has seamlessly transitioned her creative talents into advocacy and activism, driven by her own experiences living with invisible and often misunderstood disabilities. She is on a mission to bridge the gap between awareness and acceptance, challenging the stigma surrounding women with disabilities.
              </p>
              <p className="text-lg">
                In Ciara’s eyes, no one is “disabled”—everyone is “ably different.” Her work centers on breaking barriers, fostering inclusivity, and building meaningful connections within her community and beyond.
              </p>
              <p className="text-lg">
                Whether through coaching, storytelling, or advocacy, Ciara continues to inspire others to embrace their uniqueness, find strength in their challenges, and discover the power of resilience.
              </p>
            </motion.div>
            {/* Image Column with Tilt & Glass Effect */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-all duration-300">
                <img
                  src="https://drive.google.com/thumbnail?id=17pkkWrQR8b3TVnBCF-TmxoEoi_Frt8mv&sz=w1000"
                  alt="Ciara"
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#01576E]/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS SECTION */}
      <section className="relative py-24 bg-gradient-to-br from-white to-[#FBB03B]/10 overflow-hidden">
        {/* Decorative Wave Accent at the Top (rotated) */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
          <svg
            className="block w-full h-24"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
          >
            <path
              d="M321.39,56.4C203.44,74,85.82,95.81,0,109.79V120H1200V0C1100.76,24.36,957.56,62.08,777.48,49.2C608.88,37.29,482.84,15.69,321.39,56.4Z"
              fill={colors.secondary}
              fillOpacity="0.15"
            />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-[#01576E] mb-4">
              Impact & Achievements
            </h2>
            <p className="text-xl text-[#01576E] max-w-3xl mx-auto">
              Creating meaningful change through storytelling, advocacy, and community building.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              {...fadeInUp}
              className="p-8 rounded-2xl text-center bg-white/80 backdrop-blur-md shadow-lg"
            >
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <h3 className="text-2xl font-bold mb-4">Published Works</h3>
              <p className="text-[#01576E]">
                Author of multiple best-selling books sharing insights and experiences.
              </p>
            </motion.div>
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl text-center bg-white/80 backdrop-blur-md shadow-lg"
            >
              <Mic2 className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <h3 className="text-2xl font-bold mb-4">Podcast Impact</h3>
              <p className="text-[#01576E]">
                Reaching thousands of listeners worldwide with inspiring stories.
              </p>
            </motion.div>
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.4 }}
              className="p-8 rounded-2xl text-center bg-white/80 backdrop-blur-md shadow-lg"
            >
              <Heart className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <h3 className="text-2xl font-bold mb-4">Community Building</h3>
              <p className="text-[#01576E]">
                Creating spaces for connection, support, and empowerment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
