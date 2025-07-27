import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Youtube,
  Instagram,
  Play,
  Headphones,
  BookOpen,
  Heart,
  Calendar,
  Clock,
  Users,
  Star,
  MessageCircle,
  Share2,
  Sparkles,
  Music,
  Radio,
} from "lucide-react";
import { Link } from "react-router-dom";

// Import your Supabase client
import { supabase } from "../lib/supabase"; // adjust the path as needed

// TikTokIcon Component
const TikTokIcon = ({ color = "#000000" }) => {
  return (
    <svg
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="100%"
      height="100%"
    >
      <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
    </svg>
  );
};

// Hubtel-inspired color palette with expanded options
const colors = {
  primary: "#0A2240", // Navy Blue
  primaryDark: "#061830", // Darker Navy
  primaryLight: "#1A3A5A", // Lighter Navy
  secondary: "#FF9E1B", // Orange
  secondaryDark: "#E08000", // Darker Orange
  secondaryLight: "#FFBE5C", // Lighter Orange
  accent: "#00B2A9", // Teal
  accentDark: "#008C84", // Darker Teal
  accentLight: "#3FD5CC", // Lighter Teal
  highlight: "#F15A5A", // Coral Red
  white: "#FFFFFF",
  light: "#F7F9FC",
  gray: "#E1E5EB",
  dark: "#062040",
  gradient: {
    primary: "linear-gradient(135deg, #0A2240 0%, #1A3A5A 100%)",
    secondary: "linear-gradient(135deg, #FF9E1B 0%, #FFBE5C 100%)",
    accent: "linear-gradient(135deg, #00B2A9 0%, #3FD5CC 100%)",
    vibrant: "linear-gradient(135deg, #FF9E1B 0%, #00B2A9 100%)",
    cool: "linear-gradient(135deg, #0A2240 0%, #26c3bbff 100%)",
    hot: "linear-gradient(135deg, #0A2240 0%, #FF9E1B 100%)",
  },
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

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

// Typing animation text variant
const typingContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const typingCharacter = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200,
    },
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
      transition={{
        duration: 20,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
  );
};

// Custom floating icon animation component
const FloatingIcon = ({ icon, delay = 0, scale = 1 }) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-10, 10, -10] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
      className="absolute"
      style={{ scale }}
    >
      {icon}
    </motion.div>
  );
};

