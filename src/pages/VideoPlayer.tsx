// VideoPlayer.tsx
import React, { useState, useEffect, FormEvent } from 'react';
import ReactPlayer from 'react-player';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Episode {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  likes: number;
  published_at: string;
}

interface Comment {
  id: string;
  episode_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

// Color palette (from your Home page)
const colors = {
  primary: '#F2245F',   // Pinkish-red
  secondary: '#FBB03B', // Vibrant orange
  accent: '#F52B62',    // Darker pink-red
  navy: '#01576E',      // Darker teal/navy
  white: '#FFFFFF',
};

// Motion variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

// Helper to generate an anonymous name for commenting
const generateAnonymousName = (): string => {
  const names = ['Kay', 'Max', 'Leo', 'Sam', 'Rae', 'Ash', 'Sky'];
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomNumber = Math.floor(Math.random() * 90) + 10;
  return randomName + randomNumber;
};

// Comments Component (displayed in the right pane)
const Comments: React.FC<{ episodeId: string }> = ({ episodeId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [anonymousName, setAnonymousName] = useState<string>('');

  useEffect(() => {
    let name = localStorage.getItem('anonymousName');
    if (!name) {
      name = generateAnonymousName();
      localStorage.setItem('anonymousName', name);
    }
    setAnonymousName(name);
  }, []);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('episode_id', episodeId)
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching comments:', error);
      setErrorMsg('Failed to load comments.');
    } else {
      setComments(data);
      setErrorMsg('');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episodeId]);

  const handleAddComment = async (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const user_id = anonymousName;
    const { error } = await supabase
      .from('comments')
      .insert([{ episode_id, user_id, content: newComment }]);
    if (error) {
      console.error('Error adding comment:', error);
      setErrorMsg('Unable to post comment.');
    } else {
      setNewComment('');
      setErrorMsg('');
      fetchComments();
    }
  };

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6"
      variants={fadeInUp}
      initial="initial"
      animate="animate"
    >
      <h3 className="font-bold text-2xl mb-4" style={{ color: colors.navy }}>
        Comments
      </h3>
      {loading ? (
        <div className="text-gray-500">Loading comments...</div>
      ) : errorMsg ? (
        <div className="text-red-500">{errorMsg}</div>
      ) : (
        <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <motion.div
                key={comment.id}
                className="p-4 rounded-xl border border-gray-200 shadow-sm transition hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-gray-800">{comment.content}</p>
                <span className="text-xs text-gray-500">
                  {comment.user_id} | {new Date(comment.created_at).toLocaleString()}
                </span>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>
      )}
      <form onSubmit={handleAddComment} className="mt-4">
        <textarea
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#01576E] transition"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05, rotateX: 5 }}
          whileTap={{ scale: 0.95, rotateX: 0 }}
          className="mt-3 w-full py-3 bg-[#01576E] text-white rounded-xl shadow-lg hover:bg-[#01576E] transition transform"
        >
          Submit
        </motion.button>
      </form>
    </motion.div>
  );
};

const VideoPlayer: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [activeEpisode, setActiveEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [likeUpdating, setLikeUpdating] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);

  const fetchEpisodes = async () => {
    const { data, error } = await supabase
      .from('podcast_episodes')
      .select('*')
      .order('published_at', { ascending: false });
    if (error) {
      console.error('Error fetching episodes:', error);
    } else if (data && data.length > 0) {
      setEpisodes(data);
      setActiveEpisode(data[0]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEpisodes();
  }, []);

  // When activeEpisode changes, check localStorage for like state.
  useEffect(() => {
    if (activeEpisode) {
      const isLiked = localStorage.getItem(`liked_${activeEpisode.id}`) === 'true';
      setLiked(isLiked);
    }
  }, [activeEpisode]);

  // Toggle like count for the active episode with optimistic UI updates.
  const toggleLike = async () => {
    if (!activeEpisode) return;
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
    const { data, error } = await supabase
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
    setLikeUpdating(false);
  };

  const handleShare = async () => {
    if (!activeEpisode) return;
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: activeEpisode.title,
          text: activeEpisode.description,
          url: shareUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard');
    }
  };

  if (loading || !activeEpisode) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4" style={{ marginTop: '1in' }}>
      {/* Wave Accent at the Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
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

      {/* Back to Podcast Home Button */}
      <div className="mb-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Link
            to="/podcast"
            className="px-6 py-3 rounded-full font-bold text-white shadow-lg"
            style={{
              background: 'linear-gradient(to right, #014356, #01576E, #017e99)',
            }}
          >
            Back to Podcast Home
          </Link>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto bg-white/85 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Column: Video Player, Details & Other Episodes */}
          <div className="w-full md:w-2/3 p-8">
            <motion.div
              className="relative pb-[56.25%] mb-8 rounded-2xl overflow-hidden shadow-xl"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <ReactPlayer
                url={activeEpisode.video_url}
                controls
                width="100%"
                height="100%"
                className="absolute top-0 left-0"
              />
            </motion.div>
            <motion.div variants={fadeInUp} className="mb-6">
              <h2 className="text-3xl font-bold mb-3" style={{ color: colors.navy }}>
                {activeEpisode.title}
              </h2>
              <p className="text-gray-700">{activeEpisode.description}</p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="flex items-center space-x-8 mb-8"
            >
              <button
                className={`flex items-center space-x-2 focus:outline-none transition ${
                  liked ? 'text-primary' : 'hover:text-primary'
                }`}
                onClick={toggleLike}
                disabled={likeUpdating}
              >
                <Heart
                  className="w-7 h-7"
                  style={{ fill: liked ? colors.primary : 'none' }}
                />
                <span className="text-2xl">{activeEpisode.likes}</span>
              </button>
              <button
                className="flex items-center space-x-2 focus:outline-none hover:text-primary transition"
                onClick={handleShare}
              >
                <Share2 className="w-7 h-7" />
                <span className="text-2xl">Share</span>
              </button>
            </motion.div>
            {/* Other Episodes Section */}
            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl font-semibold mb-4" style={{ color: colors.navy }}>
                Other Episodes
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {episodes.map((episode) => (
                  <motion.div
                    key={episode.id}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setActiveEpisode(episode)}
                    className={`cursor-pointer p-4 rounded-lg border transition ${
                      episode.id === activeEpisode.id ? 'border-primary' : 'border-gray-200'
                    } hover:shadow-xl`}
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={episode.thumbnail_url}
                        alt={episode.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-bold text-lg" style={{ color: colors.navy }}>
                          {episode.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {episode.published_at &&
                            new Date(episode.published_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          {/* Right Column: Comments */}
          <div className="w-full md:w-1/3 p-8 border-t md:border-t-0 md:border-l border-gray-200">
            <Comments episodeId={activeEpisode.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
