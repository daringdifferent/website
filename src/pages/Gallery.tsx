import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';

// Primary color palette
const colors = {
  primary: '#F2245F',
  secondary: '#FBB03B',
  accent: '#F52B62',
  navy: '#01576E',
  white: '#FFFFFF',
};

const Gallery: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('gallery_events')
        .select('*, gallery_items(*)')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching gallery events:', error);
      } else if (data) {
        setEvents(data);
        if (data.length > 0) {
          setSelectedEvent(data[0]);
        }
      }
      setLoading(false);
    };
    fetchEvents();
  }, []);

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
        className="relative bg-gradient-to-b from-white to-[#FBB03B]/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Image & Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#01576E]/90 to-[#FFFFFF]/70" />
          <img
            src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1950&q=80"
            alt="Gallery Background"
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Gallery</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Moments from Ciara's events, engagements, and live shows.
            </p>
          </motion.div>
        </div>

        {/* Animated Chevron Down */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-8 h-8 text-[#01576E]" />
        </motion.div>
      </motion.section>

      {/* EVENTS TABS */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {events.map((event) => (
              <motion.button
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                whileHover={{ scale: 1.05 }}
                className={`px-4 py-2 rounded-full font-bold transition-colors ${
                  selectedEvent?.id === event.id
                    ? 'bg-[#01576E] text-white'
                    : 'bg-gray-200 text-[#01576E]'
                }`}
              >
                {event.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* MEDIA GALLERY FOR SELECTED EVENT */}
      {selectedEvent && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Event Title & Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 text-center"
            >
              <h2 className="text-3xl font-bold" style={{ color: colors.navy }}>
                {selectedEvent.name}
              </h2>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                {selectedEvent.description}
              </p>
            </motion.div>

            {/* Masonry-like layout using CSS columns for a Google Photos style */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
              {selectedEvent.gallery_items.map((item: any) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  // REMOVED overflow-hidden here:
                  className="mb-4 rounded-2xl shadow-xl relative group"
                >
                  {item.media_type === 'image' ? (
                    <img
                      src={item.url}
                      alt={item.alt_text}
                      className="w-full h-auto"
                    />
                  ) : (
                    // Responsive video container
                    <div className="relative pb-[56.25%] h-0">
                      <iframe
                        src={item.url}
                        title={item.alt_text}
                        className="absolute top-0 left-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}

                  {/* Alt Text Overlay on hover */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm">{item.alt_text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Gallery;
