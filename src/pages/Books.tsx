// Books.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
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

interface Book {
  id: string;
  title: string;
  cover_url: string;
  price: number;
  rating: number;
  description: string;
  release_date: string;
  pages: number;
}

const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showWaitlistModal, setShowWaitlistModal] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [waitlistMessage, setWaitlistMessage] = useState('');

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
        setBooks(data || []);
      }
      setLoading(false);
    };
    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  // Latest book is the first one (assuming descending order)
  const latestBook = books.length > 0 ? books[0] : null;
  // Other books exclude the latest release
  const otherBooks = latestBook ? books.slice(1) : books;

  // Inline Waitlist Modal Component
  const WaitlistModal: React.FC<{ bookId: string }> = ({ bookId }) => {
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      const { error } = await supabase
        .from('book_waitlist')
        .insert([{ book_id: bookId, email }]);
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

    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-white rounded-xl p-8 max-w-md w-full shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setShowWaitlistModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl leading-none"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4" style={{ color: colors.navy }}>
              Join Waitlist
            </h2>
            <p className="mb-4 text-gray-700">
              Enter your email to join the waitlist for this book.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, rotateX: 5 }}
                whileTap={{ scale: 0.95, rotateX: 0 }}
                disabled={submitting}
                className="w-full bg-primary text-white rounded py-2 font-bold shadow-lg hover:bg-accent transition-colors"
              >
                {submitting ? 'Submitting...' : 'Join Waitlist'}
              </motion.button>
            </form>
            {waitlistMessage && (
              <p className="mt-4 text-center text-green-600 font-semibold">
                {waitlistMessage}
              </p>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* HERO SECTION */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-b from-white to-[#FBB03B]/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#01576E]/90 to-[#FFFFFF]/70" />
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Books background"
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
              Books by Ciara
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Inspiring stories of resilience, courage, and embracing what makes us unique.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* BOOKS GRID SECTION (Other Books) */}
      {otherBooks.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={fadeInUp}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h3 className="text-2xl font-semibold" style={{ color: colors.navy }}>
                More Books
              </h3>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherBooks.map((book) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="rounded-2xl shadow-xl overflow-hidden bg-white border border-gray-100 transition"
                >
                  <div className="relative aspect-w-3 aspect-h-4">
                    <img
                      src={book.cover_url}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold" style={{ color: colors.navy }}>
                        {book.title}
                      </h3>
                      <div className="flex items-center text-secondary">
                        <Star className="w-5 h-5 fill-current" />
                        <span className="ml-1">{book.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6">{book.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold" style={{ color: colors.navy }}>
                        ${book.price}
                      </span>
                      <button
                        onClick={() => setSelectedBook(book)}
                        className="inline-flex items-center px-6 py-3 rounded-full text-white transition-transform duration-300 shadow-lg outline-none"
                        style={{
                          background:
                            "linear-gradient(to right, #014356, #01576E, #017e99)",
                        }}
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Purchase
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FEATURED BOOK (Latest Release) SECTION */}
      {latestBook && (
        <section className="py-20 bg-gradient-to-r from-[#01576E] to-[#01576E]/90 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Column */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h2 className="text-4xl font-bold">Latest Release</h2>
                <p className="text-xl">
                  {latestBook.description}
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setSelectedBook(latestBook);
                      setShowWaitlistModal(true);
                    }}
                    className="inline-flex items-center px-6 py-3 rounded-full text-white transition-transform duration-300 shadow-lg outline-none"
                    style={{
                      background:
                        "linear-gradient(to right, #014356, #01576E, #017e99)",
                    }}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    <span>Join Waitlist</span>
                  </button>
                </div>
              </motion.div>
              {/* Image Column */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative aspect-w-3 aspect-h-4 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={latestBook.cover_url}
                    alt="Latest book cover"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Inline Waitlist Modal */}
      <AnimatePresence>
        {showWaitlistModal && selectedBook && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white rounded-xl p-8 max-w-md w-full shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setShowWaitlistModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl leading-none"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4" style={{ color: colors.navy }}>
                Join Waitlist
              </h2>
              <p className="mb-4 text-gray-700">
                Enter your email to join the waitlist for this book.
              </p>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
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
                    setTimeout(() => {
                      setShowWaitlistModal(false);
                      setWaitlistMessage('');
                    }, 2000);
                  }
                  setSubmitting(false);
                }}
              >
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary transition"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05, rotateX: 5 }}
                  whileTap={{ scale: 0.95, rotateX: 0 }}
                  disabled={submitting}
                  className="w-full bg-primary text-white rounded py-2 font-bold shadow-lg hover:bg-accent transition-colors"
                >
                  {submitting ? 'Submitting...' : 'Join Waitlist'}
                </motion.button>
              </form>
              {waitlistMessage && (
                <p className="mt-4 text-center text-green-600 font-semibold">
                  {waitlistMessage}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Books;
