import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight, User, Lock, LogOut } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { useAuth } from '../lib/AuthContext';

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
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

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
    setUserMenuOpen(false);
  }, [location.pathname]);

  // Function to toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle sign out
  const handleSignOut = async (e) => {
    e.preventDefault();
    await signOut();
    navigate('/');
    setUserMenuOpen(false);
  };

  // Function to handle logo click with direct navigation
  const handleLogoClick = (e) => {
    e.preventDefault();
    setIsOpen(false);
    navigate('/');
  };

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
                  className={`relative group ${location.pathname === link.path
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
            <div
              onClick={handleLogoClick}
              className="cursor-pointer"
            >
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
            </div>

            {/* RIGHT LINKS with a big margin-right */}
            <div className="flex items-center space-x-16 mr-[120px]">
              {rightLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative group ${location.pathname === link.path
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

            {/* AUTH BUTTONS - COMPLETELY REWORKED WITH SIMPLER HTML/CSS */}
            <div className="absolute right-0 flex items-center space-x-4 z-50">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 text-white hover:text-[#FF9E1B] transition-colors duration-200 cursor-pointer"
                  >
                    <div className="h-9 w-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center overflow-hidden">
                      {user.user_metadata?.avatar_url ? (
                        <img
                          src={user.user_metadata.avatar_url}
                          alt="User avatar"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-[#FF9E1B] font-medium">
                          {user.email?.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <span className="font-medium text-sm hidden sm:block">
                      {user.email?.split('@')[0]}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* User menu dropdown */}
                  {userMenuOpen && (
                    <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-xl py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                      </div>
                      <a
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 space-x-2 cursor-pointer"
                      >
                        <User className="w-4 h-4" />
                        <span>Your Profile</span>
                      </a>

                      <a
                        href="#"
                        onClick={handleSignOut}
                        className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 space-x-2 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign out</span>
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* SIMPLIFIED AUTH BUTTONS WITH DIRECT LINKS */}
                  <a
                    href="/signin"
                    className="text-white/90 hover:text-white transition-colors duration-200 text-sm font-medium cursor-pointer"
                  >
                    Sign in
                  </a>
                  <a
                    href="/signup"
                    className="bg-[#FF9E1B] hover:bg-[#FFBE5C] text-[#0A2240] px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer"
                  >
                    Sign up
                  </a>
                </>
              )}
            </div>
          </div>

          {/* MOBILE LAYOUT (NAVBAR TOP) */}
          <div className="flex items-center justify-between h-16 md:hidden">
            {/* MINI LOGO LEFT */}
            <div
              onClick={handleLogoClick}
              className="cursor-pointer"
            >
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
            </div>

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
              onClick={toggleMenu}
              className="text-white hover:text-[#FF9E1B] transition-colors duration-200 p-2 rounded-full bg-white/10 backdrop-blur-sm z-50 cursor-pointer"
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

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 inset-x-0 h-screen bg-[#0A2240] shadow-xl overflow-y-auto z-40"
            style={{ backgroundColor: 'rgba(10, 34, 64, 0.95)' }}
          >
            <div className="px-6 py-8">
              {/* Mobile menu header */}
              <div className="mb-6 pb-4 border-b border-white/10">
                <h3 className="text-white/70 text-sm uppercase tracking-wider">Navigation</h3>
              </div>

              {/* Merge all links in one column on mobile */}
              <div className="space-y-2">
                {[...leftLinks, ...rightLinks].map((link, index) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center justify-between px-2 py-3 rounded-xl ${location.pathname === link.path
                      ? 'text-[#FF9E1B] bg-white/5'
                      : 'text-white hover:bg-white/5'
                      } transition-all duration-200 font-medium cursor-pointer`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{link.name}</span>
                    <ArrowRight className={`w-4 h-4 ${location.pathname === link.path ? 'text-[#FF9E1B]' : 'text-white/50'}`} />
                  </Link>
                ))}

                {/* Add subscription link if user is logged in */}
                {user && (
                  <Link
                    to="/subscribe"
                    className={`flex items-center justify-between px-2 py-3 rounded-xl ${location.pathname === '/subscribe'
                      ? 'text-[#FF9E1B] bg-white/5'
                      : 'text-white hover:bg-white/5'
                      } transition-all duration-200 font-medium cursor-pointer`}
                    onClick={() => setIsOpen(false)}
                  >


                  </Link>
                )}
              </div>

              {/* Auth Links section header */}
              <div className="mt-8 mb-4 pt-4 border-t border-white/10">
                <h3 className="text-white/70 text-sm uppercase tracking-wider mb-4">Account</h3>
              </div>

              {/* Conditionally render auth links based on authentication state */}
              {user ? (
                <div className="space-y-2">
                  {/* User info section */}
                  <div className="flex items-center px-2 py-3 rounded-xl bg-white/5">
                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden mr-3">
                      {user.user_metadata?.avatar_url ? (
                        <img
                          src={user.user_metadata.avatar_url}
                          alt="User avatar"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-[#FF9E1B] font-medium">
                          {user.email?.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="text-white font-medium">{user.email?.split('@')[0]}</div>
                      <div className="text-white/60 text-xs truncate">{user.email}</div>
                    </div>
                  </div>

                  {/* Profile link */}
                  <Link
                    to="/profile"
                    className="flex items-center justify-between px-2 py-3 rounded-xl text-white hover:bg-white/5 transition-all duration-200 font-medium cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center">
                      <User className="w-5 h-5 mr-3 text-white/70" />
                      <span>Your Profile</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/50" />
                  </Link>

                  {/* Sign out button */}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSignOut(e);
                      setIsOpen(false);
                    }}
                    className="flex items-center w-full px-2 py-3 rounded-xl text-[#FF9E1B] hover:bg-white/5 transition-all duration-200 font-medium cursor-pointer"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    <span>Sign out</span>
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* SIMPLIFIED MOBILE AUTH LINKS */}
                  <a
                    href="/signin"
                    className="flex items-center justify-between w-full px-2 py-3 rounded-xl text-white hover:bg-white/5 transition-all duration-200 font-medium cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>Sign in</span>
                    <ArrowRight className="w-4 h-4 text-white/50" />
                  </a>
                  <a
                    href="/signup"
                    className="flex items-center justify-center w-full px-4 py-3 rounded-xl bg-[#FF9E1B] text-[#0A2240] hover:bg-[#FFBE5C] transition-all duration-200 font-medium shadow-md cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>Sign up</span>
                  </a>
                </div>
              )}

              {/* Bottom decoration */}
              <div className="pt-8 pb-4 opacity-60 text-center text-white/40 text-xs">
                <div className="flex justify-center space-x-6 mb-4">
                  {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map(social => (
                    <span key={social} className="hover:text-[#FF9E1B] cursor-pointer transition-colors">{social}</span>
                  ))}
                </div>
                © {new Date().getFullYear()} Daring Different
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
