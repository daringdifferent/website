// pages/UpdatePassword.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { motion } from 'framer-motion';
import {
    Lock,
    ShieldCheck,
    AlertCircle,
    CheckCircle,
    ArrowLeft,
    ArrowRight,
    Eye,
    EyeOff
} from 'lucide-react';

// Animation variants
const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
};

const UpdatePassword: React.FC = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { updatePassword, user } = useAuth();
    const navigate = useNavigate();

    // If no user, redirect to sign in
    useEffect(() => {
        // Check if this page was accessed from a password reset link
        const hash = window.location.hash;
        if (!hash && !user) {
            navigate('/signin');
        }
    }, [user, navigate]);

    const validatePassword = () => {
        if (password.length < 8) {
            return 'Password must be at least 8 characters long.';
        }
        if (!/[A-Z]/.test(password)) {
            return 'Password must contain at least one uppercase letter.';
        }
        if (!/[a-z]/.test(password)) {
            return 'Password must contain at least one lowercase letter.';
        }
        if (!/[0-9]/.test(password)) {
            return 'Password must contain at least one number.';
        }
        if (!/[!@#$%^&*]/.test(password)) {
            return 'Password must contain at least one special character (!@#$%^&*).';
        }
        return null;
    };

    const getPasswordStrength = () => {
        let points = 0;
        if (password.length >= 8) points++;
        if (password.length >= 12) points++;
        if (/[A-Z]/.test(password)) points++;
        if (/[a-z]/.test(password)) points++;
        if (/[0-9]/.test(password)) points++;
        if (/[!@#$%^&*]/.test(password)) points++;

        if (points <= 2) return { text: "Weak", color: "#F15A5A", width: "25%" };
        if (points <= 4) return { text: "Medium", color: "#FF9E1B", width: "50%" };
        if (points === 5) return { text: "Strong", color: "#00B2A9", width: "75%" };
        return { text: "Very Strong", color: "#4CAF50", width: "100%" };
    };

    const passwordStrength = getPasswordStrength();

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Validate password strength
        const passwordError = validatePassword();
        if (passwordError) {
            setError(passwordError);
            return;
        }

        setLoading(true);

        try {
            const { error } = await updatePassword(password);

            if (error) {
                throw error;
            }

            setSuccessMessage('Your password has been updated successfully!');

            // Redirect to profile after a short delay
            setTimeout(() => {
                navigate('/profile');
            }, 3000);

        } catch (err: any) {
            setError(err.message || 'An error occurred while updating your password.');
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
                                Update Your Password
                            </h2>
                            <div className="h-1 w-24 bg-[#00B2A9] mx-auto rounded-full mb-4"></div>
                            <p className="text-white/70">
                                Create a strong, secure password to protect your account
                            </p>
                        </div>

                        <Link to="/profile" className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            <span>Back to profile</span>
                        </Link>

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

                        {successMessage && (
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
                                        <p className="text-sm text-white/90">{successMessage}</p>
                                        <p className="text-xs text-white/70 mt-1">Redirecting to your profile...</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        <form className="space-y-6" onSubmit={handleUpdatePassword}>
                            <motion.div
                                variants={fadeInUp}
                                transition={{ delay: 0.1 }}
                            >
                                <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                                    New password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-white/40" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        required
                                        className="appearance-none block w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl placeholder-white/40 text-white focus:outline-none focus:ring-2 focus:ring-[#00B2A9] focus:border-[#00B2A9] transition-all"
                                        placeholder="Enter new password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white/60 transition-colors"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>

                                {/* Password strength indicator */}
                                {password && (
                                    <div className="mt-2">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-xs text-white/60">Password strength:</span>
                                            <span className="text-xs" style={{ color: passwordStrength.color }}>{passwordStrength.text}</span>
                                        </div>
                                        <div className="w-full bg-white/10 rounded-full h-1.5">
                                            <motion.div
                                                className="h-1.5 rounded-full"
                                                style={{
                                                    backgroundColor: passwordStrength.color,
                                                    width: "0%"
                                                }}
                                                animate={{ width: passwordStrength.width }}
                                                transition={{ duration: 0.5 }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </motion.div>

                            <motion.div
                                variants={fadeInUp}
                                transition={{ delay: 0.2 }}
                            >
                                <label htmlFor="confirm-password" className="block text-sm font-medium text-white/80 mb-2">
                                    Confirm new password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <ShieldCheck className="h-5 w-5 text-white/40" />
                                    </div>
                                    <input
                                        id="confirm-password"
                                        name="confirm-password"
                                        type={showConfirmPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        required
                                        className="appearance-none block w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl placeholder-white/40 text-white focus:outline-none focus:ring-2 focus:ring-[#00B2A9] focus:border-[#00B2A9] transition-all"
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white/60 transition-colors"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {password && confirmPassword && password !== confirmPassword && (
                                    <p className="mt-1 text-xs text-[#F15A5A]">Passwords don't match</p>
                                )}
                            </motion.div>

                            <motion.div
                                variants={fadeInUp}
                                transition={{ delay: 0.3 }}
                                className="bg-white/5 rounded-xl p-4 border border-white/10"
                            >
                                <div className="text-sm text-white/80">
                                    <div className="flex items-center mb-2">
                                        <ShieldCheck className="h-4 w-4 text-[#00B2A9] mr-2" />
                                        <span className="font-medium">Password requirements:</span>
                                    </div>
                                    <ul className="space-y-1 text-sm text-white/60 pl-6">
                                        <li className="flex items-center">
                                            <div className={`w-1.5 h-1.5 rounded-full mr-2 ${password.length >= 8 ? 'bg-[#00B2A9]' : 'bg-white/40'}`}></div>
                                            At least 8 characters long
                                        </li>
                                        <li className="flex items-center">
                                            <div className={`w-1.5 h-1.5 rounded-full mr-2 ${/[A-Z]/.test(password) ? 'bg-[#00B2A9]' : 'bg-white/40'}`}></div>
                                            Include at least one uppercase letter
                                        </li>
                                        <li className="flex items-center">
                                            <div className={`w-1.5 h-1.5 rounded-full mr-2 ${/[a-z]/.test(password) ? 'bg-[#00B2A9]' : 'bg-white/40'}`}></div>
                                            Include at least one lowercase letter
                                        </li>
                                        <li className="flex items-center">
                                            <div className={`w-1.5 h-1.5 rounded-full mr-2 ${/[0-9]/.test(password) ? 'bg-[#00B2A9]' : 'bg-white/40'}`}></div>
                                            Include at least one number
                                        </li>
                                        <li className="flex items-center">
                                            <div className={`w-1.5 h-1.5 rounded-full mr-2 ${/[!@#$%^&*]/.test(password) ? 'bg-[#00B2A9]' : 'bg-white/40'}`}></div>
                                            Include at least one special character (!@#$%^&*)
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={fadeInUp}
                                transition={{ delay: 0.4 }}
                                className="pt-4"
                            >
                                <motion.div
                                    className="group relative"
                                    whileHover="hover"
                                >
                                    <motion.div
                                        className="absolute inset-0 rounded-xl bg-[#00B2A9] blur-md opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                                        variants={{
                                            hover: { scale: 1.05 }
                                        }}
                                    />
                                    <motion.button
                                        type="submit"
                                        disabled={loading}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="relative w-full py-3 rounded-xl bg-[#00B2A9] text-white font-bold shadow-lg hover:shadow-xl transform transition-all z-10 flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <motion.div
                                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                />
                                                <span>Updating...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Update Password</span>
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
                            </motion.div>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default UpdatePassword;