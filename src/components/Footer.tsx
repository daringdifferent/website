import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mic2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Mic2 className="h-8 w-8" />
              <span className="text-xl font-bold">Daring Different</span>
            </Link>
            <p className="text-sm text-gray-300">
              Inspiring stories that challenge perspectives and celebrate diversity.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-secondary transition-colors">About</Link></li>
              <li><Link to="/books" className="hover:text-secondary transition-colors">Books</Link></li>
              <li><Link to="/podcast" className="hover:text-secondary transition-colors">Podcast</Link></li>
              <li><Link to="/subscribe" className="hover:text-secondary transition-colors">Subscribe</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: contact@daringdifferent.com</li>
              <li>Phone: (555) 123-4567</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-secondary transition-colors"><Facebook size={24} /></a>
              <a href="#" className="hover:text-secondary transition-colors"><Twitter size={24} /></a>
              <a href="#" className="hover:text-secondary transition-colors"><Instagram size={24} /></a>
              <a href="#" className="hover:text-secondary transition-colors"><Youtube size={24} /></a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} Daring Different. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;