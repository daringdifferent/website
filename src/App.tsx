// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Import components and pages
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Books from './pages/Books';
import Podcast from './pages/Podcast';
import Subscribe from './pages/Subscribe';
import SignUp from './pages/SignUp';
import VideoPlayerPage from './pages/VideoPlayer'; 
import Gallery from './pages/Gallery'
import BookCiara from './pages/BookCiara'
import Donate from './pages/Donate'
const AppRoutes: React.FC = () => {
  const location = useLocation();
  // Extract backgroundLocation if set when navigating to a modal
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Navbar />
      {/* Primary Routes */}
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/books" element={<Books />} />
        <Route path="/podcast" element={<Podcast />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/videos" element={<VideoPlayerPage />} /> 
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/book-ciara" element={<BookCiara />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
      {/* Modal overlay for /signup when backgroundLocation exists */}
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