// Home component
const Home = () => {
  // Scroll animation values
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
  });

  // Loading state for initial animation
  const [loading, setLoading] = useState(true);

  // Direction state for testimonial carousel
  const [[page, direction], setPage] = useState([0, 0]);

  // Mailing list subscription state
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Details for contact
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [message, setMessage] = useState("");
  const [contactSent, setContactSent] = useState(false);

  // Episodes from Supabase
  const [episodes, setEpisodes] = useState([]);
  const [episodesLoading, setEpisodesLoading] = useState(true);

  // Load transition effect - MODIFIED SECTION
  useEffect(() => {
    // Check if user has already visited the site
    const hasVisited = localStorage.getItem("hasVisitedDaringDifferent");

    if (hasVisited) {
      // Skip loading animation if user has already visited
      setLoading(false);
    } else {
      // For first-time visitors, show animation then set the flag
      setTimeout(() => {
        setLoading(false);
        // Set flag in localStorage to remember this user has visited
        localStorage.setItem("hasVisitedDaringDifferent", "true");
      }, 5200);
    }

    // Fetch episodes from Supabase on mount
    const fetchEpisodes = async () => {
      const { data, error } = await supabase
        .from("podcast_episodes")
        .select("*")
        .order("published_at", { ascending: false })
        .limit(3); // Only fetch 3 recent episodes for the homepage

      if (error) {
        console.error("Error fetching episodes:", error);
      } else {
        setEpisodes(data || []);
      }
      setEpisodesLoading(false);
    };

    fetchEpisodes();
  }, []);

  // Updated subscription handler to send email to Supabase
  const handleSubscribe = async (e) => {
    e.preventDefault();
    // Insert the email into the "mailing_list" table in Supabase
    const { error } = await supabase
      .from("mailing_list")
      .insert([{ email, name }]);
    if (error) {
      console.error("Error adding email to mailing list:", error);
      // Optionally, handle the error (e.g., show an error message to the user)
    } else {
      setSubscribed(true);
      setEmail("");
      setName("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("contact_messages")
      .insert([{ first_name: firstName, last_name: lastName, email, message }]);
    if (error) {
      console.error("Error sending message:", error);
      // Optionally, display an error to the user
    } else {
      // Clear the input fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setContactSent(false), 3000);
    }
  };

  // Testimonials carousel logic
  const testimonials = [
    {
      name: "Stefan Danquah",
      role: "Podcast Listener",
      quote:
        '"Listening to Ciara has opened my eyes to new perspectives. Her authenticity and warmth shine through every episode. I find myself eagerly awaiting each new release!"',
      image:
        "https://images.unsplash.com/photo-1570158268183-d296b2892211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Ruthie Bomochie Armah",
      role: "Podcast Listener",
      quote:
        '"Ciara demonstrates courage in speaking up for disability awareness. I always look forward to her next conversation. The way she navigates complex topics with sensitivity and insight is remarkable."',
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  // Page for testimonials
  const paginate = (newDirection) => {
    const newPage = page + newDirection;
    // Wrap around to first or last page if needed
    const wrappedPage =
      ((newPage % testimonials.length) + testimonials.length) %
      testimonials.length;
    setPage([wrappedPage, newDirection]);
  };

  // Auto-slide the testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 7000); // Slide every 7 seconds
    return () => clearInterval(interval);
  }, [page]);

  // We'll store a ref if we need to manually clear the interval from the dots
  const slideRef = useRef();

  // Scroll triggered animations
  const headerOpacity = useTransform(smoothScrollProgress, [0, 0.05], [1, 0]);
  const experienceScale = useTransform(
    smoothScrollProgress,
    [0.1, 0.2],
    [0.8, 1]
  );
  const experienceOpacity = useTransform(
    smoothScrollProgress,
    [0.1, 0.2],
    [0, 1]
  );

  // Loading screen with advanced animations
  if (loading) {
    return (
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
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

        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            variants={typingContainer}
            initial="hidden"
            animate="show"
            className="text-center"
          >
            {/* Type out "Daring Different" character by character */}
            <div className="flex justify-center mb-6 perspective-[1000px]">
              {Array.from("Daring Different").map((char, index) => (
                <motion.span
                  key={`title-${index}`}
                  variants={typingCharacter}
                  className="text-5xl md:text-7xl font-bold text-white inline-block mx-[1px] [text-shadow:0_0_40px_rgba(255,158,27,0.5)]"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    transform: "translateZ(0px)",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>

            {/* "with Ciara" with delay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="flex justify-center"
            >
              <div className="relative">
                {Array.from("with Ciara").map((char, index) => (
                  <motion.span
                    key={`subtitle-${index}`}
                    variants={typingCharacter}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8 + index * 0.08, duration: 0.5 }}
                    className="text-2xl md:text-4xl font-medium text-[#FF9E1B] inline-block mx-[0.5px]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}

                {/* Animated glowing dot at the end */}
                <motion.span
                  className="absolute -right-5 top-1/2 w-2 h-2 rounded-full bg-[#FF9E1B]"
                  animate={{
                    opacity: [1, 0.5, 1],
                    boxShadow: [
                      "0 0 5px 2px rgba(255,158,27,0.5)",
                      "0 0 10px 4px rgba(255,158,27,0.8)",
                      "0 0 5px 2px rgba(255,158,27,0.5)",
                    ],
                    backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Decorative shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                  <svg
                    width="100%"
                    height="100%"
                    preserveAspectRatio="none"
                    viewBox="0 0 1440 400"
                    className="absolute inset-0 opacity-20"
                  >
                    <motion.path
                      d="M0,128L48,144C96,160,192,192,288,202.7C384,213,480,203,576,181.3C672,160,768,128,864,128C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                      fill="#FFFFFF"
                      fillOpacity="0.1"
                      animate={{
                        d: [
                          "M0,128L48,144C96,160,192,192,288,202.7C384,213,480,203,576,181.3C672,160,768,128,864,128C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                          "M0,96L48,122.7C96,149,192,203,288,213.3C384,224,480,192,576,176C672,160,768,160,864,186.7C960,213,1056,267,1152,266.7C1248,267,1344,213,1392,186.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                        ],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Animated loading indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="mt-16 flex flex-col items-center"
        >
          <div className="relative">
            <motion.div
              className="w-16 h-16 rounded-full border-4 border-[#FF9E1B]/30 border-t-[#FF9E1B] mx-auto"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(255,158,27,0)",
                  "0 0 0 10px rgba(255,158,27,0.1)",
                  "0 0 0 20px rgba(255,158,27,0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 0.8 }}
            className="mt-4 text-white/60 font-light"
          >
            Preparing your experience...
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

  // Main home content after loading
  return (
    <div className="relative min-h-screen flex flex-col bg-[#F7F9FC] overflow-hidden">
      {/* Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#FF9E1B] origin-left z-50"
        style={{ scaleX: smoothScrollProgress }}
      />

      {/* 1. HERO SECTION */}
      <motion.section
        className="relative min-h-screen overflow-hidden pt-20 pb-32 flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Complex background with layered elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A2240] via-[#061830] to-[#072b4a] overflow-hidden">
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 opacity-30"
            initial={{ backgroundPosition: "0% 0%" }}
            animate={{ backgroundPosition: "100% 100%" }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 200%",
              backgroundImage:
                "radial-gradient(circle at 30% 70%, rgba(0,178,169,0.4) 0%, rgba(10,34,64,0) 50%), radial-gradient(circle at 80% 20%, rgba(255,158,27,0.4) 0%, rgba(10,34,64,0) 50%)",
            }}
          />

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDJ2MmgtMnpNNDAgMzRoMnYyaC0yek00NCAzNGgydjJoLTJ6TTM0IDMwaDJ2MmgtMnpNMzQgMjZoMnYyaC0yek0zNCAyMmgydjJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10" />

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
                  opacity: Math.random() * 0.5 + 0.3,
                }}
                animate={{
                  y: ["-10%", "110%"],
                  opacity: [0, 1, 0.5, 0],
                }}
                transition={{
                  duration: Math.random() * 20 + 15,
                  repeat: Infinity,
                  delay: Math.random() * 10,
                }}
              />
            ))}
          </div>
        </div>

        {/* Content container */}
        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left column (Text + CTA) */}
            <motion.div
              variants={fadeInRight}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2, duration: 0.8 }}
              className="lg:col-span-6 text-center lg:text-left"
            >
              <motion.div
                className="inline-block mb-4 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <span className="text-[#FF9E1B] font-medium text-sm flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Empowering voices & breaking barriers
                </span>
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div className="relative inline-block">
                  <span className="text-[#FF9E1B] relative z-10">Daring</span>
                  <motion.div
                    className="absolute -bottom-2 left-0 h-4 bg-[#FF9E1B]/20 w-full -z-0"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1, duration: 0.8 }}
                  />
                </div>{" "}
                <span className="text-white">Different</span>
                <div className="text-3xl md:text-4xl mt-2 text-white/90 font-light">
                  with Ciara
                </div>
              </motion.h1>

              <motion.p
                className="text-xl text-white/80 mb-8 leading-relaxed max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Join us on an inspiring journey of breaking barriers and
                empowering voices through powerful stories and authentic
                conversations that challenge perceptions.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                {/* Start Listening Button */}
                <Link to="/podcast">
                  <motion.div className="group relative" whileHover="hover">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#FF9E1B] blur-md group-hover:blur-xl transition-all duration-300"
                      variants={{
                        hover: {
                          scale: 1.1,
                          opacity: 0.7,
                        },
                      }}
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative px-8 py-4 font-bold text-[#0A2240] bg-[#FF9E1B] rounded-full
                                flex items-center gap-2 shadow-lg transform transition-all"
                    >
                      <Headphones className="w-5 h-5" />
                      <span>Start Listening</span>
                    </motion.button>
                  </motion.div>
                </Link>

                {/* Learn More Button */}
                <Link to="/about">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(255,255,255,0.2)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 font-bold text-white border-2 border-white/30 rounded-full
                              flex items-center gap-2 backdrop-blur-md bg-white/5
                              hover:bg-white/10 transform transition-all hover:border-white/60"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </motion.div>

              {/* Social proof indicators */}
              <motion.div
                className="mt-12 flex flex-wrap gap-6 justify-center lg:justify-start items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-[#0A2240] overflow-hidden"
                      >
                        <img
                          src={`https://i.pravatar.cc/100?img=${i + 10}`}
                          alt="Listener"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right column (Hero Image) */}
            <motion.div
              className="lg:col-span-6 relative"
              variants={fadeInLeft}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="relative mx-auto max-w-lg perspective-[1000px]">
                {/* Floating abstract shapes */}
                <motion.div
                  className="absolute -left-16 -top-16 w-32 h-32 rounded-full bg-[#FF9E1B]/20 backdrop-blur-md z-10"
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <motion.div
                  className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-[#00B2A9]/20 backdrop-blur-md z-10"
                  animate={{
                    y: [0, 20, 0],
                    rotate: [0, -10, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Main image container */}
                <motion.div
                  className="relative rounded-3xl overflow-hidden transform rotateY-3 hover:rotateY-0 transition-all duration-700"
                  animate={{ rotateY: [-5, 5, -5] }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2240]/80 via-transparent to-transparent z-10" />

                    <img
                      src="https://drive.google.com/thumbnail?id=1UxR3KFd3a0K4Q6TNMPKXq8PXwtTNIuM0&sz=w1000"
                      alt="Ciara"
                      className="w-full h-full object-cover rounded-3xl transform scale-110 hover:scale-100 transition-transform duration-700"
                    />

                    {/* Floating dynamic elements */}

                    {/* Statistics overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0A2240] to-transparent z-20">
                      <div className="text-white font-bold text-xl mb-2">
                        Daring Different Podcast
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4"></div>
                        <motion.div
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FF9E1B]"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Play className="w-5 h-5 text-[#0A2240] ml-0.5" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute -z-10 -inset-6 bg-gradient-to-br from-[#FF9E1B]/30 to-[#00B2A9]/30 rounded-[40px] blur-md"
                  animate={{
                    opacity: [0.4, 0.6, 0.4],
                    rotate: [0, 2, 0, -2, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Available on platforms badges */}
                <motion.div
                  className="absolute -right-10 -bottom-10 rounded-2xl py-3 px-4 bg-white/10 backdrop-blur-lg shadow-xl border border-white/20 z-20"
                  initial={{ opacity: 0, y: 20, rotate: 5 }}
                  animate={{ opacity: 1, y: 0, rotate: 5 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  <div className="text-white/80 text-xs mb-2 font-medium">
                    Available on:
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Youtube className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Animated scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 12, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-10 h-16 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-2 h-2 bg-white rounded-full mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* 2. FEATURED EPISODES SECTION WITH DIAGONAL LAYOUT */}
      <motion.section className="py-32 relative overflow-hidden">
        {/* Diagonal background sections */}
        <div className="absolute inset-0 -skew-y-3 bg-white/50 -translate-y-32 z-0" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#F7F9FC] to-white z-0" />

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
                <Radio className="w-4 h-4 inline mr-2" />
                Latest Episodes
              </motion.span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-[#0A2240] mb-2 relative inline-block">
              Featured Episodes
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-2 bg-[#FF9E1B] rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
            </h2>
            <p className="text-xl text-[#0A2240]/70 max-w-2xl mx-auto mt-4">
              Join Ciara for inspiring conversations that challenge perceptions
              and celebrate diversity.
            </p>
          </motion.div>

          {episodesLoading ? (
            <div className="flex justify-center items-center py-20">
              <motion.div
                className="w-16 h-16 border-4 border-[#FF9E1B] border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ) : episodes.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-10"
            >
              {episodes.map((episode, index) => (
                <motion.div
                  key={episode.id}
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="relative group"
                >
                  {/* Card with glass morphism */}
                  <div
                    className="bg-white rounded-3xl overflow-hidden shadow-xl transition-all duration-500
                              group-hover:shadow-2xl transform perspective-[1000px] h-full
                              border border-white"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A2240] to-transparent opacity-60 z-10" />

                      <img
                        src={
                          episode.cover_image ||
                          "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        }
                        alt={episode.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Play button overlay with animated effect */}
                      <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.div
                          className="relative"
                          whileHover={{ scale: 1.1 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-[#FF9E1B] rounded-full blur-md"
                            animate={{
                              scale: [1, 1.1, 1],
                              opacity: [0.5, 0.8, 0.5],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <div className="relative w-16 h-16 rounded-full bg-[#FF9E1B] flex items-center justify-center shadow-lg cursor-pointer">
                            <Play className="w-8 h-8 text-[#0A2240] ml-1" />
                          </div>
                        </motion.div>
                      </div>

                      {/* Episode number badge */}
                      <div className="absolute top-4 right-4 z-20">
                        <div className="bg-[#FF9E1B] text-[#0A2240] px-3 py-1 rounded-full font-bold text-sm shadow-lg">
                          Episode {episode.episode_number || index + 1}
                        </div>
                      </div>

                      {/* Duration & date */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-20">
                        <div className="bg-black/30 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {episode.duration || "45 mins"}
                        </div>

                        <div className="bg-black/30 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full">
                          {new Date(episode.published_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 relative">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-xs font-medium text-[#00B2A9] px-2 py-1 bg-[#00B2A9]/10 rounded-full">
                          {episode.category || "Inspiration"}
                        </span>
                        <span className="text-xs font-medium text-[#FF9E1B] px-2 py-1 bg-[#FF9E1B]/10 rounded-full">
                          {episode.tags?.[0] || "Disability Awareness"}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[#0A2240] mb-3 line-clamp-2 group-hover:text-[#FF9E1B] transition-colors">
                        {episode.title}
                      </h3>

                      <p className="text-[#0A2240]/70 mb-4 line-clamp-3">
                        {episode.description}
                      </p>

                      <div className="flex justify-between items-center">
                        <Link
                          to="/videos"
                          state={{ episode }}
                          className="inline-flex items-center text-[#FF9E1B] font-semibold group"
                        >
                          <span>Listen Now</span>
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                              repeatDelay: 0.5,
                            }}
                          >
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </motion.div>
                        </Link>

                        <div className="flex items-center gap-2">
                          <button className="w-8 h-8 rounded-full flex items-center justify-center bg-[#0A2240]/5 hover:bg-[#0A2240]/10 transition-colors">
                            <Heart className="w-4 h-4 text-[#0A2240]/70" />
                          </button>
                          <button className="w-8 h-8 rounded-full flex items-center justify-center bg-[#0A2240]/5 hover:bg-[#0A2240]/10 transition-colors">
                            <Share2 className="w-4 h-4 text-[#0A2240]/70" />
                          </button>
                        </div>
                      </div>

                      {/* Decorative corner accent */}
                      <div className="absolute -top-6 -right-6 w-12 h-12 bg-[#FF9E1B]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Bottom floating badge */}
                  <motion.div
                    className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-full px-4 py-1.5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    initial={{ y: 10 }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                  >
                    <Users className="w-4 h-4 text-[#0A2240]" />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center text-[#0A2240]/70 py-10">
              No episodes available yet. Check back soon!
            </div>
          )}

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <Link to="/podcast">
              <motion.div
                className="group relative inline-block"
                whileHover="hover"
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#0A2240] blur-md opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                  variants={{
                    hover: { scale: 1.1 },
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative px-8 py-4 font-bold text-white bg-[#0A2240] rounded-full
                            inline-flex items-center gap-2 shadow-lg hover:bg-[#081d36] z-10"
                >
                  <span>View All Episodes</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 0.5,
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </motion.button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* 3. TRAILER SECTION WITH LAYERED DESIGN */}
      <motion.section
        className="py-32 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Layered background with diagonal elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A2240] to-[#061830] overflow-hidden">
          {/* Diagonal decorative element */}
          <div className="absolute inset-0 overflow-hidden">
            <svg
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
              className="absolute h-full w-full"
            >
              <motion.path
                d="M0,100 L1000,500 L1000,1000 L0,1000 Z"
                fill="#FF9E1B"
                fillOpacity="0.05"
                initial={{ d: "M0,120 L1000,500 L1000,1000 L0,1000 Z" }}
                animate={{ d: "M0,100 L1000,480 L1000,1000 L0,1000 Z" }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
              <motion.path
                d="M0,150 L1000,650 L1000,1000 L0,1000 Z"
                fill="#00B2A9"
                fillOpacity="0.05"
                initial={{ d: "M0,170 L1000,650 L1000,1000 L0,1000 Z" }}
                animate={{ d: "M0,130 L1000,630 L1000,1000 L0,1000 Z" }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            </svg>
          </div>

          {/* Dot pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-60" />

          {/* Floating elements */}
          <div className="absolute top-0 left-1/3 w-64 h-64 rounded-full bg-[#FF9E1B]/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 rounded-full bg-[#00B2A9]/10 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Video Section */}
            <motion.div
              initial={{ x: -40, opacity: 0, rotateY: -5 }}
              whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]">
                {/* Glow effect */}
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-[#FF9E1B] to-[#00B2A9] rounded-[32px] opacity-30 blur-xl z-[-1]"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    boxShadow: [
                      "0 0 20px rgba(255,158,27,0.5)",
                      "0 0 40px rgba(0,178,169,0.5)",
                      "0 0 20px rgba(255,158,27,0.5)",
                    ],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Video container */}
                <div className="aspect-video relative rounded-3xl overflow-hidden border-4 border-white/10">
                  <iframe
                    src="https://drive.google.com/file/d/1QQbIh-qCN2rU3ICB2qq85vf5xOQmyC4z/preview"
                    className="w-full h-full"
                    title="Daring Different Trailer"
                    allowFullScreen
                  />

                  {/* Glass overlay with information */}
                  <motion.div
                    className="absolute inset-x-0 bottom-0 p-5 bg-black/30 backdrop-blur-md opacity-0 hover:opacity-100 transition-opacity duration-300"
                    initial={{ y: 20 }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-white font-bold">
                          Official Trailer
                        </h3>
                        <p className="text-white/70 text-sm">
                          Experience the passion behind Daring Different
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 bg-[#FF9E1B] text-[#0A2240] rounded-full text-xs font-bold">
                          2:45
                        </div>
                        <motion.div
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors cursor-pointer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Play className="w-5 h-5 text-white ml-0.5" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-[#FF9E1B]"
                  animate={{ y: [0, -10, 0], x: [0, -10, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-5 -right-5 w-10 h-10 rounded-full bg-[#00B2A9]"
                  animate={{ y: [0, 10, 0], x: [0, 10, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Floating timestamp badges */}
              <motion.div
                className="absolute -left-8 top-1/4 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-sm flex items-center gap-1.5 border border-white/20"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <span className="w-2 h-2 bg-[#FF9E1B] rounded-full"></span>
                00:58 Breaking barriers
              </motion.div>

              <motion.div
                className="absolute -right-8 bottom-1/4 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-sm flex items-center gap-1.5 border border-white/20"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <span className="w-2 h-2 bg-[#00B2A9] rounded-full"></span>
                01:45 Inspiring stories
              </motion.div>
            </motion.div>

            {/* Text Section */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                className="inline-block mb-4 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <span className="text-[#FF9E1B] font-medium text-sm flex items-center">
                  <Play className="w-4 h-4 mr-2" />
                  Podcast Trailer
                </span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white relative inline-block">
                Watch the Trailer
                <motion.div
                  className="absolute -bottom-2 left-0 w-full h-2 bg-[#FF9E1B] rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                />
              </h2>

              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Experience powerful stories and authentic conversations that
                inspire and challenge perceptions.
              </p>

              <div className="space-y-6 mb-10">
                {/* Feature points with animated checkmarks */}
                {[
                  {
                    text: "Personal stories that inspire and motivate",
                    icon: <Users className="w-5 h-5 text-[#FF9E1B]" />,
                  },
                  {
                    text: "Conversations about disability awareness and inclusion",
                    icon: <Heart className="w-5 h-5 text-[#FF9E1B]" />,
                  },
                  {
                    text: "Breaking barriers and challenging stereotypes",
                    icon: <Sparkles className="w-5 h-5 text-[#FF9E1B]" />,
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3 text-white/80"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + i * 0.2, duration: 0.5 }}
                  >
                    <div className="mt-0.5 flex-shrink-0">{item.icon}</div>
                    <p>{item.text}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <motion.div className="group relative" whileHover="hover">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#FF9E1B] blur-md opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                    variants={{
                      hover: { scale: 1.1 },
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative px-8 py-4 font-bold text-[#0A2240] bg-[#FF9E1B] rounded-full
                              flex items-center gap-2 shadow-lg transform transition-all z-10"
                  >
                    <Play className="w-5 h-5" />
                    <span>Watch Full Trailer</span>
                  </motion.button>
                </motion.div>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(255,255,255,0.2)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 font-bold text-white border-2 border-white/30 rounded-full
                            flex items-center gap-2 backdrop-blur-sm bg-white/5
                            hover:bg-white/10 transform transition-all hover:border-white/60"
                >
                  <span>Share Trailer</span>
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 4. FEATURES SECTION WITH 3D CARDS */}
      <motion.section
        className="py-32 relative overflow-hidden bg-gradient-to-b from-white to-[#F7F9FC]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Subtle pattern background */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-noise.png')] opacity-5" />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#FF9E1B]/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#00B2A9]/5 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-block mb-3">
              <motion.span
                className="inline-block py-1.5 px-4 rounded-full text-sm font-medium bg-[#0A2240]/5 text-[#0A2240]"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-4 h-4 inline mr-2" />
                What We Offer
              </motion.span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-[#0A2240] mb-4 relative inline-block">
              Discover Our Services
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-2 bg-[#FF9E1B] rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
            </h2>
            <p className="text-xl text-[#0A2240]/70 max-w-2xl mx-auto mt-4">
              Explore what Daring Different brings to your life with our
              inclusive content and empowering resources.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Headphones className="w-12 h-12 text-white" />,
                title: "Podcast Episodes",
                description:
                  "Listen to inspiring conversations that challenge perceptions and celebrate diversity through authentic storytelling.",
                color: "#FF9E1B",
                gradient: "linear-gradient(135deg, #FF9E1B 0%, #FFBE5C 100%)",
                link: "/podcast",
                features: [
                  "Weekly new episodes",
                  "In-depth interviews",
                  "Diverse perspectives",
                ],
              },
              {
                icon: <BookOpen className="w-12 h-12 text-white" />,
                title: "Books by Ciara",
                description:
                  "Discover Ciara's collection of books sharing her journey, insights and wisdom gathered throughout her experiences.",
                color: "#00B2A9",
                gradient: "linear-gradient(135deg, #00B2A9 0%, #3FD5CC 100%)",
                link: "/books",
                features: [
                  "Personal stories",
                  "Practical guidance",
                  "Inspirational content",
                ],
              },
              {
                icon: <Heart className="w-12 h-12 text-white" />,
                title: "Support Our Mission",
                description:
                  "Join our community and help us amplify diverse voices and stories that deserve to be heard around the world.",
                color: "#F15A5A",
                gradient: "linear-gradient(135deg, #F15A5A 0%, #F48B8B 100%)",
                link: "/donate",
                features: [
                  "Community events",
                  "Support programs",
                  "Awareness campaigns",
                ],
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ translateY: -15 }}
                className="relative group perspective-[1000px]"
              >
                <div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"
                  style={{ background: feature.gradient }}
                />

                <motion.div
                  className="relative h-full bg-white rounded-3xl overflow-hidden shadow-lg group-hover:shadow-2xl
                            transition-all duration-500 transform group-hover:rotateX-3"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Top colored section with icon */}
                  <div
                    className="relative aspect-[2/1] flex flex-col items-center justify-center px-8 py-10 text-center"
                    style={{ background: feature.gradient }}
                  >
                    {/* Layered background patterns for depth */}
                    <div className="absolute inset-0 overflow-hidden">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        className="absolute inset-0 opacity-10"
                      >
                        <path d="M0,0 L100,0 L100,100 Z" fill="#FFFFFF" />
                      </svg>
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoMnYyaC0yek00MCAzNGgydjJoLTJ6TTQ0IDM0aDJ2MmgtMnpNMzQgMzBoMnYyaC0yek0zNCAyNmgydjJoLTJ6TTM0IDIyaDJ2MmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
                    </div>

                    {/* Icon container with pulsing background */}
                    <div className="relative z-10">
                      <motion.div
                        className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4"
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(255,255,255,0)",
                            "0 0 0 10px rgba(255,255,255,0.1)",
                            "0 0 0 20px rgba(255,255,255,0)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      >
                        {feature.icon}
                      </motion.div>

                      <h3 className="text-2xl font-bold text-white relative z-10">
                        {feature.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content section */}
                  <div className="px-8 py-8 flex flex-col h-full">
                    <p className="text-[#0A2240]/70 mb-6">
                      {feature.description}
                    </p>

                    {/* Feature list */}
                    <div className="space-y-3 mb-6">
                      {feature.features.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full flex-shrink-0"
                            style={{ backgroundColor: feature.color }}
                          />
                          <span className="text-sm text-[#0A2240]">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <Link to={feature.link}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full py-3 rounded-full flex items-center justify-center gap-2 font-semibold text-white transition-all"
                          style={{ background: feature.gradient }}
                        >
                          <span>Explore {feature.title}</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 5. TESTIMONIALS SECTION WITH ENHANCED CAROUSEL */}
      <motion.section
        className="py-32 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Background with gradient and noise texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A2240] to-[#081d36]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-40" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#FF9E1B]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#00B2A9]/5 rounded-full blur-3xl" />

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
                className="inline-block py-1.5 px-4 rounded-full text-sm font-medium bg-white/10 text-white"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <MessageCircle className="w-4 h-4 inline mr-2" />
                Testimonials
              </motion.span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 relative inline-block">
              What People Are Saying
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-2 bg-[#FF9E1B] rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mt-4">
              Hear from our community who have been inspired by Ciara's journey
              and podcast.
            </p>
          </motion.div>

          {/* Carousel component */}
          <div className="relative max-w-5xl mx-auto">
            {/* Main slider */}
            <div className="overflow-hidden relative">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={page}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <div className="relative rounded-3xl overflow-hidden">
                    {/* Testimonial card with glass morphism */}
                    <div className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-12">
                        {/* Image section */}
                        <div className="col-span-4 relative md:rounded-l-3xl overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-[#0A2240]/50 to-transparent z-10" />

                          <img
                            src={testimonials[page].image}
                            alt={testimonials[page].name}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>

                        {/* Content section */}
                        <div className="col-span-8 p-8 md:p-12 flex flex-col justify-center">
                          {/* Quote icon */}
                          <svg
                            className="w-12 h-12 text-[#FF9E1B]/30 mb-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>

                          <div className="text-2xl text-white font-light leading-relaxed mb-8 relative">
                            <div className="relative z-10">
                              {testimonials[page].quote}
                            </div>

                            {/* Subtle highlight for text */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 bg-[#FF9E1B]/5 blur-3xl rounded-full -z-0" />
                          </div>

                          <div className="mt-auto">
                            <div className="flex items-center">
                              <div>
                                <div className="font-bold text-[#FF9E1B] text-xl">
                                  {testimonials[page].name}
                                </div>
                                <div className="text-white/60">
                                  {testimonials[page].role}
                                </div>
                              </div>

                              {/* Star rating */}
                              <div className="ml-auto flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className="w-5 h-5 text-[#FF9E1B]"
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation arrows */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between pointer-events-none px-4 z-20">
              <motion.button
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center pointer-events-auto border border-white/20 shadow-lg"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255,255,255,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => paginate(-1)}
              >
                <ArrowRight className="w-5 h-5 transform rotate-180" />
              </motion.button>

              <motion.button
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center pointer-events-auto border border-white/20 shadow-lg"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255,255,255,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => paginate(1)}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center items-center gap-3 mt-10">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage([i, i > page ? 1 : -1])}
                  className="group"
                >
                  <motion.div
                    className={`w-3 h-3 rounded-full transition-all duration-300 relative
                                ${
                                  i === page
                                    ? "bg-[#FF9E1B] scale-125"
                                    : "bg-white/30 hover:bg-white/50"
                                }`}
                    whileHover={{ scale: 1.5 }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 6. SUBSCRIPTION SECTION WITH ANIMATED ELEMENTS */}
      <motion.section
        className="py-32 relative overflow-hidden bg-gradient-to-br from-white to-[#F7F9FC]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-noise.png')] opacity-5" />

        {/* Decorative elements */}
        <div className="absolute top-0 right=0 w-1/3 h-1/3 bg-[#FF9E1B]/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#00B2A9]/5 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Card with background shapes */}
            <div className="relative rounded-3xl overflow-hidden">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A2240] to-[#00B2A9]">
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      "radial-gradient(circle at 20% 50%, rgba(255,158,27,0.4) 0%, rgba(10,34,64,0) 50%)",
                      "radial-gradient(circle at 80% 50%, rgba(255,158,27,0.4) 0%, rgba(10,34,64,0) 50%)",
                      "radial-gradient(circle at 20% 50%, rgba(255,158,27,0.4) 0%, rgba(10,34,64,0) 50%)",
                    ],
                    backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Decorative shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                  <svg
                    width="100%"
                    height="100%"
                    preserveAspectRatio="none"
                    viewBox="0 0 1440 400"
                    className="absolute inset-0 opacity-20"
                  >
                    <motion.path
                      d="M0,128L48,144C96,160,192,192,288,202.7C384,213,480,203,576,181.3C672,160,768,128,864,128C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                      fill="#FFFFFF"
                      fillOpacity="0.1"
                      animate={{
                        d: [
                          "M0,128L48,144C96,160,192,192,288,202.7C384,213,480,203,576,181.3C672,160,768,128,864,128C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                          "M0,96L48,122.7C96,149,192,203,288,213.3C384,224,480,192,576,176C672,160,768,160,864,186.7C960,213,1056,267,1152,266.7C1248,267,1344,213,1392,186.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                        ],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                    />
                  </svg>
                </div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoMnYyaC0yek00MCAzNGgydjJoLTJ6TTQ0IDM0aDJ2MmgtMnpNMzQgMzBoMnYyaC0yek0zNCAyNmgydjJoLTJ6TTM0IDIyaDJ2MmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10" />
              </div>

              {/* Content container */}
              <div className="relative z-10 px-6 py-12 md:py-16 md:px-12 lg:px-20">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                  {/* Left content */}
                  <motion.div
                    className="md:col-span-7"
                    variants={fadeInRight}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="inline-block mb-4 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full"
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      <span className="text-[#FF9E1B] font-medium text-sm flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        Join Our Community
                      </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                      Stay Updated with{" "}
                      <span className="text-[#FF9E1B]">Daring Different</span>
                    </h2>

                    <p className="text-lg text-white/80 mb-8">
                      Subscribe to our newsletter to get notified about new
                      episodes, exclusive content, behind-the-scenes moments,
                      and upcoming events directly in your inbox.
                    </p>

                    {/* Feature points */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {[
                        {
                          text: "Weekly podcast updates",
                          icon: <Headphones className="w-4 h-4" />,
                        },
                        {
                          text: "Exclusive content",
                          icon: <Sparkles className="w-4 h-4" />,
                        },
                        {
                          text: "Early access to events",
                          icon: <Calendar className="w-4 h-4" />,
                        },
                        {
                          text: "Join a supportive community",
                          icon: <Users className="w-4 h-4" />,
                        },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center gap-2 text-white/90"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                        >
                          <div className="w-6 h-6 rounded-full bg-[#FF9E1B]/20 flex items-center justify-center flex-shrink-0">
                            {item.icon}
                          </div>
                          <span className="text-sm">{item.text}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Subscriber count badge */}
                    <motion.div
                      className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      <span className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full border border-white/20 overflow-hidden"
                          >
                            <img
                              src={`https://i.pravatar.cc/100?img=${i + 20}`}
                              alt="Subscriber"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </span>
                    </motion.div>
                  </motion.div>

                  {/* Right form content */}
                  <motion.div
                    className="md:col-span-5"
                    variants={fadeInLeft}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                  >
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
                      <form onSubmit={handleSubscribe} className="space-y-4">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-white text-sm font-medium mb-2"
                          >
                            Email Address
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              id="email"
                              placeholder="yourname@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm 
                                       border-2 border-white/20 focus:border-[#FF9E1B]
                                       focus:outline-none text-white placeholder:text-white/50"
                            />
                            <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="name"
                            className="block text-white text-sm font-medium mb-2"
                          >
                            Your Name (Optional)
                          </label>
                          <input
                            type="text"
                            id="name"
                            placeholder="Stefan Danquah"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm 
                                     border-2 border-white/20 focus:border-[#FF9E1B]
                                     focus:outline-none text-white placeholder:text-white/50"
                          />
                        </div>

                        <div className="pt-2">
                          <motion.div
                            className="group relative"
                            whileHover="hover"
                          >
                            <motion.div
                              className="absolute inset-0 rounded-lg bg-[#FF9E1B] blur-md opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                              variants={{
                                hover: { scale: 1.05 },
                              }}
                            />
                            <motion.button
                              type="submit"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="relative w-full py-3 rounded-lg bg-[#FF9E1B] text-[#0A2240] 
                                        font-bold shadow-md hover:shadow-lg transform transition-all z-10
                                        flex items-center justify-center gap-2"
                            >
                              <span>Subscribe Now</span>
                              <ArrowRight className="w-4 h-4" />
                            </motion.button>
                          </motion.div>
                        </div>
                      </form>

                      {subscribed && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 text-[#FF9E1B] font-semibold text-center"
                        >
                          Thank you for subscribing! You're now part of our
                          community.
                        </motion.div>
                      )}

                      <div className="mt-4 text-center">
                        <span className="text-white/60 text-xs">
                          By subscribing, you agree to our Privacy Policy and
                          Terms of Service
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
      {/* 7. CONTACT SECTION WITH 3D INTERACTIVE CARDS */}
      <motion.section
        className="py-32 relative overflow-hidden"
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
            className="text-center mb-20"
          >
            <div className="inline-block mb-3">
              <motion.span
                className="inline-block py-1.5 px-4 rounded-full text-sm font-medium bg-[#0A2240]/5 text-[#0A2240]"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <MessageCircle className="w-4 h-4 inline mr-2" />
                Get in Touch
              </motion.span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-[#0A2240] mb-4 relative inline-block">
              Contact Us
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-2 bg-[#FF9E1B] rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
            </h2>
            <p className="text-xl text-[#0A2240]/70 max-w-2xl mx-auto mt-4">
              We'd love to hear from you! Whether you have questions, feedback,
              or just want to connect.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-1 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Mail className="w-10 h-10 text-white" />,
                title: "Email",
                text: "info@daringdifferent.com.au",
                action: "Send us an email",
                gradient: "linear-gradient(135deg, #FF9E1B 0%, #FFBE5C 100%)",
                delay: 0.1,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ delay: item.delay }}
                className="group perspective-[1000px]"
              >
                <motion.div
                  className="relative h-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl
                          transform transition-all duration-500 group-hover:rotate-y-10"
                  whileHover={{ scale: 1.03 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Card background with gradient */}
                  <div
                    className="absolute inset-0"
                    style={{ background: item.gradient }}
                  >
                    {/* Decorative patterns */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoMnYyaC0yek00MCAzNGgydjJoLTJ6TTQ0IDM0aDJ2MmgtMnpNMzQgMzBoMnYyaC0yek0zNCAyNmgydjJoLTJ6TTM0IDIyaDJ2MmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10" />

                    {/* Animated background elements */}
                    <motion.div
                      className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-white/10 blur-2xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-8 flex flex-col items-center text-center h-full">
                    {/* Icon container */}
                    <motion.div
                      className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-6"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(255,255,255,0)",
                          "0 0 0 8px rgba(255,255,255,0.1)",
                          "0 0 0 0 rgba(255,255,255,0)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    >
                      {item.icon}
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                      {item.title}
                    </h3>

                    <p className="text-white/90 whitespace-pre-line mb-8 flex-grow">
                      {item.text}
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white
                                flex items-center gap-2 hover:bg-white/30 transition-colors
                                border border-white/20"
                    >
                      <span>{item.action}</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>

                    {/* Decorative dot pattern */}
                    <div className="absolute top-4 left-4 grid grid-cols-2 gap-1 opacity-30">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-1 h-1 rounded-full bg-white"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Map or additional contact information */}
          <motion.div
            className="mt-16 bg-white rounded-3xl shadow-xl p-6 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-4">
                <h3 className="text-2xl font-bold text-[#0A2240] mb-4">
                  Send us a Message
                </h3>
                <p className="text-[#0A2240]/70 mb-6">
                  Have a question or want to collaborate? Fill out the form and
                  we'll get back to you as soon as possible.
                </p>

                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#0A2240]/70 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-[#F7F9FC] border border-gray-200 focus:outline-none focus:border-[#00B2A9]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0A2240]/70 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-[#F7F9FC] border border-gray-200 focus:outline-none focus:border-[#00B2A9]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0A2240]/70 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-[#F7F9FC] border border-gray-200 focus:outline-none focus:border-[#00B2A9]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0A2240]/70 mb-1">
                      Message
                    </label>
                    <textarea
                      rows="4"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-[#F7F9FC] border border-gray-200 focus:outline-none focus:border-[#00B2A9]"
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-[#0A2240] text-white rounded-lg font-semibold
                              hover:bg-[#081d36] transition-colors shadow-md"
                  >
                    Send Message
                  </motion.button>
                  {contactSent && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 text-[#FF9E1B] text-sm font-medium"
                    >
                      Your message has been sent successfully!
                    </motion.div>
                  )}
                </form>
              </div>

              <div className="bg-[#F7F9FC] rounded-2xl overflow-hidden relative">
                {/* Placeholder for map - in a real implementation you would use an actual map component */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A2240]/5 to-[#00B2A9]/5" />
                <div className="h-full flex flex-col items-center justify-center p-6">
                  <img
                    src="https://img.freepik.com/free-photo/portrait-smiley-student-wheelchair_23-2148844656.jpg"
                    alt="Female student in a wheelchair smiling"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 8. FOOTER WITH MODERN DESIGN */}
      <footer className="bg-[#0A2240] text-white relative overflow-hidden">
        {/* Top wave decoration */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[60px]"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="#F7F9FC"
              fillOpacity="0.1"
            ></path>
          </svg>
        </div>

        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Particle effect */}
          <div className="absolute inset-0">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute w-1 h-1 rounded-full bg-white/30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.3,
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>

          {/* Abstract shapes */}
          <motion.div
            className="absolute top-[10%] right-[5%] w-64 h-64 rounded-full bg-[#FF9E1B]/5 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[10%] left-[5%] w-80 h-80 rounded-full bg-[#00B2A9]/5 blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Main footer content */}
        <div className="relative z-10 pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
              {/* Logo and description */}
              <div className="md:col-span-5">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold flex items-center">
                    <span className="text-[#FF9E1B]">Daring</span>
                    <span className="ml-2">Different</span>
                  </h2>
                </div>
                <p className="text-white/70 mb-8 max-w-md leading-relaxed">
                  Join us on an inspiring journey of breaking barriers and
                  empowering voices through powerful stories and authentic
                  conversations that challenge perceptions.
                </p>

                {/* Social icons */}
                <div className="flex space-x-4">
                  {[
                    {
                      icon: <Facebook className="w-5 h-5" />,
                      url: "https://www.facebook.com/daringdifferent",
                      label: "Facebook",
                    },
                    {
                      icon: (
                        <div className="w-5 h-5">
                          <TikTokIcon color="currentColor" />
                        </div>
                      ),
                      url: "https://www.tiktok.com/@daring.with.cici",
                      label: "TikTok",
                    },
                    {
                      icon: <Youtube className="w-5 h-5" />,
                      url: "https://www.youtube.com/@DARINGDIFFERENT1",
                      label: "YouTube",
                    },
                    {
                      icon: <Instagram className="w-5 h-5" />,
                      url: "https://www.instagram.com/daringdifferent/",
                      label: "Instagram",
                    },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all
                               hover:bg-[#FF9E1B] hover:scale-110 hover:rotate-3 transform"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick links */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-bold mb-6 text-[#FF9E1B]">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {[
                    { text: "Home", url: "/" },
                    { text: "Podcast", url: "/podcast" },
                    { text: "About", url: "/about" },
                    { text: "Books", url: "/books" },
                    { text: "Support", url: "/donate" },
                  ].map((link, i) => (
                    <li key={i}>
                      <Link
                        to={link.url}
                        className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF9E1B] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span>{link.text}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div className="md:col-span-3">
                <h3 className="text-lg font-bold mb-6 text-[#FF9E1B]">
                  Newsletter
                </h3>
                <p className="text-white/70 mb-4">
                  Get the latest updates and news in your inbox.
                </p>

                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-[#FF9E1B] text-white placeholder:text-white/50"
                    />
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 rounded-lg bg-[#FF9E1B] text-[#0A2240] font-bold flex items-center justify-center gap-2"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </form>

                {subscribed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-[#FF9E1B] text-sm font-medium"
                  >
                    Thanks for subscribing!
                  </motion.div>
                )}
              </div>
            </div>

            {/* Bottom footer */}
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-white/50 text-sm">
                © {new Date().getFullYear()} Daring Different with Ciara. All
                rights reserved.
              </div>

              <div className="flex gap-4 text-sm">
                <a
                  href="#"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <span className="text-white/50">•</span>
                <a
                  href="#"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
                <span className="text-white/50">•</span>
                <a
                  href="#"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  Accessibility
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
