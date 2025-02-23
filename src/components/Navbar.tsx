import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

  return (
    <nav className="relative z-50">
      {/* NAVBAR CONTAINER */}
      <div
        className="fixed top-0 w-full shadow-sm backdrop-blur-md"
        style={{ backgroundColor: '#01576E' }}
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
                  className="text-white hover:text-[#fffdfa] transition-colors duration-200 font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CENTER LOGO */}
            <Link to="/" onClick={() => setIsOpen(false)}>
              <div className="flex items-center justify-center bg-white rounded-full p-2 mx-8">
                <img
                  src="https://drive.google.com/thumbnail?id=1F5-60YjmLJzaJEMJYcl-A6BiQ4bU-oWh&sz=w1000"
                  alt="Daring Different Logo"
                  className="h-12 w-12 object-contain"
                />
              </div>
            </Link>

            {/* RIGHT LINKS with a big margin-right (5 inches = ~480px) */}
            <div className="flex items-center space-x-8 mr-[240px]">
              {rightLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-white hover:text-[#FBB03B] transition-colors duration-200 font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* AUTH BUTTONS pinned to the extreme right */}
            <div className="absolute right-8 flex items-center space-x-4">
              <Link
                to="/subscribe"
                className="px-4 py-2 border border-white text-white rounded-full hover:bg-white hover:text-[#01576E] transition-colors duration-200 font-medium"
              >
                Subscribe
              </Link>
              <Link
                to="/signin"
                className="px-4 py-2 bg-white text-[#01576E] rounded-full hover:bg-gray-100 transition-colors duration-200 font-medium"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* MOBILE LAYOUT (NAVBAR TOP) */}
          <div className="flex items-center justify-between h-16 md:hidden">
            {/* MINI LOGO LEFT */}
            <Link to="/" onClick={() => setIsOpen(false)}>
              <div className="flex items-center justify-center bg-white rounded-full p-1">
                <img
                  src="https://drive.google.com/thumbnail?id=1F5-60YjmLJzaJEMJYcl-A6BiQ4bU-oWh&sz=w1000"
                  alt="Daring Different Logo"
                  className="h-10 w-10 object-contain"
                />
              </div>
            </Link>

            {/* HAMBURGER MENU RIGHT */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#FBB03B] transition-colors duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* WAVE ACCENT AT NAVBAR BOTTOM */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block w-[calc(100%+1.3px)] h-6"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
          >
            <path
              d="M321.39,56.4C203.44,74,85.82,95.81,0,109.79V120H1200V0
              C1100.76,24.36,957.56,62.08,777.48,49.2
              C608.88,37.29,482.84,15.69,321.39,56.4Z"
              fill="#FBB03B"
              fillOpacity="0.2"
            />
          </svg>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-16 w-full backdrop-blur-md shadow-md"
            style={{ backgroundColor: '#01576ED9' }}
          >
            <div className="px-4 py-4 space-y-6">
              {/* Merge all links in one column on mobile */}
              {[...leftLinks, ...rightLinks].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-3 py-2 text-white hover:text-[#FBB03B] transition-colors duration-200 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {/* Auth Links for Mobile */}
              <Link
                to="/signin"
                className="block px-3 py-2 border border-white text-white rounded-full text-center hover:bg-white hover:text-[#01576E] transition-colors duration-200 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="block px-3 py-2 bg-white text-[#01576E] rounded-full text-center hover:bg-gray-100 transition-colors duration-200 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
