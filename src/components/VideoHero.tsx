import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PlayCircle, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const VideoHero = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        setIsMuted(false);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  // Auto-play video when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
          } else if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Video background with parallax effect */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ opacity, scale }}
      >
        <video
          ref={videoRef}
          className="absolute w-full h-full object-cover"
          src="https://drive.google.com/file/d/1NMtdE_LsZGhz6uRKyJzJkmOgdwI9InJ1/preview"
          playsInline
          loop
          muted={isMuted}
        >
          <source src="https://drive.google.com/file/d/1NMtdE_LsZGhz6uRKyJzJkmOgdwI9InJ1/preview" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Video overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A2240]/60 to-[#0A2240]/90" />
      </motion.div>

      {/* Content overlay */}
      <div className="relative h-full flex flex-col justify-center items-center px-4 text-center z-10">
        <motion.div 
          style={{ y: textY }}
          className="max-w-4xl mx-auto"
        >
          {/* Logo animation */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <img
              src="https://drive.google.com/thumbnail?id=1q5EAHNm5ii_9xlcdtycwQZaPTpuj9FRO&sz=w1000"
              alt="Daring Different with Ciara"
              className="w-full max-w-md mx-auto"
            />
          </motion.div>

          {/* Tagline with gradient text */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl font-light mb-12 text-white"
          >
            Join us on an inspiring journey of <span className="bg-gradient-to-r from-[#00A7B5] to-[#FF9E18] bg-clip-text text-transparent font-bold">breaking barriers</span> and <span className="bg-gradient-to-r from-[#FF9E18] to-[#F15B41] bg-clip-text text-transparent font-bold">empowering voices</span>.
          </motion.p>

          {/* Video controls */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.button
              onClick={handlePlay}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-3 rounded-full 
                       bg-gradient-to-r from-[#00A7B5] to-[#0A2240] 
                       text-white font-medium shadow-lg hover:shadow-xl
                       transition-all duration-300"
            >
              <PlayCircle className="w-5 h-5" />
              <span>{isPlaying ? "Pause Trailer" : "Watch Trailer"}</span>
            </motion.button>

            <Link to="/podcast">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-3 rounded-full 
                         bg-white/10 backdrop-blur-md border border-white/30
                         text-white font-medium shadow-lg hover:shadow-xl
                         transition-all duration-300"
              >
                <span>Start Listening</span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-10 h-10 text-white/80" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default VideoHero;