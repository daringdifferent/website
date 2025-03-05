// Podcast.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import {
  PlayCircle,
  Clock,
  MessageCircle,
  Lock,
  Star,
  Share2,
  Headphones,
  ArrowRight,
  Users,
  Sparkles,
  Heart,
  Play,
  Calendar,
  Download,
  Bookmark,
  Volume2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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

interface Episode {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  likes: number;
  published_at: string;
  is_premium?: boolean;
  rating?: number;
  comments_count?: number;
  duration?: string;
  host?: string;
  category?: string;
  guests?: string[];
}

const Podcast: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [currentFilter, setCurrentFilter] = useState("all");
  
  // Scroll animation values
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  
  // Scroll triggered animations
  const heroOpacity = useTransform(smoothScrollProgress, [0, 0.2], [1, 0]);
  const featuredScale = useTransform(smoothScrollProgress, [0.05, 0.25], [0.95, 1]);
  const featuredOpacity = useTransform(smoothScrollProgress, [0.05, 0.25], [0, 1]);

  // Fetch episodes from Supabase on mount
  useEffect(() => {
    const fetchEpisodes = async () => {
      const { data, error } = await supabase
        .from('podcast_episodes')
        .select('*')
        .order('published_at', { ascending: false });
      if (error) {
        console.error('Error fetching episodes:', error);
      } else {
        // Add some mock data for duration and other properties if they don't exist
        const processedData = data.map(episode => ({
          ...episode,
          duration: episode.duration || '45 mins',
          rating: episode.rating || (4 + Math.random()).toFixed(1),
          comments_count: episode.comments_count || Math.floor(Math.random() * 50) + 5,
          category: episode.category || ["Inspiration", "Disability Awareness", "Personal Growth"][Math.floor(Math.random() * 3)]
        }));
        setEpisodes(processedData);
      }
      setLoading(false);
    };
    fetchEpisodes();
  }, []);

  // Featured episode is the first one
  const featuredEpisode = episodes.length > 0 ? episodes[0] : null;

  // Navigate to video player page with selected episode
  const handlePlayEpisode = (episode: Episode) => {
    navigate('/videos', { state: { episode } });
  };

  // Filter episodes
  const filteredEpisodes = episodes.filter(episode => {
    if (currentFilter === "all") return true;
    if (currentFilter === "premium") return episode.is_premium;
    if (currentFilter === "free") return !episode.is_premium;
    // Add more filters as needed
    return true;
  });

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
                <motion.circle 
                  cx="50" cy="50" r="45" 
                  stroke="#FF9E1B" 
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                <motion.path 
                  d="M50 20v30M50 50l20 15" 
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
              Loading Podcast Episodes
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
              src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt="Podcast background"
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
                <Headphones className="w-4 h-4 mr-2" />
                Listen to Inspiring Conversations
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="relative inline-block">
                <span className="relative z-10">Daring <span className="text-[#FF9E1B]">Different</span></span>
                <motion.div 
                  className="absolute -bottom-2 left-0 h-4 bg-[#FF9E1B]/20 w-full -z-0"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </div>
              <div className="text-3xl md:text-4xl mt-2 text-white/90 font-light">Podcast</div>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Join Ciara for inspiring conversations about resilience, disability awareness, and embracing uniqueness.
            </motion.p>
            
            {/* Actions */}
            <motion.div 
              className="flex flex-wrap justify-center gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <Link to="/subscribe">
                <motion.div
                  className="group relative"
                  whileHover="hover"
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#FF9E1B] blur-md group-hover:blur-xl transition-all duration-300"
                    variants={{
                      hover: { 
                        scale: 1.1,
                        opacity: 0.7
                      }
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative px-8 py-4 font-bold text-[#0A2240] bg-[#FF9E1B] rounded-full
                              flex items-center gap-2 shadow-lg transform transition-all"
                  >
                    <Lock className="w-5 h-5" />
                    <span>Subscribe for Full Access</span>
                  </motion.button>
                </motion.div>
              </Link>

              {featuredEpisode && (
                <motion.button
                  onClick={() => handlePlayEpisode(featuredEpisode)}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 font-bold text-white border-2 border-white/30 rounded-full
                            flex items-center gap-2 backdrop-blur-md bg-white/5
                            hover:bg-white/10 transform transition-all hover:border-white/60"
                >
                  <PlayCircle className="w-5 h-5" />
                  <span>Latest Episode</span>
                </motion.button>
              )}
            </motion.div>
            
            {/* Stats */}
            <motion.div 
              className="flex flex-wrap justify-center gap-8 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {[
                { count: episodes.length || "50+", label: "Episodes" },
                { count: "10K+", label: "Monthly Listeners" },
                { count: "4.9", label: "Rating", icon: <Star className="w-4 h-4 text-[#FF9E1B]" /> }
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                    {stat.icon || <Headphones className="w-6 h-6 text-[#FF9E1B]" />}
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

      {/* ENHANCED FEATURED EPISODE SECTION */}
      {featuredEpisode && (
        <motion.section 
          className="py-32 relative overflow-hidden"
          style={{ opacity: featuredOpacity, scale: featuredScale }}
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
                  <Volume2 className="w-4 h-4 inline mr-2 text-[#FF9E1B]" />
                  Featured Episode
                </motion.span>
              </div>
              
              <h2 className="text-4xl font-bold text-[#0A2240] mb-4 relative inline-block">
                Latest Release
                <motion.div 
                  className="absolute -bottom-2 left-0 w-full h-2 bg-[#FF9E1B] rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                />
              </h2>
              <p className="text-xl text-[#0A2240]/70 max-w-3xl mx-auto mt-4">
                Tune in to our most recent conversation exploring new perspectives and inspiring stories.
              </p>
            </motion.div>
            
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform perspective-[1000px] group"
              whileHover={{ scale: 1.01 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Image Column */}
                <div className="lg:col-span-5 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#0A2240] to-transparent z-10 opacity-60"
                    whileHover={{ opacity: 0.4 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <img
                    src={featuredEpisode.thumbnail_url || "https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"}
                    alt={featuredEpisode.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ minHeight: "100%" }}
                  />
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div 
                      className="relative"
                      whileHover={{ scale: 1.1 }}
                    >
                      <motion.div 
                        className="absolute inset-0 bg-[#FF9E1B] rounded-full blur-lg" 
                        animate={{ 
                          scale: [1, 1.1, 1],
                          opacity: [0.7, 0.9, 0.7]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.button
                        onClick={() => handlePlayEpisode(featuredEpisode)}
                        className="relative w-16 h-16 rounded-full bg-[#FF9E1B] flex items-center justify-center shadow-lg cursor-pointer z-10"
                      >
                        <Play className="w-8 h-8 text-[#0A2240] ml-1" />
                      </motion.button>
                    </motion.div>
                  </div>
                  
                  {/* Episode badge */}
                  <div className="absolute top-6 left-6 z-20">
                    {featuredEpisode.is_premium ? (
                      <div className="bg-[#FF9E1B] text-[#0A2240] px-4 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-1.5">
                        <Lock className="w-4 h-4" />
                        Premium
                      </div>
                    ) : (
                      <div className="bg-[#00B2A9] text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                        Free Episode
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Content Column */}
                <div className="lg:col-span-7 p-8 lg:p-12">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="px-3 py-1 rounded-full bg-[#0A2240]/5 text-xs font-medium text-[#0A2240]">
                      {featuredEpisode.category || "Disability Awareness"}
                    </div>
                    <div className="text-[#0A2240]/60 text-sm">
                      {new Date(featuredEpisode.published_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-[#0A2240] mb-4 group-hover:text-[#FF9E1B] transition-colors">
                    {featuredEpisode.title}
                  </h3>
                  
                  <p className="text-[#0A2240]/70 mb-6 line-clamp-3 lg:line-clamp-none">
                    {featuredEpisode.description}
                  </p>
                  
                  {/* Stats row */}
                  <div className="flex flex-wrap items-center gap-6 mb-8 text-[#0A2240]/70">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#FF9E1B]" />
                      <span>{featuredEpisode.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-[#FF9E1B]" />
                      <span>{featuredEpisode.rating} Rating</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4 text-[#FF9E1B]" />
                      <span>{featuredEpisode.comments_count} Comments</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <motion.button
                      onClick={() => handlePlayEpisode(featuredEpisode)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-[#0A2240] text-white rounded-full
                                flex items-center gap-2 shadow-md hover:shadow-lg
                                transform transition-all"
                    >
                      <PlayCircle className="w-5 h-5" />
                      <span>Play Episode</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 border border-[#0A2240]/20 text-[#0A2240] rounded-full
                                flex items-center gap-2 hover:bg-[#0A2240]/5
                                transform transition-all"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full flex items-center justify-center
                                border border-[#0A2240]/20 text-[#0A2240] hover:bg-[#0A2240]/5"
                    >
                      <Share2 className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full flex items-center justify-center
                                border border-[#0A2240]/20 text-[#0A2240] hover:bg-[#0A2240]/5"
                    >
                      <Bookmark className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* ENHANCED EPISODE LIST SECTION */}
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
            className="mb-16"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-block mb-3">
                  <motion.span 
                    className="inline-block py-1.5 px-4 rounded-full text-sm font-medium bg-[#0A2240]/5 text-[#0A2240]"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <Headphones className="w-4 h-4 inline mr-2 text-[#FF9E1B]" />
                    All Episodes
                  </motion.span>
                </div>
                
                <h2 className="text-4xl font-bold text-[#0A2240] mb-4 relative inline-block">
                  Browse Our Collection
                  <motion.div 
                    className="absolute -bottom-2 left-0 w-full h-2 bg-[#FF9E1B] rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  />
                </h2>
              </div>
              
              {/* Filter tabs */}
              <div className="flex p-1 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-100">
                {[
                  { id: "all", label: "All Episodes" },
                  { id: "free", label: "Free" },
                  { id: "premium", label: "Premium" }
                ].map(filter => (
                  <motion.button
                    key={filter.id}
                    onClick={() => setCurrentFilter(filter.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      currentFilter === filter.id 
                        ? 'bg-[#0A2240] text-white shadow-md' 
                        : 'text-[#0A2240]/70 hover:text-[#0A2240] hover:bg-[#0A2240]/5'
                    }`}
                    whileHover={currentFilter !== filter.id ? { scale: 1.05 } : {}}
                    whileTap={currentFilter !== filter.id ? { scale: 0.95 } : {}}
                  >
                    {filter.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {filteredEpisodes.slice(featuredEpisode ? 1 : 0).map((episode, index) => (
              <motion.div
                key={episode.id}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 flex flex-col h-full"
              >
                {/* Thumbnail with overlay */}
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2240] via-transparent to-transparent z-10 opacity-60" />
                  
                  <img
                    src={episode.thumbnail_url || `https://images.unsplash.com/photo-${1580000000000 + index}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80`}
                    alt={episode.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Episode badge */}
                  {episode.is_premium && (
                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-[#FF9E1B] text-[#0A2240] px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Premium
                      </div>
                    </div>
                  )}
                  
                  {/* Episode number */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
                      Episode {episodes.length - index}
                    </div>
                  </div>
                  
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      onClick={() => handlePlayEpisode(episode)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                        episode.is_premium 
                          ? 'bg-white/20 text-white backdrop-blur-md' 
                          : 'bg-[#FF9E1B] text-[#0A2240]'
                      }`}
                    >
                      {episode.is_premium ? <Lock className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </motion.button>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="px-3 py-1 rounded-full bg-[#0A2240]/5 text-xs font-medium text-[#0A2240]">
                      {episode.category || "Personal Growth"}
                    </div>
                    <div className="text-[#0A2240]/60 text-xs">
                      {new Date(episode.published_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#0A2240] mb-3 group-hover:text-[#FF9E1B] transition-colors line-clamp-2">
                    {episode.title}
                  </h3>
                  
                  <p className="text-[#0A2240]/70 mb-4 line-clamp-3 text-sm flex-grow">
                    {episode.description}
                  </p>
                  
                  {/* Stats row */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-4 text-xs text-[#0A2240]/70">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#FF9E1B]" />
                        {episode.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-[#FF9E1B]" />
                        {episode.rating}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#0A2240]/70 hover:bg-[#0A2240]/5 transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#0A2240]/70 hover:bg-[#0A2240]/5 transition-colors"
                      >
                        <Bookmark className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
                
                {/* Action button */}
                <div className="px-6 pb-6 pt-2">
                  <motion.button
                    onClick={() => handlePlayEpisode(episode)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-2.5 rounded-full flex items-center justify-center gap-2 transition-all ${
                      episode.is_premium
                        ? 'bg-[#F7F9FC] text-[#0A2240]/70 border border-[#0A2240]/10'
                        : 'bg-[#0A2240] text-white shadow-md hover:shadow-lg'
                    }`}
                  >
                    {episode.is_premium ? (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Subscribe to Listen</span>
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-4 h-4" />
                        <span>Play Episode</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {episodes.length > 9 && (
            <div className="text-center mt-16">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-[#0A2240] rounded-full font-bold
                          inline-flex items-center gap-2 shadow-lg hover:shadow-xl border border-gray-100"
              >
                <span>Load More Episodes</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          )}
        </div>
      </motion.section>

      {/* ENHANCED SUBSCRIBE CTA SECTION */}
      <motion.section 
        className="py-32 relative overflow-hidden"
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
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-white/20 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                {/* Content side */}
                <div className="md:col-span-8 p-8 md:p-12">
                  <motion.div 
                    className="inline-block mb-4 px-4 py-1.5 bg-white/10 rounded-full"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <span className="text-[#FF9E1B] font-medium text-sm flex items-center">
                      <Lock className="w-4 h-4 mr-2" />
                      Premium Membership
                    </span>
                  </motion.div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Unlock Premium Content
                  </h2>
                  
                  <p className="text-xl text-white/80 mb-8">
                    Subscribe to access all episodes, exclusive content, and join our community of listeners.
                  </p>
                  
                  {/* Benefits */}
                  <div className="space-y-4 mb-8">
                    {[
                      { text: "Full access to all premium episodes", icon: <PlayCircle className="w-5 h-5 text-[#FF9E1B]" /> },
                      { text: "Early release of new content", icon: <Calendar className="w-5 h-5 text-[#FF9E1B]" /> },
                      { text: "Exclusive Q&A sessions with guests", icon: <MessageCircle className="w-5 h-5 text-[#FF9E1B]" /> },
                      { text: "Ad-free listening experience", icon: <Volume2 className="w-5 h-5 text-[#FF9E1B]" /> }
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + (i * 0.1), duration: 0.5 }}
                      >
                        <div className="mt-0.5">{item.icon}</div>
                        <span className="text-white/90">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                  >
                    <Link to="/subscribe">
                      <motion.div
                        className="group relative inline-block"
                        whileHover="hover"
                      >
                        <motion.div
                          className="absolute inset-0 rounded-full bg-[#FF9E1B] blur-md opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                          variants={{
                            hover: { scale: 1.1 }
                          }}
                        />
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="relative px-8 py-4 font-bold text-[#0A2240] bg-[#FF9E1B] rounded-full
                                    flex items-center gap-2 shadow-lg transform transition-all z-10"
                        >
                          <Lock className="w-5 h-5" />
                          <span>Subscribe Now - $10/month</span>
                        </motion.button>
                      </motion.div>
                    </Link>
                  </motion.div>
                </div>
                
                {/* Decorative side */}
                <div className="hidden md:block md:col-span-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF9E1B]/30 to-[#00B2A9]/30 opacity-30"></div>
                  
                  {/* Floating elements */}
                  <div className="absolute inset-0 overflow-hidden">
                    {/* Audio wave visualization */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="flex items-center justify-center gap-1 h-20">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-1.5 h-8 bg-white/80 rounded-full"
                            animate={{ 
                              height: [
                                `${8 + Math.sin((i + 1) * 0.5) * 12}px`, 
                                `${8 + Math.cos((i + 1) * 0.5) * 20}px`,
                                `${8 + Math.sin((i + 1) * 0.5) * 12}px`
                              ] 
                            }}
                            transition={{ 
                              duration: 1.2, 
                              repeat: Infinity,
                              delay: i * 0.07
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Orbital circles */}
                    {[1, 2, 3].map((i) => (
                      <motion.div 
                        key={i}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
                        style={{ 
                          width: `${i * 120}px`, 
                          height: `${i * 120}px` 
                        }}
                        animate={{ 
                          rotate: 360,
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 10 + i * 5, 
                          repeat: Infinity,
                          ease: "linear",
                          repeatType: "loop"
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Podcast;