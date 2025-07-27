import ComingSoon from "./components/ComingSoon";

export default function App() {
  return <ComingSoon />;
}

// import { useEffect, useState } from "react";

// function getTimeLeft(target) {
//   const diff = target - Date.now();

//   if (diff <= 0) {
//     return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };
//   }

//   const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//   const minutes = Math.floor((diff / (1000 * 60)) % 60);
//   const seconds = Math.floor((diff / 1000) % 60);

//   return { days, hours, minutes, seconds, isOver: false };
// }

// export default function ComingSoon() {
//   // 🔁 Change this to your real launch date/time
//   const targetDate = new Date("2025-12-31T23:59:59Z").getTime();

//   const [time, setTime] = useState(() => getTimeLeft(targetDate));

//   useEffect(() => {
//     const id = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
//     return () => clearInterval(id);
//   }, [targetDate]);

//   return (
//     <div className="container">
//       <div className="sections1">
//         <h1>Our Website is Coming Soon</h1>
//         <hr />
//         <p>
//           Stay tuned for updates and get ready for an extraordinary experience!
//         </p>

//         {!time.isOver ? (
//           <div className="cont-btn">
//             <button>
//               {time.days} <br />
//               <span>DAYS</span>
//             </button>
//             <button>
//               {time.hours} <br />
//               <span>HOURS</span>
//             </button>
//             <button>
//               {time.minutes} <br />
//               <span>MINUTES</span>
//             </button>
//             <button>
//               {time.seconds} <br />
//               <span>SECONDS</span>
//             </button>
//           </div>
//         ) : (
//           <div className="cont-btn">
//           <button>
//             00 <br />
//             <span>DAYS</span>
//           </button>
//           <button>
//             00 <br />
//             <span>HOURS</span>
//           </button>
//           <button>
//             00 <br />
//             <span>MINUTES</span>
//           </button>
//           <button>
//             00 <br />
//             <span>SECONDS</span>
//           </button>
//           <p style={{ marginTop: 16, fontWeight: 600 }}>We are live! 🎉</p>
//         </div>
//         )}

//         <div style={{ marginTop: 24 }}>
//          <a
//             href="mailto:info@daringdifferent.com.au?subject=Feedback&body=Hi%2C%20I%20have%20some%20feedback..."
//             >
//             Send Feedback
//         </a>

//         </div>
//       </div>
//     </div>
//   );
// }

// // App.tsx
// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
//   Navigate,
// } from "react-router-dom";

// // Import auth provider and protected route
// import { AuthProvider } from "./lib/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoutes";

// // Import components and pages
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Books from "./pages/Books";
// import Podcast from "./pages/Podcast";
// import Subscribe from "./pages/Subscribe";
// import SignUp from "./pages/SignUp";
// import SignIn from "./pages/SignIn";
// import UpdatePassword from "./pages/UpdatePassword";
// import Profile from "./pages/Profile";
// import AuthCallback from "./pages/AuthCallback";
// import VideoPlayerPage from "./pages/VideoPlayer";
// import Gallery from "./pages/Gallery";
// import BookCiara from "./pages/BookCiara";
// import Donate from "./pages/Donate";

// const AppRoutes: React.FC = () => {
//   const location = useLocation();
//   // Extract backgroundLocation if set when navigating to a modal
//   const state = location.state as { backgroundLocation?: Location };

//   return (
//     <>
//       <Navbar />
//       {/* Primary Routes */}
//       <Routes location={state?.backgroundLocation || location}>
//         {/* Public routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/books" element={<Books />} />
//         <Route path="/podcast" element={<Podcast />} />
//         <Route path="/gallery" element={<Gallery />} />
//         <Route path="/book-ciara" element={<BookCiara />} />
//         <Route path="/donate" element={<Donate />} />

//         {/* Auth routes */}
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/auth/callback" element={<AuthCallback />} />

//         {/* Protected routes */}
//         <Route element={<ProtectedRoute />}>
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/update-password" element={<UpdatePassword />} />
//           <Route path="/subscribe" element={<Subscribe />} />
//           <Route path="/videos" element={<VideoPlayerPage />} />
//         </Route>

//         {/* Catch all route */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>

//       {/* Modal overlay for /signup when backgroundLocation exists */}
//       {state?.backgroundLocation && (
//         <Routes>
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/signin" element={<SignIn />} />
//         </Routes>
//       )}
//     </>
//   );
// };

// const App: React.FC = () => {
//   return (
//     <Router>
//       <AuthProvider>
//         <AppRoutes />
//       </AuthProvider>
//     </Router>
//   );
// };

// export default App;
