import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import {
  ChevronDown,
  Image as ImageIcon,
  Play,
  Calendar,
  Clock,
  FilmIcon,
  Heart,
  Share2,
  Download,
  ArrowRight,
  Filter,
  Search,
  Sparkles,
  X
} from 'lucide-react';
import { supabase } from '../lib/supabase';

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

const Gallery = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [filterType, setFilterType] = useState('all');

  // For masonry layout
  const masonryRef = useRef<HTMLDivElement>(null);

  // Scroll animation values
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  // Scroll triggered animations
  const heroOpacity = useTransform(smoothScrollProgress, [0, 0.2], [1, 0]);
  const galleryScale = useTransform(smoothScrollProgress, [0.1, 0.3], [0.95, 1]);
  const galleryOpacity = useTransform(smoothScrollProgress, [0.1, 0.3], [0, 1]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('gallery_events')
        .select('*, gallery_items(*)')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching gallery events:', error);
      } else if (data) {
        // Process data to add some default props if needed
        const processedData = data.map(event => ({
          ...event,
          date: event.date || new Date().toISOString().split('T')[0],
          location: event.location || 'Online Event',
          gallery_items: event.gallery_items.map((item: any) => ({
            ...item,
            likes: item.likes || Math.floor(Math.random() * 100) + 5,
          }))
        }));

        setEvents(processedData);
        if (processedData.length > 0) {
          setSelectedEvent(processedData[0]);
        }
      }
      setLoading(false);
    };
    fetchEvents();
  }, []);

  // Filter gallery items based on media type
  const filteredItems = selectedEvent ?
    selectedEvent.gallery_items.filter((item: any) => {
      if (filterType === 'all') return true;
      if (filterType === 'image') return item.media_type === 'image';
      if (filterType === 'video') return item.media_type === 'video';
      return true;
    }) : [];

  // Advanced loading animation
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A2240] via-[#051b33] to-[#061124]">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Particle 1 */}
            <ParticleShape className="absolute top-[10%] left-[20%] w-64 h-64 rounded-full bg-[#FF9E1B]/5 blur-3xl" />
            {/* Particle 2 */}
            <ParticleShape className="absolute top-[60%] right-[10%] w-96 h-96 rounded-full bg-[#00B2A9]/5 blur-3xl" />
            {/* Particle 3 */}
            <ParticleShape className="absolute bottom-[20%] left-[30%] w-48 h-48 rounded-full bg-[#F15A5A]/5 blur-3xl" />
          </div>

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDJ2MmgtMnpNNDAgMzRoMnYyaC0yek00NCAzNGgydjJoLTJ6TTM0IDMwaDJ2MmgtMnpNMzQgMjZoMnYyaC0yek0zNCAyMmgydjJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-5" />
        </div>

        <div className="relative">
          <div className="text-center">
            <motion.div
              className="w-20 h-20 mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M10 50C10 27.91 27.91 10 50 10C72.09 10 90 27.91 90 50C90 72.09 72.09 90 50 90C27.91 90 10 72.09 10 50Z"
                  stroke="#FF9E1B"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                <motion.path
                  d="M30 30H70V70H30V30Z M30 45H70 M45 30V70"
                  stroke="#FF9E1B"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>

            <motion.h2
              className="text-2xl text-white font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Loading Gallery
            </motion.h2>

            <motion.div
              className="mt-4 w-48 h-1 mx-auto bg-gray-800 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[#FF9E1B] to-[#00B2A9]"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.9, duration: 2, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    );
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
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1950&q=80"
              alt="Gallery Background"
              className="w-full h-full object-cover opacity-40"
            />
          </div>

          {/* Floating elements */}
          <div className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-[#FF9E1B]/10 blur-3xl transform -translate-y-1/2" />
          <div className="absolute bottom-[30%] right-[5%] w-96 h-96 rounded-full bg-[#00B2A9]/10 blur-3xl" />

          {/* Animated photo frames */}
          <div className="absolute inset-0 overflow-hidden">
            {[1, 2, 3, 4, 5].map((i) => {
              const randomX = 10 + (i * 15) + Math.random() * 5;
              const randomY = 20 + (i * 10) + Math.random() * 10;
              const rotate = -10 + Math.random() * 20;

              return (
                <motion.div
                  key={i}
                  className="absolute border-4 border-white/20 shadow-lg rounded-md overflow-hidden"
                  style={{
                    width: `${60 + Math.random() * 40}px`,
                    height: `${60 + Math.random() * 40}px`,
                    top: `${randomY}%`,
                    left: `${randomX}%`,
                    rotate: `${rotate}deg`,
                    opacity: 0.3 + Math.random() * 0.4
                  }}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [rotate, rotate + 5, rotate],
                    opacity: [0, 0.7, 0]
                  }}
                  transition={{
                    duration: 8 + Math.random() * 7,
                    repeat: Infinity,
                    delay: i * 2
                  }}
                >
                  <div className="w-full h-full bg-white/10" />
                </motion.div>
              );
            })}
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
                <ImageIcon className="w-4 h-4 mr-2" />
                Captured Moments
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="relative inline-block">
                <span className="relative z-10">Photo <span className="text-[#FF9E1B]">Gallery</span></span>
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
              Moments from Ciara's events, engagements, and live shows captured in time.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap justify-center gap-8 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {[

              ].map((stat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                    {stat.icon}
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

      {/* ENHANCED EVENT TABS SECTION */}
      <motion.section
        className="py-16 relative overflow-hidden bg-white"
        style={{ opacity: galleryOpacity, scale: galleryScale }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-noise.png')] opacity-5" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-12"
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
                Browse Events
              </motion.span>
            </div>

            <h2 className="text-4xl font-bold text-[#0A2240] mb-4 relative inline-block">
              Explore Our Gallery
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-2 bg-[#FF9E1B] rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
            </h2>
            <p className="text-xl text-[#0A2240]/70 max-w-3xl mx-auto mt-4">
              Select an event to view its photo and video collection.
            </p>
          </motion.div>

          <div className="overflow-x-auto py-4">
            <motion.div
              className="flex justify-center gap-3 min-w-max mx-auto"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  variants={fadeInUp}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className={`relative px-6 py-3 rounded-full transition-all duration-300 min-w-[140px]
                                border-2 ${selectedEvent?.id === event.id
                        ? 'bg-[#0A2240] text-white border-[#0A2240]'
                        : 'bg-white text-[#0A2240] border-[#0A2240]/10 hover:border-[#0A2240]/30'
                      }`}
                  >
                    <div className="font-bold text-sm">
                      {event.name}
                    </div>
                    <div className="text-xs opacity-70 mt-0.5">
                      {event.date && new Date(event.date).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>

                    {/* Active indicator */}
                    {selectedEvent?.id === event.id && (
                      <motion.div
                        className="absolute -bottom-1 left-1/2 w-1.5 h-1.5 bg-[#FF9E1B] rounded-full"
                        initial={{ x: "-50%", scale: 0 }}
                        animate={{ scale: 1 }}
                        layoutId="activeEventIndicator"
                      />
                    )}
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ENHANCED MEDIA GALLERY FOR SELECTED EVENT */}
      {selectedEvent && (
        <motion.section
          className="py-20 relative overflow-hidden bg-[#F7F9FC]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-noise.png')] opacity-5" />

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            {/* Event Title & Description */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="px-3 py-1 rounded-full bg-[#0A2240]/5 text-xs font-medium text-[#0A2240]">
                        {selectedEvent.location || "Event"}
                      </div>
                      <div className="text-[#0A2240]/60 text-sm flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-[#FF9E1B]" />
                        {selectedEvent.date && new Date(selectedEvent.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </div>

                    <h2 className="text-3xl font-bold text-[#0A2240] mb-2">
                      {selectedEvent.name}
                    </h2>

                    <p className="text-[#0A2240]/70 max-w-2xl">
                      {selectedEvent.description}
                    </p>
                  </div>

                  {/* Filter controls */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="p-1 bg-[#F7F9FC] rounded-full shadow-sm border border-gray-100 flex">
                      {[
                        { id: "all", label: "All", icon: <Filter className="w-3.5 h-3.5" /> },
                        { id: "image", label: "Photos", icon: <ImageIcon className="w-3.5 h-3.5" /> },
                        { id: "video", label: "Videos", icon: <FilmIcon className="w-3.5 h-3.5" /> }
                      ].map(filter => (
                        <motion.button
                          key={filter.id}
                          onClick={() => setFilterType(filter.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${filterType === filter.id
                            ? 'bg-[#0A2240] text-white shadow-md'
                            : 'text-[#0A2240]/70 hover:text-[#0A2240] hover:bg-[#0A2240]/5'
                            }`}
                          whileHover={filterType !== filter.id ? { scale: 1.05 } : {}}
                          whileTap={filterType !== filter.id ? { scale: 0.95 } : {}}
                        >
                          {filter.icon}
                          <span>{filter.label}</span>
                        </motion.button>
                      ))}
                    </div>

                    <div className="relative">
                      <div className="flex items-center px-3 py-1.5 bg-[#F7F9FC] rounded-full shadow-sm border border-gray-100">
                        <Search className="w-3.5 h-3.5 text-[#0A2240]/50 mr-1.5" />
                        <input
                          type="text"
                          placeholder="Search..."
                          className="bg-transparent border-none outline-none text-xs w-20 text-[#0A2240]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Enhanced masonry gallery layout */}
            <motion.div
              ref={masonryRef}
              className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {filteredItems.map((item: any, index: number) => (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  transition={{ delay: 0.05 * (index % 8) }}
                  className="break-inside-avoid mb-4"
                >
                  <motion.div
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="relative">
                      {item.media_type === 'image' ? (
                        <>
                          <div className="relative overflow-hidden">
                            <img
                              src={item.url}
                              alt={item.alt_text}
                              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>

                          {/* Overlay action buttons */}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-sm text-[#0A2240] hover:bg-white transition-colors shadow-md"
                                onClick={() => setSelectedItem(item)}
                              >
                                <Search className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-sm text-[#0A2240] hover:bg-white transition-colors shadow-md"
                              >
                                <Download className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                        </>
                      ) : (
                        // Video container with preview and play button
                        <div className="relative aspect-video bg-[#0A2240]/5">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-12 h-12 rounded-full bg-[#FF9E1B] flex items-center justify-center shadow-lg"
                              onClick={() => setSelectedItem(item)}
                            >
                              <Play className="w-6 h-6 text-white ml-1" />
                            </motion.button>
                          </div>
                          <img
                            src={item.thumbnail_url || "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80"}
                            alt={item.alt_text}
                            className="w-full h-full object-cover opacity-70"
                          />
                        </div>
                      )}
                    </div>

                    {/* Caption */}
                    <div className="p-4">
                      <p className="text-[#0A2240] text-sm font-medium line-clamp-2">
                        {item.alt_text}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Load more button */}
            {filteredItems.length > 12 && (
              <div className="text-center mt-12">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-[#0A2240] rounded-full font-bold
                            inline-flex items-center gap-2 shadow-lg hover:shadow-xl border border-gray-100"
                >
                  <span>Load More</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* LIGHTBOX FOR SELECTED ITEM */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8"
          >
            <motion.button
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={() => setSelectedItem(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-5xl max-h-[85vh] overflow-hidden rounded-lg"
            >
              {selectedItem.media_type === 'image' ? (
                <img
                  src={selectedItem.url}
                  alt={selectedItem.alt_text}
                  className="w-full h-auto max-h-[80vh] object-contain mx-auto"
                />
              ) : (
                <div className="relative pb-[56.25%] h-0 bg-black">
                  <iframe
                    src={selectedItem.url}
                    title={selectedItem.alt_text}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {/* Caption */}
              <div className="bg-white/10 backdrop-blur-md p-4 text-white">
                <p className="text-lg">{selectedItem.alt_text}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Heart className="w-4 h-4 text-[#F15A5A]" />
                      <span className="text-sm">{selectedItem.likes || 0} likes</span>
                    </div>
                    <div className="text-sm text-white/70">
                      {new Date(selectedItem.created_at || new Date()).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
