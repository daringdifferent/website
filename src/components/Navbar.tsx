import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight, User, Lock } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';

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
  white: '#FFFFFF',
  light: '#F7F9FC',
};

// Updated arrays of links
const leftLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Podcast', path: '/podcast' },
  { name: 'Books', path: '/books' },
];

const rightLinks = [
  { name: 'Gallery', path: '/gallery' },
  { name: 'Book Ciara', path: '/book-ciara' },
  { name: 'Donate', path: '/donate' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Scroll progress indicator
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  
  // Navbar background opacity based on scroll
  const navBgOpacity = useTransform(smoothScrollProgress, [0, 0.05], [0.8, 1]);
  const navShadow = useTransform(
    smoothScrollProgress,
    [0, 0.05],
    ['0 4px 20px rgba(0,0,0,0.05)', '0 4px 30px rgba(0,0,0,0.15)']
  );

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="relative z-50">
      {/* Progress indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#FF9E1B] origin-left z-60"
        style={{ scaleX: smoothScrollProgress }}
      />
      
      {/* NAVBAR CONTAINER */}
      <motion.div
        className="fixed top-0 w-full backdrop-blur-md"
        style={{ 
          backgroundColor: scrolled ? `rgba(10, 34, 64, ${navBgOpacity})` : 'rgba(10, 34, 64, 0.8)',
          boxShadow: navShadow
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* DESKTOP LAYOUT */}
          <div className="hidden md:flex items-center justify-center h-20 relative">
            {/* LEFT LINKS */}
            <div className="flex items-center space-x-8">
              {leftLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative group ${
                    location.pathname === link.path 
                      ? 'text-[#FF9E1B]' 
                      : 'text-white hover:text-white/80'
                  } transition-colors duration-200 font-medium`}
                >
                  <span className="relative z-10">{link.name}</span>
                  
                  {/* Active indicator */}
                  {location.pathname === link.path && (
                    <motion.div 
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FF9E1B] rounded-full"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  
                  {/* Hover indicator (only show if not active) */}
                  {location.pathname !== link.path && (
                    <motion.div 
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/40 rounded-full group-hover:w-full"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* CENTER LOGO */}
            <Link to="/" onClick={() => setIsOpen(false)}>
              <motion.div 
                className="flex items-center justify-center bg-white rounded-full p-2 mx-16 shadow-lg"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(255, 158, 27, 0.5)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img
                  src="https://drive.google.com/thumbnail?id=1F5-60YjmLJzaJEMJYcl-A6BiQ4bU-oWh&sz=w1000"
                  alt="Daring Different Logo"
                  className="h-12 w-12 object-contain"
                />
              </motion.div>
            </Link>

            {/* RIGHT LINKS with a big margin-right */}
            <div className="flex items-center space-x-16 mr-[120px]">
              {rightLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative group ${
                    location.pathname === link.path 
                      ? 'text-[#FF9E1B]' 
                      : 'text-white hover:text-white/80'
                  } transition-colors duration-200 font-medium`}
                >
                  <span className="relative z-10">{link.name}</span>
                  
                  {/* Active indicator */}
                  {location.pathname === link.path && (
                    <motion.div 
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FF9E1B] rounded-full"
                      layoutId="activeIndicatorRight"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  
                  {/* Hover indicator (only show if not active) */}
                  {location.pathname !== link.path && (
                    <motion.div 
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/40 rounded-full group-hover:w-full"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* AUTH BUTTONS pinned to the extreme right */}
            <div className="absolute right-0 flex items-center space-x-3">
              <Link to="/signin">
              
              </Link>
              <Link to="/subscribe">
                <motion.div
                  className="group relative"
                  whileHover="hover"
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#FF9E1B] blur-md opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                    variants={{
                      hover: { scale: 1.1 }
                    }}
                  />
                
                </motion.div>
              </Link>
            </div>
          </div>

          {/* MOBILE LAYOUT (NAVBAR TOP) */}
          <div className="flex items-center justify-between h-16 md:hidden">
            {/* MINI LOGO LEFT */}
            <Link to="/" onClick={() => setIsOpen(false)}>
              <motion.div 
                className="flex items-center justify-center bg-white rounded-full p-1 shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src="https://drive.google.com/thumbnail?id=1F5-60YjmLJzaJEMJYcl-A6BiQ4bU-oWh&sz=w1000"
                  alt="Daring Different Logo"
                  className="h-10 w-10 object-contain"
                />
              </motion.div>
            </Link>

            {/* Mobile page title for better orientation */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 text-white font-medium"
              animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : 10 }}
              transition={{ duration: 0.3 }}
            >
              {leftLinks.find(link => link.path === location.pathname)?.name || 
               rightLinks.find(link => link.path === location.pathname)?.name || 
               'Daring Different'}
            </motion.div>

            {/* HAMBURGER MENU RIGHT */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#FF9E1B] transition-colors duration-200 p-2 rounded-full bg-white/10 backdrop-blur-sm"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>

        {/* Subtle dot pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
      </motion.div>

      {/* MOBILE MENU OVERLAY - enhanced with animations */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed top-16 w-full backdrop-blur-lg shadow-xl overflow-hidden z-40"
            style={{ backgroundColor: 'rgba(10, 34, 64, 0.95)' }}
          >
            <motion.div 
              className="px-6 py-8 space-y-2"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08
                  }
                }
              }}
              initial="hidden"
              animate="show"
            >
              {/* Mobile menu header */}
              <div className="mb-6 pb-4 border-b border-white/10">
                <h3 className="text-white/70 text-sm uppercase tracking-wider">Navigation</h3>
              </div>
              
              {/* Merge all links in one column on mobile with staggered animation */}
              {[...leftLinks, ...rightLinks].map((link, index) => (
                <motion.div
                  key={link.name}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 }
                  }}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center justify-between px-2 py-3 rounded-xl ${
                      location.pathname === link.path 
                        ? 'text-[#FF9E1B] bg-white/5' 
                        : 'text-white hover:bg-white/5'
                    } transition-all duration-200 font-medium`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{link.name}</span>
                    <ArrowRight className={`w-4 h-4 ${location.pathname === link.path ? 'text-[#FF9E1B]' : 'text-white/50'}`} />
                  </Link>
                </motion.div>
              ))}
              
              {/* Auth Links section header */}
              <motion.div 
                className="mt-8 mb-4 pt-4 border-t border-white/10"
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1 }
                }}
              >
                <h3 className="text-white/70 text-sm uppercase tracking-wider mb-4">Account</h3>
              </motion.div>
              
              {/* Auth Links for Mobile */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0 }
                }}
                className="flex flex-col space-y-3"
              >
                <Link
                  to="/signin"
                  className="px-4 py-3 border border-white/20 text-white rounded-xl text-center bg-white/5 hover:bg-white/10 transition-all duration-200 font-medium flex items-center justify-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/subscribe"
                  className="px-4 py-3 bg-[#FF9E1B] text-[#0A2240] rounded-xl text-center hover:bg-[#FFBE5C] transition-all duration-200 font-medium flex items-center justify-center gap-2 shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  <Lock className="w-4 h-4" />
                  <span>Subscribe</span>
                </Link>
              </motion.div>
              
              {/* Bottom decoration */}
              <motion.div 
                className="pt-8 pb-4 opacity-60 text-center text-white/40 text-xs"
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 0.6 }
                }}
              >
                <div className="flex justify-center space-x-6 mb-4">
                  {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map(social => (
                    <span key={social} className="hover:text-[#FF9E1B] cursor-pointer transition-colors">{social}</span>
                  ))}
                </div>
                © {new Date().getFullYear()} Daring Different
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;