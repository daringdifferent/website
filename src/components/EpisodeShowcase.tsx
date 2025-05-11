import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Calendar, Bookmark } from 'lucide-react';

const EpisodeCard = ({ episode, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100 
      }}
      whileHover={{ 
        y: -10, 
        rotateY: 5,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)"
      }}
      className="group relative rounded-2xl overflow-hidden
                 cursor-pointer shadow-xl bg-gradient-to-br
                 from-white/10 to-white/5 backdrop-blur-md
                 border border-white/20 h-full
                 transition-all duration-500 ease-out
                 [transform-style:preserve-3d]"
      style={{ perspective: "1000px" }}
    >
      {/* Episode image with overlay */}
      <div className="relative h-52 overflow-hidden">
        <img 
          src={episode.image} 
          alt={episode.title}
          className="w-full h-full object-cover transform 
                   group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t 
                     from-[#0A2240]/80 via-transparent to-transparent" />
        
        {/* Play button overlay */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center opacity-0 
                   group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1.1 }}
        >
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md 
                     flex items-center justify-center border border-white/30
                     text-white hover:bg-white/30 transition-colors">
            <Play className="w-6 h-6 fill-current" />
          </div>
        </motion.div>
        
        {/* Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 rounded-full text-xs font-medium
                        bg-gradient-to-r from-[#F15B41] to-[#FF9E18]
                        text-white shadow-lg">
            {episode.category}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Title with gradient effect on hover */}
        <h3 className="text-xl font-bold mb-2 text-white
                     group-hover:bg-gradient-to-r group-hover:from-[#00A7B5] 
                     group-hover:to-[#FF9E18] group-hover:bg-clip-text 
                     group-hover:text-transparent transition-all duration-300">
          {episode.title}
        </h3>
        
        <p className="text-white/80 mb-4 line-clamp-2">{episode.description}</p>
        
        {/* Meta info with icons */}
        <div className="flex flex-wrap gap-4 text-sm text-white/70">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{episode.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{episode.date}</span>
          </div>
        </div>
      </div>
      
      {/* Bookmark button with animation */}
      <button 
        className="absolute bottom-4 right-4 w-8 h-8 rounded-full
                 bg-white/10 backdrop-blur-md flex items-center justify-center
                 hover:bg-white/20 transition-colors"
      >
        <Bookmark className="w-4 h-4 text-white" />
      </button>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 
                   bg-gradient-to-tr from-[#00A7B5]/40 to-transparent 
                   rounded-full blur-xl opacity-60 z-0" />
    </motion.div>
  );
};

const EpisodeShowcase = () => {
  // Example episodes data
  const episodes = [
    {
      id: 1,
      title: "Embracing Your Unique Journey",
      description: "Ciara explores how embracing our differences leads to personal growth and inspiring others.",
      image: "https://images.unsplash.com/photo-1583352159602-a9b09c18d997?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Inspiration",
      duration: "32 min",
      date: "Mar 1, 2025"
    },
    {
      id: 2,
      title: "Breaking Barriers in Education",
      description: "A conversation with education experts on creating inclusive learning environments for all.",
      image: "https://images.unsplash.com/photo-1612197527539-41fcbe62ab56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Interview",
      duration: "45 min",
      date: "Feb 22, 2025"
    },
    {
      id: 3,
      title: "The Power of Advocacy",
      description: "How finding your voice can lead to meaningful change in disability awareness.",
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Community",
      duration: "38 min",
      date: "Feb 15, 2025"
    },
    {
      id: 4,
      title: "Mental Health and Resilience",
      description: "Exploring the connection between mental health and building resilience in challenging times.",
      image: "https://images.unsplash.com/photo-1597448630449-66edec5d1edc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Wellness",
      duration: "41 min",
      date: "Feb 8, 2025"
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient and texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A2240] to-[#00A7B5]/30 z-0" />
      <div className="absolute inset-0 opacity-5 z-0" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
           }} />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section header with animated line */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-1 bg-gradient-to-r from-[#00A7B5] to-[#FF9E18] 
                     mx-auto mb-6"
          />
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            Latest Episodes
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Dive into our thought-provoking conversations and inspiring stories
          </motion.p>
        </div>

        {/* Episode grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {episodes.map((episode, index) => (
            <EpisodeCard key={episode.id} episode={episode} index={index} />
          ))}
        </div>

        {/* View all button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full 
                     bg-gradient-to-r from-[#00A7B5] to-[#0A2240] 
                     text-white font-medium shadow-lg hover:shadow-xl
                     transition-all duration-300"
          >
            View All Episodes
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default EpisodeShowcase;