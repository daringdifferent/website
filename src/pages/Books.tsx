// Books.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  BookOpen,
  ShoppingCart,
  Star,
  ArrowRight,
  Calendar,
  Clock,
  Heart,
  Sparkles,
  ChevronDown,
  X,
  Mail,
  Download,
  Award,
  BookMarked,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
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
  const y = useRef(null);
  const x = useRef(null);
  
  useEffect(() => {
    const randomX = Math.random() * 20 - 10;
    const randomY = Math.random() * 20 - 10;
    const randomDuration = 10 + Math.random() * 20;
    
    if (y.current && x.current) {
      const animateParticle = () => {
        y.current.set(randomY);
        x.current.set(randomX);
        
        // Animate with slight delay for more natural feel
        setTimeout(() => {
          y.current.set(-randomY);
          x.current.set(-randomX);
          
          // Reverse after duration
          setTimeout(() => {
            animateParticle();
          }, randomDuration * 1000);
        }, 100);
      };
      
      animateParticle();
    }
  }, []);
  
  return (
    <motion.div 
      className={className}
      style={{ y, x }}
      transition={{ duration: 20, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
    />
  );
};

interface Book {
  id: string;
  title: string;
  cover_url: string;
  price: number;
  rating: number;
  description: string;
  release_date: string;
  pages: number;
  author?: string;
  publisher?: string;
  isbn?: string;
  categories?: string[];
}

const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showWaitlistModal, setShowWaitlistModal] = useState<boolean>(false);
  const [showBookDetails, setShowBookDetails] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [waitlistMessage, setWaitlistMessage] = useState('');
  
  // Scroll animation values
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  
  // Scroll triggered animations
  const heroOpacity = useTransform(smoothScrollProgress, [0, 0.2], [1, 0]);
  const featuredScale = useTransform(smoothScrollProgress, [0.1, 0.3], [0.95, 1]);
  const featuredOpacity = useTransform(smoothScrollProgress, [0.1, 0.3], [0, 1]);
  
  // Fetch books from Supabase on mount; latest first (release_date descending)
  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('release_date', { ascending: false });
      if (error) {
        console.error("Error fetching books:", error);
      } else {
        // Add some mock data if properties are missing
        const processedData = (data || []).map(book => ({
          ...book,
          author: book.author || "Ciara",
          publisher: book.publisher || "Daring Different Publishing",
          isbn: book.isbn || `978-1-${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 10000)}-${Math.floor(Math.random() * 10)}`,
          categories: book.categories || ["Personal Growth", "Disability Awareness", "Memoir"][Math.floor(Math.random() * 3)],
        }));
        setBooks(processedData);
      }
      setLoading(false);
    };
    fetchBooks();
  }, []);

  // Latest book is the first one (assuming descending order)
  const latestBook = books.length > 0 ? books[0] : null;
  // Other books exclude the latest release
  const otherBooks = latestBook ? books.slice(1) : books;

  // Handle waitlist submission
  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBook) return;
    
    setSubmitting(true);
    
    const { error } = await supabase
      .from('book_waitlist')
      .insert([{ book_id: selectedBook.id, email }]);
      
    if (error) {
      console.error('Error joining waitlist:', error);
      setWaitlistMessage('Failed to join waitlist. Please try again.');
    } else {
      setWaitlistMessage('Thank you! You have been added to the waitlist.');
      setEmail('');
      // Close modal after a short delay
      setTimeout(() => {
        setShowWaitlistModal(false);
        setWaitlistMessage('');
      }, 2000);
    }
    
    setSubmitting(false);
  };

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
                  d="M30 20 L30 80 L70 80 L70 20 Z" 
                  stroke="#FF9E1B" 
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <motion.path 
                  d="M30 20 L70 20" 
                  stroke="#FF9E1B" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 1.5, ease: "easeInOut" }}
                />
                <motion.path 
                  d="M40 40 L60 40 M40 50 L60 50 M40 60 L60 60" 
                  stroke="#FF9E1B" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 2, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>
            
            <motion.h2
              className="text-2xl text-white font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Loading Books
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
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt="Books background"
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
          
          {/* Floating book covers */}
          {books.slice(0, 3).map((book, index) => (
            <motion.div
              key={`float-book-${index}`}
              className="absolute hidden md:block"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
                width: '120px',
                height: '180px',
                zIndex: 5,
                opacity: 0.4,
              }}
              initial={{ scale: 0.8, rotate: (Math.random() * 10 - 5) }}
              animate={{ 
                y: [20, -20, 20],
                rotate: [
                  (Math.random() * 10 - 5),
                  (Math.random() * 10 - 5),
                  (Math.random() * 10 - 5)
                ],
              }}
              transition={{ 
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 2
              }}
            >
              <img
                src={book.cover_url}
                alt={book.title}
                className="w-full h-full object-cover rounded-md shadow-lg"
              />
            </motion.div>
          ))}
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
                <BookOpen className="w-4 h-4 mr-2" />
                Discover Inspiring Stories
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="relative inline-block">
                <span className="relative z-10">Books by <span className="text-[#FF9E1B]">Ciara</span></span>
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
              Inspiring stories of resilience, courage, and embracing what makes us unique.
            </motion.p>
            
            {/* Book Count */}
            <motion.div 
              className="flex justify-center items-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-[#FF9E1B]" />
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-white">{books.length}</div>
                <div className="text-sm text-white/70">Published Books</div>
              </div>
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

      {/* ENHANCED LATEST RELEASE SECTION */}
      {latestBook && (
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
                  <Award className="w-4 h-4 inline mr-2 text-[#FF9E1B]" />
                  Latest Release
                </motion.span>
              </div>
              
              <h2 className="text-4xl font-bold text-[#0A2240] mb-4 relative inline-block">
                {latestBook.title}
                <motion.div 
                  className="absolute -bottom-2 left-0 w-full h-2 bg-[#FF9E1B] rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                />
              </h2>
              <p className="text-xl text-[#0A2240]/70 max-w-3xl mx-auto mt-4">
                Explore Ciara's newest publication, available for pre-order now.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Book Cover Column */}
              <motion.div
                className="lg:col-span-5 relative perspective-[1000px]"
                variants={fadeInRight}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
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
                
                {/* Book cover with 3D effect */}
                <motion.div
                  className="relative transform hover:rotate-y-5 transition-all duration-700 mx-auto max-w-md"
                  whileHover={{ scale: 1.05 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Main book cover */}
                  <div className="relative aspect-[2/3] overflow-hidden rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
                    <img
                      src={latestBook.cover_url}
                      alt={latestBook.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Release badge */}
                    <div className="absolute top-6 right-6 bg-[#FF9E1B] text-[#0A2240] px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                      New Release
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
                  
                  {/* Rating badge */}
                  <motion.div
                    className="absolute -left-5 top-1/3 bg-white rounded-xl py-2 px-3 shadow-xl border border-[#E1E5EB] z-20 flex items-center gap-2"
                    initial={{ opacity: 0, x: -20, rotate: -5 }}
                    whileInView={{ opacity: 1, x: 0, rotate: -5 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Star className="w-5 h-5 text-[#FF9E1B] fill-[#FF9E1B]" />
                    <span className="text-sm font-medium text-[#0A2240]">
                      {latestBook.rating} Rating
                    </span>
                  </motion.div>
                  
                  {/* Pages badge */}
                  <motion.div
                    className="absolute -right-5 bottom-1/3 bg-white rounded-xl py-2 px-3 shadow-xl border border-[#E1E5EB] z-20 flex items-center gap-2"
                    initial={{ opacity: 0, x: 20, rotate: 5 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 5 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, duration: 0.6 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <FileText className="w-5 h-5 text-[#00B2A9]" />
                    <span className="text-sm font-medium text-[#0A2240]">
                      {latestBook.pages} Pages
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>
              
              {/* Content Column */}
              <motion.div 
                className="lg:col-span-7"
                variants={fadeInLeft}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="px-3 py-1 rounded-full bg-[#0A2240]/5 text-xs font-medium text-[#0A2240]">
                    {typeof latestBook.categories === 'string' ? latestBook.categories : 'Memoir'}
                  </div>
                  <div className="text-[#0A2240]/60 text-sm flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#FF9E1B]" />
                    {new Date(latestBook.release_date).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                </div>
                
                <p className="text-[#0A2240]/80 text-lg mb-8 leading-relaxed">
                  {latestBook.description}
                </p>
                
                {/* Book details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-[#0A2240]/70">
                  <div className="flex items-start gap-2">
                    <BookOpen className="w-5 h-5 text-[#FF9E1B] mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-[#0A2240]">Author</div>
                      <div>{latestBook.author || "Ciara"}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="w-5 h-5 text-[#FF9E1B] mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-[#0A2240]">Publisher</div>
                      <div>{latestBook.publisher || "Daring Different Publishing"}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <BookMarked className="w-5 h-5 text-[#FF9E1B] mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-[#0A2240]">ISBN</div>
                      <div>{latestBook.isbn || "978-1-234-56789-0"}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-[#FF9E1B] mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-[#0A2240]">Rating</div>
                      <div>{latestBook.rating} / 5</div>
                    </div>
                  </div>
                </div>
                
                {/* Price and CTA */}
                <div className="flex flex-wrap items-center gap-6">
                  <div className="text-3xl font-bold text-[#0A2240]">
                    ${latestBook.price}
                  </div>
                  
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
                    <motion.button
                      onClick={() => {
                        setSelectedBook(latestBook);
                        setShowWaitlistModal(true);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative px-8 py-4 font-bold text-[#0A2240] bg-[#FF9E1B] rounded-full
                                flex items-center gap-2 shadow-lg transform transition-all z-10"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>Join Waitlist</span>
                    </motion.button>
                  </motion.div>
                  
                  <motion.button
                    onClick={() => {
                      setSelectedBook(latestBook);
                      setShowBookDetails(true);
                    }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,0,0,0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 font-medium text-[#0A2240] border border-[#0A2240]/20 rounded-full
                              flex items-center gap-2 hover:bg-[#0A2240]/5
                              transform transition-all"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {/* ENHANCED BOOKS GRID SECTION */}
      {otherBooks.length > 0 && (
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
              <div className="inline-block mb-3">
                <motion.span 
                  className="inline-block py-1.5 px-4 rounded-full text-sm font-medium bg-[#0A2240]/5 text-[#0A2240]"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <BookOpen className="w-4 h-4 inline mr-2 text-[#FF9E1B]" />
                  Available Publications
                </motion.span>
              </div>
              
              <h2 className="text-4xl font-bold text-[#0A2240] mb-4 relative inline-block">
                More Books
                <motion.div 
                  className="absolute -bottom-2 left-0 w-full h-2 bg-[#FF9E1B] rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                />
              </h2>
              <p className="text-xl text-[#0A2240]/70 max-w-3xl mt-4">
                Discover Ciara's collection of inspirational books on resilience and personal growth.
              </p>
            </motion.div>
            
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {otherBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  variants={fadeInUp}
                  whileHover={{ y: -15, scale: 1.02 }}
                  className="group relative perspective-[1000px]"
                >
                  <motion.div
                    className="relative h-full bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl
                            transition-all duration-500 transform group-hover:rotate-y-3"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Book cover image */}
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img
                        src={book.cover_url}
                        alt={book.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      {/* Rating */}
                      <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-[#0A2240] px-3 py-1 rounded-full text-sm font-medium shadow-lg flex items-center gap-1">
                        <Star className="w-4 h-4 text-[#FF9E1B] fill-[#FF9E1B]" />
                        {book.rating}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-[#0A2240] mb-4">
                        {book.title}
                      </h3>
                      
                      <p className="text-[#0A2240]/70 mb-6 line-clamp-3">
                        {book.description}
                      </p>
                      
                      <div className="mt-auto flex justify-between items-center">
                        <div className="text-2xl font-bold text-[#0A2240]">
                          ${book.price}
                        </div>
                        
                        <motion.button
                          onClick={() => {
                            setSelectedBook(book);
                            setShowBookDetails(true);
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 rounded-full text-[#0A2240] border border-[#0A2240]/20
                                    flex items-center gap-1 hover:bg-[#0A2240]/5 transition-colors"
                        >
                          <span>Details</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                      
                      {/* Purchase button */}
                      <div className="mt-4">
                        <motion.button
                          onClick={() => setSelectedBook(book)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-3 bg-[#0A2240] text-white rounded-full
                                    flex items-center justify-center gap-2 shadow-lg"
                        >
                          <ShoppingCart className="w-5 h-5" />
                          <span>Purchase</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Pages badge */}
                  <motion.div
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-full px-4 py-1 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    initial={{ y: 10 }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                  >
                    <FileText className="w-4 h-4 text-[#0A2240]" />
                    <span className="text-xs font-medium text-[#0A2240]">
                      {book.pages} pages
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* ENHANCED WAITLIST MODAL */}
      <AnimatePresence>
        {showWaitlistModal && selectedBook && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop with blur */}
            <motion.div 
              className="absolute inset-0 bg-[#0A2240]/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWaitlistModal(false)}
            />
            
            <motion.div
              className="relative max-w-md w-full mx-4 overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, type: "spring" }}
            >
              {/* Glass morphism card */}
              <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
                {/* Close button */}
                <motion.button
                  onClick={() => setShowWaitlistModal(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0A2240]/5 flex items-center justify-center text-[#0A2240]/70 hover:bg-[#0A2240]/10 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
                
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto bg-[#FF9E1B]/10 rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-8 h-8 text-[#FF9E1B]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0A2240] mb-2">
                    Join the Waitlist
                  </h2>
                  <p className="text-[#0A2240]/70">
                    Enter your email to be notified when "{selectedBook.title}" becomes available.
                  </p>
                </div>
                
                <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#0A2240]/70 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-[#0A2240]/10 focus:border-[#FF9E1B] focus:ring-2 focus:ring-[#FF9E1B]/20 focus:outline-none transition-all"
                      />
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#0A2240]/30" />
                    </div>
                  </div>
                  
                  <motion.div
                    className="group relative mt-2"
                    whileHover="hover"
                  >
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-[#FF9E1B] blur-md opacity-0 group-hover:opacity-70 transition-all duration-300"
                      variants={{
                        hover: { scale: 1.05 }
                      }}
                    />
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative w-full py-3 rounded-lg bg-[#FF9E1B] text-[#0A2240] font-bold
                                shadow-md hover:shadow-lg transform transition-all z-10
                                flex items-center justify-center gap-2"
                    >
                      {submitting ? 'Submitting...' : 'Join Waitlist'}
                    </motion.button>
                  </motion.div>
                </form>
                
                {waitlistMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-3 rounded-lg bg-green-50 border border-green-100 text-green-700 text-center"
                  >
                    {waitlistMessage}
                  </motion.div>
                )}
                
                <div className="mt-6 text-center text-xs text-[#0A2240]/50">
                  We'll only use your email to notify you about this book.
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOOK DETAILS MODAL */}
      <AnimatePresence>
        {showBookDetails && selectedBook && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop with blur */}
            <motion.div 
              className="absolute inset-0 bg-[#0A2240]/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBookDetails(false)}
            />
            
            <motion.div
              className="relative max-w-4xl w-full mx-4 overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, type: "spring" }}
            >
              {/* Glass morphism card */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
                {/* Close button */}
                <motion.button
                  onClick={() => setShowBookDetails(false)}
                  className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#0A2240]/70 hover:bg-white transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
                
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Book cover side */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A2240] to-[#0A2240]/80 z-0" />
                    
                    <div className="relative z-10 p-10 flex flex-col items-center justify-center h-full">
                      <motion.div
                        className="w-64 mx-auto perspective-[1000px]"
                        whileHover={{ scale: 1.05 }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <motion.div
                          className="relative rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                          animate={{ rotateY: [-5, 5, -5] }}
                          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <img 
                            src={selectedBook.cover_url}
                            alt={selectedBook.title}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      </motion.div>
                      
                      <div className="mt-8 text-white text-center">
                        <div className="flex items-center justify-center gap-4 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 text-[#FF9E1B] fill-[#FF9E1B]" />
                            <span className="font-bold">{selectedBook.rating}</span>
                          </div>
                          <div className="w-1 h-1 rounded-full bg-white/50" />
                          <div>{selectedBook.pages} pages</div>
                        </div>
                        
                        <div className="text-2xl font-bold mb-4">
                          ${selectedBook.price}
                        </div>
                        
                        <motion.button
                          onClick={() => {
                            setShowBookDetails(false);
                            if (selectedBook === latestBook) {
                              setShowWaitlistModal(true);
                            }
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-3 bg-[#FF9E1B] text-[#0A2240] rounded-full font-bold
                                    flex items-center justify-center gap-2 shadow-lg mx-auto"
                        >
                          <ShoppingCart className="w-5 h-5" />
                          <span>{selectedBook === latestBook ? 'Join Waitlist' : 'Purchase Now'}</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Book details side */}
                  <div className="p-10 bg-white overflow-y-auto max-h-[80vh]">
                    <div className="mb-2 text-[#FF9E1B] font-medium">
                      {typeof selectedBook.categories === 'string' ? selectedBook.categories : 'Personal Growth'}
                    </div>
                    
                    <h2 className="text-3xl font-bold text-[#0A2240] mb-4">
                      {selectedBook.title}
                    </h2>
                    
                    <div className="text-[#0A2240]/60 mb-6 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#0A2240]/40" />
                      Released: {new Date(selectedBook.release_date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                    
                    <div className="text-[#0A2240]/80 mb-8 leading-relaxed">
                      {selectedBook.description}
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-[#0A2240] mb-2">Book Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-start gap-2">
                            <BookOpen className="w-5 h-5 text-[#FF9E1B] mt-0.5" />
                            <div>
                              <div className="text-sm font-medium text-[#0A2240]">Author</div>
                              <div className="text-[#0A2240]/70">{selectedBook.author || "Ciara"}</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <FileText className="w-5 h-5 text-[#FF9E1B] mt-0.5" />
                            <div>
                              <div className="text-sm font-medium text-[#0A2240]">Publisher</div>
                              <div className="text-[#0A2240]/70">{selectedBook.publisher || "Daring Different Publishing"}</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <BookMarked className="w-5 h-5 text-[#FF9E1B] mt-0.5" />
                            <div>
                              <div className="text-sm font-medium text-[#0A2240]">ISBN</div>
                              <div className="text-[#0A2240]/70">{selectedBook.isbn || "978-1-234-56789-0"}</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Clock className="w-5 h-5 text-[#FF9E1B] mt-0.5" />
                            <div>
                              <div className="text-sm font-medium text-[#0A2240]">Pages</div>
                              <div className="text-[#0A2240]/70">{selectedBook.pages}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-bold text-[#0A2240] mb-2">What Readers Say</h3>
                        <div className="bg-[#F7F9FC] rounded-xl p-4">
                          <div className="flex items-center mb-2">
                            {Array.from({ length: Math.floor(selectedBook.rating) }).map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-[#FF9E1B] fill-[#FF9E1B]" />
                            ))}
                            {selectedBook.rating % 1 > 0 && (
                              <div className="relative w-5 h-5 overflow-hidden">
                                <Star className="absolute w-5 h-5 text-[#FF9E1B] fill-[#FF9E1B]" style={{ clipPath: `inset(0 ${100 - (selectedBook.rating % 1) * 100}% 0 0)` }} />
                                <Star className="absolute w-5 h-5 text-[#E1E5EB]" />
                              </div>
                            )}
                            {Array.from({ length: 5 - Math.ceil(selectedBook.rating) }).map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-[#E1E5EB]" />
                            ))}
                            <span className="ml-2 text-[#0A2240] font-bold">{selectedBook.rating}</span>
                            <span className="ml-1 text-[#0A2240]/60">/ 5</span>
                          </div>
                          <p className="text-[#0A2240]/70 italic">
                            "A powerful and inspiring read that stays with you long after the final page."
                          </p>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <motion.button
                          onClick={() => {
                            setShowBookDetails(false);
                            if (selectedBook === latestBook) {
                              setShowWaitlistModal(true);
                            }
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-3 bg-[#0A2240] text-white rounded-lg font-bold
                                    flex items-center justify-center gap-2 shadow-lg"
                        >
                          <ShoppingCart className="w-5 h-5" />
                          <span>{selectedBook === latestBook ? 'Join Waitlist' : 'Purchase Book'}</span>
                        </motion.button>
                      </div>
                    </div>
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

export default Books;