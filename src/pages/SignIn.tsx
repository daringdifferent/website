// pages/SignIn.tsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

// Animation variants
const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [resetSent, setResetSent] = useState(false);

    const { signIn, resetPassword } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Get the auth message and from path from location state
    const state = location.state as {
        from?: { pathname: string },
        authRequired?: boolean,
        authMessage?: string
    };

    // Get the return URL from location state or default to homepage
    const from = state?.from?.pathname || '/';
    const authMessage = state?.authMessage || null;

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const { error } = await signIn(email, password);

            if (error) {
                throw error;
            }

            // Navigate to the page the user was trying to access, or home
            navigate(from, { replace: true });
        } catch (err: any) {
            setError(err.message || 'An error occurred during sign in.');
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!email) {
            setError('Please enter your email address.');
            setLoading(false);
            return;
        }

        try {
            const { error } = await resetPassword(email);

            if (error) {
                throw error;
            }

            setResetSent(true);
        } catch (err: any) {
            setError(err.message || 'Failed to send password reset email.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
            {/* Background with gradients and decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A2240] via-[#061830] to-[#072b4a] overflow-hidden">
                {/* Animated gradient background */}
                <motion.div
                    className="absolute inset-0 opacity-30"
                    initial={{ backgroundPosition: "0% 0%" }}
                    animate={{ backgroundPosition: "100% 100%" }}
                    transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                    style={{
                        backgroundSize: "200% 200%",
                        backgroundImage: "radial-gradient(circle at 30% 70%, rgba(0,178,169,0.4) 0%, rgba(10,34,64,0) 50%), radial-gradient(circle at 80% 20%, rgba(255,158,27,0.4) 0%, rgba(10,34,64,0) 50%)"
                    }}
                />

                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDJ2MmgtMnpNNDAgMzRoMnYyaC0yek00NCAzNGgydjJoLTJ6TTM0IDMwaDJ2MmgtMnpNMzQgMjZoMnYyaC0yek0zNCAyMmgydjJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10" />

                {/* Floating elements */}
                <div className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-[#FF9E1B]/10 blur-3xl transform -translate-y-1/2" />
                <div className="absolute bottom-[30%] right-[5%] w-96 h-96 rounded-full bg-[#00B2A9]/10 blur-3xl" />
            </div>

            <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.8 }}
                className="max-w-md w-full relative z-10"
            >
                <div className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
                    <div className="px-8 py-12">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-white mb-3">
                                {showResetPassword ? "Reset your password" : "Welcome back"}
                            </h2>
                            <div className="h-1 w-20 bg-[#FF9E1B] mx-auto rounded-full mb-4"></div>
                            <p className="text-white/70">
                                {showResetPassword ? (
                                    <>
                                        Remember your password?{' '}
                                        <button
                                            onClick={() => setShowResetPassword(false)}
                                            className="font-medium text-[#FF9E1B] hover:text-[#FFBE5C] transition-colors"
                                        >
                                            Sign in
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        Don't have an account?{' '}
                                        <Link
                                            to="/signup"
                                            state={location.state}
                                            className="font-medium text-[#FF9E1B] hover:text-[#FFBE5C] transition-colors"
                                        >
                                            Create one
                                        </Link>
                                    </>
                                )}
                            </p>
                        </div>

                        {/* Auth message when redirected from protected route */}
                        {authMessage && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/10 backdrop-blur-sm border-l-4 border-[#FF9E1B] p-4 rounded-r-md mb-6"
                            >
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <Lock className="h-5 w-5 text-[#FF9E1B]" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-white/90">{authMessage}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-[#F15A5A]/10 backdrop-blur-sm border-l-4 border-[#F15A5A] p-4 rounded-r-md mb-6"
                            >
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <AlertCircle className="h-5 w-5 text-[#F15A5A]" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-white/90">{error}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {resetSent && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-[#00B2A9]/10 backdrop-blur-sm border-l-4 border-[#00B2A9] p-4 rounded-r-md mb-6"
                            >
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <CheckCircle className="h-5 w-5 text-[#00B2A9]" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-white/90">
                                            Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {showResetPassword ? (
                            <form className="space-y-6" onSubmit={handleResetPassword}>
                                <div>
                                    <label htmlFor="email-address" className="block text-sm font-medium text-white/80 mb-2">
                                        Email address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-white/40" />
                                        </div>
                                        <input
                                            id="email-address"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="appearance-none block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-xl placeholder-white/40 text-white focus:outline-none focus:ring-2 focus:ring-[#FF9E1B] focus:border-[#FF9E1B] transition-all"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <motion.div
                                        className="group relative"
                                        whileHover="hover"
                                    >
                                        <motion.div
                                            className="absolute inset-0 rounded-xl bg-[#FF9E1B] blur-md opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                                            variants={{
                                                hover: { scale: 1.05 }
                                            }}
                                        />
                                        <motion.button
                                            type="submit"
                                            disabled={loading}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="relative w-full py-3 rounded-xl bg-[#FF9E1B] text-[#0A2240] font-bold shadow-lg hover:shadow-xl transform transition-all z-10 flex items-center justify-center gap-2"
                                        >
                                            {loading ? 'Sending...' : 'Send reset instructions'}
                                        </motion.button>
                                    </motion.div>
                                </div>
                            </form>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSignIn}>
                                <div>
                                    <label htmlFor="email-address" className="block text-sm font-medium text-white/80 mb-2">
                                        Email address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-white/40" />
                                        </div>
                                        <input
                                            id="email-address"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="appearance-none block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-xl placeholder-white/40 text-white focus:outline-none focus:ring-2 focus:ring-[#FF9E1B] focus:border-[#FF9E1B] transition-all"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-white/40" />
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="appearance-none block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-xl placeholder-white/40 text-white focus:outline-none focus:ring-2 focus:ring-[#FF9E1B] focus:border-[#FF9E1B] transition-all"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 text-[#FF9E1B] focus:ring-[#FF9E1B] border-white/30 rounded bg-white/10"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-white/70">
                                            Remember me
                                        </label>
                                    </div>

                                    <div className="text-sm">
                                        <button
                                            type="button"
                                            onClick={() => setShowResetPassword(true)}
                                            className="font-medium text-[#FF9E1B] hover:text-[#FFBE5C] transition-colors"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <motion.div
                                        className="group relative"
                                        whileHover="hover"
                                    >
                                        <motion.div
                                            className="absolute inset-0 rounded-xl bg-[#FF9E1B] blur-md opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                                            variants={{
                                                hover: { scale: 1.05 }
                                            }}
                                        />
                                        <motion.button
                                            type="submit"
                                            disabled={loading}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="relative w-full py-3 rounded-xl bg-[#FF9E1B] text-[#0A2240] font-bold shadow-lg hover:shadow-xl transform transition-all z-10 flex items-center justify-center gap-2"
                                        >
                                            {loading ? 'Signing in...' : (
                                                <>
                                                    Sign in
                                                    <motion.div
                                                        animate={{ x: [0, 4, 0] }}
                                                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                                                    >
                                                        <ArrowRight className="w-5 h-5" />
                                                    </motion.div>
                                                </>
                                            )}
                                        </motion.button>
                                    </motion.div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SignIn;