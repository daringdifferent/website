// VideoPlayer.tsx
import React, { useState, useEffect, FormEvent, useRef } from 'react';
import ReactPlayer from 'react-player';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import {
  Heart,
  Share2,
  ChevronLeft,
  MessageCircle,
  Clock,
  Calendar,
  PlayCircle,
  Bookmark,
  ThumbsUp,
  Download,
  SendHorizontal,
  User,
  Star,
  Play,
  Pause,
  Volume2,
  SkipForward,
  SkipBack,
  Users,
  Lock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/AuthContext';

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
  category?: string;
}

interface Comment {
  id: string;
  episode_id: string;
  user_id: string;
  content: string;
  created_at: string;
  profile?: {
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
  };
}

interface Profile {
  id: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
}

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

// Helper to generate an anonymous name for commenting
const generateAnonymousName = (): string => {
  const names = ['Kay', 'Max', 'Leo', 'Sam', 'Rae', 'Ash', 'Sky'];
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomNumber = Math.floor(Math.random() * 90) + 10;
  return randomName + randomNumber;
};

// Format time helper
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Enhanced Player Controls Component
const PlayerControls: React.FC<{
  playing: boolean;
  onPlayPause: () => void;
  onForward: () => void;
  onBackward: () => void;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  buffering: boolean;
}> = ({
  playing,
  onPlayPause,
  onForward,
  onBackward,
  currentTime,
  duration,
  onSeek,
  volume,
  onVolumeChange,
  buffering
}) => {
    return (
      <div className="bg-white/10 backdrop-blur-md py-3 px-4 rounded-xl">
        {/* Progress bar */}
        <div className="relative h-2 bg-white/20 rounded-full mb-4 cursor-pointer"
          onClick={(e) => {
            const bounds = e.currentTarget.getBoundingClientRect();
            const percent = (e.clientX - bounds.left) / bounds.width;
            onSeek(percent * duration);
          }}>
          <motion.div
            className="absolute h-full bg-gradient-to-r from-[#FF9E1B] to-[#00B2A9] rounded-full"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
          <motion.div
            className="absolute h-4 w-4 bg-white rounded-full -mt-1 shadow-md"
            style={{ left: `calc(${(currentTime / duration) * 100}% - 8px)` }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-white/80 text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white/80 hover:text-white transition-colors"
              onClick={onBackward}
            >
              <SkipBack className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white/20 hover:bg-white/30 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              onClick={onPlayPause}
            >
              {buffering ? (
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : playing ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white/80 hover:text-white transition-colors"
              onClick={onForward}
            >
              <SkipForward className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="flex items-center gap-2 w-32">
            <Volume2 className="w-4 h-4 text-white/80" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #FF9E1B 0%, #FF9E1B ${volume * 100}%, rgba(255, 255, 255, 0.2) ${volume * 100}%, rgba(255, 255, 255, 0.2) 100%)`
              }}
            />
          </div>
        </div>
      </div>
    );
  };

// Fixed Comments Component for UUID-type user_id column
const Comments: React.FC<{ episodeId: string }> = ({ episodeId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const commentsContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useAuth();

  // Fetch comments
  const fetchComments = async () => {
    setLoading(true);
    try {
      console.log('Fetching comments for episode:', episodeId);

      // Simple query
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('episode_id', episodeId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching comments:', error);
        setErrorMsg('Failed to load comments. Error: ' + error.message);
      } else {
        console.log('Comments loaded successfully:', data);
        setComments(data || []);
        setErrorMsg('');
      }
    } catch (err) {
      console.error('Error in fetchComments:', err);
      setErrorMsg('Failed to load comments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episodeId]);

  // Get display name for a comment - handle both UUID and string user_id values
  const getDisplayName = (comment) => {
    // Since some user_id values might be UUIDs and some might be strings
    // we need to handle both cases

    // If it looks like a UUID (long string with hyphens), try to extract a name from elsewhere
    if (comment.user_id &&
      (comment.user_id.length > 20 || comment.user_id.includes('-'))) {
      // Try to extract from email if available
      if (user && user.id === comment.user_id && user.email) {
        return user.email.split('@')[0];
      }
      // Fallback for UUID-based comments
      return 'User';
    }

    // Otherwise, assume it's already a username string
    return comment.user_id || 'Anonymous';
  };

  // Add a new comment
  const handleAddComment = async (e?: FormEvent) => {
    if (e) e.preventDefault();

    if (!newComment.trim()) return;
    if (submitting) return;
    if (!user) {
      setErrorMsg('You must be signed in to comment.');
      return;
    }

    setSubmitting(true);

    try {
      // Create a timestamp for the comment
      const now = new Date().toISOString();

      // IMPORTANT FIX: Use the actual UUID from the authenticated user
      console.log('Attempting to insert comment with data:', {
        episode_id: episodeId,
        user_id: user.id, // This is a UUID from Supabase auth
        content: newComment.trim(),
        created_at: now
      });

      const { error, data } = await supabase
        .from('comments')
        .insert([{
          episode_id: episodeId,
          user_id: user.id, // Use the UUID, not email or username
          content: newComment.trim(),
          created_at: now
        }])
        .select();

      if (error) {
        console.error('Error adding comment:', error);
        setErrorMsg('Unable to post comment. Database error: ' + error.message);
      } else {
        console.log('Comment added successfully:', data);
        // Clear the input and error message
        setNewComment('');
        setErrorMsg('');

        // Add the new comment to the current list
        if (data && data.length > 0) {
          setComments(prevComments => [data[0], ...prevComments]);
        } else {
          // If we didn't get the data back from the insert, refetch
          await fetchComments();
        }

        // Scroll to top of comments
        if (commentsContainerRef.current) {
          commentsContainerRef.current.scrollTop = 0;
        }

        // Focus back on the textarea
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }
    } catch (err) {
      console.error('Error in handleAddComment:', err);
      setErrorMsg('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Enter key to send comment (but allow Shift+Enter for new lines)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default to avoid newline
      handleAddComment();
    }
  };

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10 h-full flex flex-col"
      variants={fadeInLeft}
      initial="initial"
      animate="animate"
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-2xl text-white">
          Comments
        </h3>
        <div className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm flex items-center gap-1.5">
          <MessageCircle className="w-3.5 h-3.5" />
          <span>{comments.length}</span>
        </div>
      </div>

      {loading ? (
        <div className="flex-grow flex items-center justify-center">
          <motion.div
            className="w-8 h-8 border-2 border-[#FF9E1B] border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      ) : errorMsg ? (
        <div className="text-[#F15A5A] bg-[#F15A5A]/10 p-4 rounded-lg">
          {errorMsg} <button onClick={fetchComments} className="font-medium underline">Retry</button>
        </div>
      ) : (
        <div
          ref={commentsContainerRef}
          className="space-y-4 overflow-y-auto pr-2 flex-grow mb-4 custom-scrollbar"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255,255,255,0.2) transparent'
          }}
        >
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <motion.div
                key={comment.id || index}
                className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.15)' }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF9E1B] to-[#00B2A9] flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {/* Display first letter of username */}
                    <div className="w-full h-full flex items-center justify-center text-white font-bold">
                      {getDisplayName(comment).charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-white">{getDisplayName(comment)}</p>
                      <p className="text-xs text-white/50">
                        {new Date(comment.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <p className="text-white/90 whitespace-pre-line">{comment.content}</p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-white/50 py-12">
              <MessageCircle className="w-12 h-12 mb-4 opacity-30" />
              <p>No comments yet.</p>
              <p className="text-sm">Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
      )}

      {user ? (
        <form onSubmit={handleAddComment} className="mt-auto">
          <div className="relative">
            <textarea
              ref={textareaRef}
              className="w-full p-4 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:border-[#FF9E1B] transition-colors text-white placeholder:text-white/50"
              placeholder="Add a comment... (Press Enter to send)"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={3}
            />
            <div className="absolute right-3 bottom-3">
              <motion.button
                type="submit"
                disabled={submitting || !newComment.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${submitting || !newComment.trim()
                  ? 'bg-white/20 text-white/50 cursor-not-allowed'
                  : 'bg-[#FF9E1B] text-[#0A2240] cursor-pointer'
                  }`}
              >
                {submitting ? (
                  <motion.div
                    className="w-4 h-4 border-2 border-[#0A2240] border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <SendHorizontal className="w-4 h-4" />
                )}
              </motion.button>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-white/5 rounded-xl p-4 text-white/70 text-center">
          <Lock className="w-5 h-5 mx-auto mb-2 text-[#FF9E1B]" />
          <p>Please sign in to add comments</p>
        </div>
      )}
    </motion.div>
  );
};

const VideoPlayer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [activeEpisode, setActiveEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [likeUpdating, setLikeUpdating] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);

  // Auth related state
  const { user } = useAuth();
  const [fromAuth, setFromAuth] = useState<boolean>(false);

  // Player state
  const [playing, setPlaying] = useState<boolean>(false);
  const [buffering, setBuffering] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.8);
  const playerRef = useRef<ReactPlayer>(null);

  // Scroll animation values
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  const fetchEpisodes = async () => {
    try {
      setLoading(true);
      // Check if we have an episode from location state
      const locationEpisode = location.state?.episode;

      // Fetch all episodes
      const { data, error } = await supabase
        .from('podcast_episodes')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching episodes:', error);
      } else if (data && data.length > 0) {
        // Process the episodes to add any missing properties
        const processedData = data.map(episode => ({
          ...episode,
          duration: episode.duration || '45 mins',
          rating: episode.rating || (4 + Math.random()).toFixed(1),
          comments_count: episode.comments_count || Math.floor(Math.random() * 50) + 5,
          category: episode.category || ["Inspiration", "Disability Awareness", "Personal Growth"][Math.floor(Math.random() * 3)],
          is_premium: episode.is_premium !== undefined ? episode.is_premium : true // Set all episodes as premium by default
        }));

        setEpisodes(processedData);

        // Set active episode from location state or first episode
        if (locationEpisode) {
          setActiveEpisode(locationEpisode);
        } else {
          setActiveEpisode(processedData[0]);
        }
      }
    } catch (err) {
      console.error('Error in fetchEpisodes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodes();

    // Check if user is coming from auth flow
    if (location.state?.fromAuth) {
      setFromAuth(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When activeEpisode changes, check localStorage for like state.
  useEffect(() => {
    if (activeEpisode) {
      const isLiked = localStorage.getItem(`liked_${activeEpisode.id}`) === 'true';
      setLiked(isLiked);
    }
  }, [activeEpisode]);

  // Log when user accesses video content
  useEffect(() => {
    if (user && activeEpisode) {
      console.log(`User ${user.email} accessed video: ${activeEpisode.id}`);
    }
  }, [user, activeEpisode]);

  // Clear fromAuth state after 5 seconds
  useEffect(() => {
    if (fromAuth) {
      const timer = setTimeout(() => {
        setFromAuth(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [fromAuth]);

  // Toggle like count for the active episode with optimistic UI updates.
  const toggleLike = async () => {
    if (!activeEpisode || likeUpdating) return;

    const currentlyLiked = liked;
    const currentLikes = activeEpisode.likes || 0;
    const newLikes = currentlyLiked ? currentLikes - 1 : currentLikes + 1;

    // Optimistically update UI
    setActiveEpisode({ ...activeEpisode, likes: newLikes });
    setEpisodes((prev) =>
      prev.map((ep) => (ep.id === activeEpisode.id ? { ...ep, likes: newLikes } : ep))
    );
    localStorage.setItem(`liked_${activeEpisode.id}`, (!currentlyLiked).toString());
    setLiked(!currentlyLiked);

    setLikeUpdating(true);
    try {
      const { error } = await supabase
        .from('podcast_episodes')
        .update({ likes: newLikes })
        .eq('id', activeEpisode.id)
        .single();

      if (error) {
        console.error('Error updating like:', error);
        // Rollback optimistic update if needed
        setActiveEpisode({ ...activeEpisode, likes: currentLikes });
        setEpisodes((prev) =>
          prev.map((ep) => (ep.id === activeEpisode.id ? { ...ep, likes: currentLikes } : ep))
        );
        localStorage.setItem(`liked_${activeEpisode.id}`, currentlyLiked.toString());
        setLiked(currentlyLiked);
      }
    } catch (err) {
      console.error('Error in toggleLike:', err);
      // Rollback on error
      setActiveEpisode({ ...activeEpisode, likes: currentLikes });
      setEpisodes((prev) =>
        prev.map((ep) => (ep.id === activeEpisode.id ? { ...ep, likes: currentLikes } : ep))
      );
      localStorage.setItem(`liked_${activeEpisode.id}`, currentlyLiked.toString());
      setLiked(currentlyLiked);
    } finally {
      setLikeUpdating(false);
    }
  };

  const handleShare = async () => {
    if (!activeEpisode) return;
    const shareUrl = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: activeEpisode.title,
          text: activeEpisode.description,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  // Player controls handlers
  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleForward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(currentTime + 15);
    }
  };

  const handleBackward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(Math.max(0, currentTime - 15));
    }
  };

  const handleSeek = (time: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time);
    }
  };

  const handleProgress = (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
    setCurrentTime(state.playedSeconds);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleBuffer = (buffering: boolean) => {
    setBuffering(buffering);
  };

  // Advanced loading screen
  if (loading || !activeEpisode) {
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
                  d="M40 30v40M70 30v40"
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
              Loading Episode
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
    <div className="min-h-screen bg-[#F7F9FC] relative">
      {/* Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#FF9E1B] origin-left z-50"
        style={{ scaleX: smoothScrollProgress }}
      />

      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A2240] to-[#01576E]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDJ2MmgtMnpNNDAgMzRoMnYyaC0yek00NCAzNGgydjJoLTJ6TTM0IDMwaDJ2MmgtMnpNMzQgMjZoMnYyaC0yek0zNCAyMmgydjJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10" />

        {/* Floating elements */}
        <div className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-[#FF9E1B]/10 blur-3xl transform -translate-y-1/2" />
        <div className="absolute bottom-[30%] right-[5%] w-96 h-96 rounded-full bg-[#00B2A9]/10 blur-3xl" />
      </div>

      <div className="w-full mx-auto max-w-7xl px-4 pt-24 pb-16 relative z-10">
        {/* Back to Podcast Home Button */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-8"
        >
          <Link to="/podcast" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Podcast</span>
          </Link>
        </motion.div>

        {/* Success message when returning from auth */}
        <AnimatePresence>
          {fromAuth && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-green-50 border-l-4 border-green-400 p-4 mb-6 rounded-r-lg"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">Thank you for signing in! You now have access to all premium content.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main content column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Video player */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.1 }}
              className="relative overflow-hidden rounded-2xl shadow-2xl border border-white/10 bg-gray-900"
            >


              <div className="aspect-video relative">
                <ReactPlayer
                  ref={playerRef}
                  url={activeEpisode.video_url || "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
                  width="100%"
                  height="100%"
                  playing={playing}
                  volume={volume}
                  onProgress={handleProgress}
                  onDuration={handleDuration}
                  onBuffer={handleBuffer}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  config={{
                    youtube: {
                      playerVars: { showinfo: 0, modestbranding: 1 }
                    }
                  }}
                />
              </div>
              {/* Custom controls overlay */}
              <div className="px-4 pb-4">
                <PlayerControls
                  playing={playing}
                  onPlayPause={handlePlayPause}
                  onForward={handleForward}
                  onBackward={handleBackward}
                  currentTime={currentTime}
                  duration={duration}
                  onSeek={handleSeek}
                  volume={volume}
                  onVolumeChange={setVolume}
                  buffering={buffering}
                />
              </div>
            </motion.div>

            {/* Episode details */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-1 rounded-full bg-[#FF9E1B]/20 text-[#FF9E1B] text-sm font-medium">
                  {activeEpisode.category || "Disability Awareness"}
                </div>
                <div className="text-white/60 text-sm flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(activeEpisode.published_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                {activeEpisode.is_premium && (
                  <div className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#FF9E1B]" />
                    <span>Premium Content</span>
                  </div>
                )}
              </div>

              <h1 className="text-3xl font-bold text-white mb-4">
                {activeEpisode.title}
              </h1>

              <p className="text-white/80 mb-6 leading-relaxed">
                {activeEpisode.description}
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap items-center justify-between gap-6 mt-6 mb-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#FF9E1B]" />
                    </div>
                    <div>
                      <div className="text-white/60 text-xs">Duration</div>
                      <div className="text-white">{activeEpisode.duration}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <Star className="w-5 h-5 text-[#FF9E1B]" />
                    </div>
                    <div>
                      <div className="text-white/60 text-xs">Rating</div>
                      <div className="text-white">{activeEpisode.rating || "4.5"} / 5</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-[#FF9E1B]" />
                    </div>
                    <div>
                      <div className="text-white/60 text-xs">Listeners</div>
                      <div className="text-white">{Math.floor(Math.random() * 5000) + 1000}</div>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleLike}
                    disabled={likeUpdating}
                    className={`w-10 h-10 rounded-full flex items-center justify-center 
                               ${liked ? 'bg-[#FF9E1B]/20 text-[#FF9E1B]' : 'bg-white/10 text-white/80'} 
                               transition-colors`}
                  >
                    <Heart className={`w-5 h-5 ${liked ? 'fill-[#FF9E1B]' : ''}`} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShare}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Likes display */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0A2240] overflow-hidden">
                      <img
                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                        alt="User who liked"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-white/70">
                  <span className="text-white font-medium">{activeEpisode.likes || 0} people</span> liked this episode
                </div>
              </div>
            </motion.div>

            {/* Other Episodes Section */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10"
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-6">
                  More Episodes
                </h3>

                <div className="space-y-4">
                  {episodes.map((episode, index) => (
                    <motion.div
                      key={episode.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                      onClick={() => setActiveEpisode(episode)}
                      className={`cursor-pointer rounded-xl overflow-hidden transition-all duration-300
                                  ${episode.id === activeEpisode.id
                          ? 'bg-[#FF9E1B]/20 border-[#FF9E1B]/40'
                          : 'bg-white/10 hover:bg-white/15 border-white/10'
                        } border`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="relative sm:w-32 aspect-video">
                          <img
                            src={episode.thumbnail_url || `https://images.unsplash.com/photo-${1580000000000 + index}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80`}
                            alt={episode.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${episode.id === activeEpisode.id
                              ? 'bg-[#FF9E1B] text-[#0A2240]'
                              : 'bg-black/40 text-white'
                              }`}>
                              {episode.id === activeEpisode.id ? (
                                <Pause className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4 ml-0.5" />
                              )}
                            </div>
                          </div>

                          {/* Episode number badge */}
                          <div className="absolute top-2 left-2">
                            <div className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded">
                              Ep {episodes.length - index}
                            </div>
                          </div>

                          {/* Premium indicator */}
                          {episode.is_premium && (
                            <div className="absolute top-2 right-2">
                              <div className="w-6 h-6 rounded-full bg-[#FF9E1B] flex items-center justify-center">
                                <Lock className="w-3 h-3 text-[#0A2240]" />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="p-4 sm:p-0 flex-grow">
                          <h4 className={`font-bold text-lg mb-1 line-clamp-1 ${episode.id === activeEpisode.id ? 'text-[#FF9E1B]' : 'text-white'
                            }`}>
                            {episode.title}
                          </h4>
                          <p className="text-white/60 text-sm mb-2">
                            {new Date(episode.published_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                          <p className="text-white/80 text-sm line-clamp-2">
                            {episode.description}
                          </p>
                        </div>

                        <div className="px-4 pb-4 sm:px-4 sm:py-0 flex sm:flex-col items-center gap-4 sm:w-24 sm:justify-center">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-white/60" />
                            <span className="text-white/60 text-xs">{episode.duration}</span>
                          </div>
                          {episode.id !== activeEpisode.id && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-2.5 py-1 bg-white/10 rounded text-white text-xs font-medium"
                            >
                              Play
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Comments column */}
          <div className="lg:col-span-4">
            <Comments episodeId={activeEpisode.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;