import ComingSoon from "./components/comingSoon";

export default function App() {
  return <ComingSoon />;
}

// App.tsx;
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
// import comingSoon from "./components/comingSoon";

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
