// Podcast.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlayCircle,
  Clock,
  MessageCircle,
  Lock,
  Star,
  Share2,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

// Primary color palette
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
}

const Podcast: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

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
        setEpisodes(data);
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

  // (Optional) Auto-cycle testimonials in a mini slideshow if desired
  // const slideRef = useRef();
  // ...

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* HERO SECTION */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-b from-white to-[#01576E]/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Image & Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#01576E]/90 to-[#FFFFFF]/70" />
          <img
            src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Podcast background"
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
              Daring Different Podcast
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Join Ciara for inspiring conversations about resilience, disability awareness, and embracing uniqueness.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/subscribe"
                className="bg-[#01576E] hover:bg-[#01576E]/90 text-white px-8 py-3 rounded-full inline-flex items-center space-x-2 transition-colors shadow-lg"
              >
                <Lock className="w-5 h-5" />
                <span>Subscribe for Full Access</span>
              </Link>
              <button
                onClick={() => featuredEpisode && handlePlayEpisode(featuredEpisode)}
                className="bg-[#01576E]/10 hover:bg-[#01576E] backdrop-blur-sm text-white px-8 py-3 rounded-full inline-flex items-center space-x-2 transition-colors shadow-lg"
              >
                <PlayCircle className="w-5 h-5" />
                <span>Latest Episode</span>
              </button>
            </div>
          </motion.div>
        </div>
        {/* Wave Accent at Bottom */}
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

      {/* FEATURED EPISODE SECTION */}
      {featuredEpisode && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#01576E] to-[#01576E]/90 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Text Column */}
                <div className="p-8 lg:p-12 flex flex-col justify-center text-white">
                  <h2 className="text-3xl font-bold mb-4">Featured Episode</h2>
                  <h3 className="text-2xl mb-4">{featuredEpisode.title}</h3>
                  <p className="text-gray-200 mb-6">{featuredEpisode.description}</p>
                  <div className="flex items-center space-x-4 mb-6">
                    <span className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-2" />
                      {featuredEpisode.duration}
                    </span>
                    <span className="flex items-center text-sm">
                      <Star className="w-4 h-4 mr-2" />
                      {featuredEpisode.rating}
                    </span>
                  </div>
                  <button
                    onClick={() => handlePlayEpisode(featuredEpisode)}
                    className="bg-white text-[#01576E] hover:bg-white/90 px-6 py-3 rounded-full inline-flex items-center space-x-2 transition-colors shadow-lg"
                  >
                    <PlayCircle className="w-5 h-5" />
                    <span>Play Episode</span>
                  </button>
                </div>
                {/* Image Column */}
                <div className="relative h-64 lg:h-80">
                  <img
                    src={featuredEpisode.thumbnail_url}
                    alt={featuredEpisode.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* EPISODE LIST SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={fadeInUp}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="text-2xl font-semibold" style={{ color: colors.navy }}>
              More Episodes
            </h3>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {episodes.map((episode) => (
              <motion.div
                key={episode.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transition"
              >
                <div className="relative aspect-video">
                  <img
                    src={episode.thumbnail_url}
                    alt={episode.title}
                    className="w-full h-full object-cover"
                  />
                  {episode.is_premium && (
                    <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm flex items-center">
                      <Lock className="w-4 h-4 mr-1" />
                      <span>Premium</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold" style={{ color: colors.navy, marginBottom: '0.5rem' }}>
                    {episode.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{episode.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {episode.duration}
                      </span>
                      <span className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {episode.comments_count || 0}
                      </span>
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        {episode.rating}
                      </span>
                    </div>
                    <button className="text-secondary hover:text-secondary/80 transition">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                  <button
                    onClick={() => handlePlayEpisode(episode)}
                    className={`w-full ${
                      episode.is_premium
                        ? 'bg-gray-100 text-gray-500'
                        : 'bg-[#01576E] text-white hover:bg-[#01576E]/90'
                    } py-2 rounded-full inline-flex items-center justify-center space-x-2 transition-colors shadow-md`}
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
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBSCRIBE CTA SECTION */}
    <section className="py-24 bg-gradient-to-r from-[#01576E] to-[#01576E]/90 text-white relative overflow-hidden">
      {/* Decorative Wave Accent at the Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="block w-full h-24"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M321.39,56.4C203.44,74,85.82,95.81,0,109.79V120H1200V0C1100.76,24.36,957.56,62.08,777.48,49.2C608.88,37.29,482.84,15.69,321.39,56.4Z"
            fill="#FBB03B"
            fillOpacity="0.15"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl mx-auto bg-white/20 backdrop-blur-md rounded-2xl p-10 shadow-xl"
        >
          <h2 className="text-4xl font-bold mb-6" style={{ color: '#FFFFFF' }}>
            Unlock Premium Content
          </h2>
          <p className="text-xl mb-8" style={{ color: '#FFFFFF' }}>
            Subscribe to access all episodes, exclusive content, and join our community of listeners.
          </p>
          <Link
            to="/subscribe"
            className="bg-[#FBB03B] hover:bg-[#FBB03B]/90 text-white px-8 py-3 rounded-full inline-flex items-center space-x-2 transition-colors shadow-lg"
          >
            <Lock className="w-5 h-5" />
            <span>Subscribe Now - $10/month</span>
          </Link>
        </motion.div>
      </div>
    </section>
    </div>
  );
};

export default Podcast;
