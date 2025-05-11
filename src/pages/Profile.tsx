// pages/Profile.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import {
    User,
    Mail,
    Lock,
    Upload,
    Camera,
    LogOut,
    CheckCircle,
    AlertCircle,
    Edit,
    Save,
    ArrowRight
} from 'lucide-react';

// Animation variants
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

const staggerContainer = {
    initial: {},
    animate: {
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
};

interface UserProfile {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url: string | null;
}

const Profile: React.FC = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [profile, setProfile] = useState<UserProfile>({
        id: user?.id || '',
        first_name: '',
        last_name: '',
        avatar_url: null
    });

    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    // Fetch user profile on component mount
    useEffect(() => {
        if (!user) {
            navigate('/signin');
            return;
        }

        const getProfile = async () => {
            try {
                setLoading(true);

                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (error) {
                    throw error;
                }

                if (data) {
                    setProfile({
                        id: data.id,
                        first_name: data.first_name || '',
                        last_name: data.last_name || '',
                        avatar_url: data.avatar_url
                    });

                    if (data.avatar_url) {
                        setAvatarPreview(data.avatar_url);
                    }
                }
            } catch (error: any) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        getProfile();
    }, [user, navigate]);

    const handleLogout = async () => {
        await signOut();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // Create a preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            setAvatarFile(file);
        }
    };

    const uploadAvatar = async (): Promise<string | null> => {
        if (!avatarFile || !user) return null;

        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${user.id}-${Math.random().toString(36).slice(2)}.${fileExt}`;
        const filePath = `avatars/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, avatarFile);

        if (uploadError) {
            throw uploadError;
        }

        const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
        return data.publicUrl;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!user) return;

        try {
            setUpdating(true);

            let avatarUrl = profile.avatar_url;

            // Upload new avatar if one was selected
            if (avatarFile) {
                avatarUrl = await uploadAvatar();
            }

            // Update profile in the database
            const { error } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    first_name: profile.first_name,
                    last_name: profile.last_name,
                    avatar_url: avatarUrl,
                    updated_at: new Date()
                });

            if (error) {
                throw error;
            }

            setSuccess('Profile updated successfully!');
            setProfile({ ...profile, avatar_url: avatarUrl });
        } catch (err: any) {
            console.error('Error updating profile:', err);
            setError(err.message || 'An error occurred while updating your profile.');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F7F9FC]">
                <motion.div
                    className="w-16 h-16 rounded-full border-4 border-[#FF9E1B]/30 border-t-[#FF9E1B]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F7F9FC] pt-24 pb-16 px-4">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-[#0A2240] to-[#061830] -z-10" />
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#FF9E1B]/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 -z-10" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#00B2A9]/5 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3 -z-10" />

            <div className="max-w-4xl mx-auto">
                <motion.div
                    variants={fadeInDown}
                    initial="initial"
                    animate="animate"
                    className="mb-8 text-center"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-[#0A2240] relative inline-block">
                        Your Profile
                        <motion.div
                            className="absolute -bottom-2 left-0 h-1 bg-[#FF9E1B] w-full rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        />
                    </h1>
                    <p className="text-[#0A2240]/70 mt-2">
                        Manage your personal information and preferences
                    </p>
                </motion.div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 bg-[#F15A5A]/10 border-l-4 border-[#F15A5A] p-4 rounded-r-md"
                    >
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <AlertCircle className="h-5 w-5 text-[#F15A5A]" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-[#0A2240]">{error}</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 bg-[#00B2A9]/10 border-l-4 border-[#00B2A9] p-4 rounded-r-md"
                    >
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <CheckCircle className="h-5 w-5 text-[#00B2A9]" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-[#0A2240]">{success}</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    className="bg-white rounded-3xl shadow-xl overflow-hidden"
                >
                    <div className="p-6 md:p-8 relative">
                        {/* Profile header with animated gradient background */}
                        <div className="absolute top-0 left-0 w-full h-32 overflow-hidden">
                            <motion.div
                                className="absolute inset-0"
                                style={{
                                    background: "linear-gradient(135deg, #0A2240 0%, #00B2A9 100%)",
                                }}
                                animate={{
                                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                }}
                                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoMnYyaC0yek00MCAzNGgydjJoLTJ6TTQ0IDM0aDJ2MmgtMnpNMzQgMzBoMnYyaC0yek0zNCAyNmgydjJoLTJ6TTM0IDIyaDJ2MmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10" />
                        </div>

                        {/* Profile avatar and basic info */}
                        <div className="pt-36 text-center">
                            <motion.div
                                className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-24"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="relative">
                                    <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                                        {avatarPreview ? (
                                            <img
                                                src={avatarPreview}
                                                alt="User avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-[#F7F9FC] flex items-center justify-center">
                                                <User className="w-12 h-12 text-[#0A2240]/30" />
                                            </div>
                                        )}
                                    </div>

                                    <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 w-8 h-8 bg-[#FF9E1B] rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-[#FFBE5C] transition-colors">
                                        <Camera className="w-4 h-4 text-white" />
                                        <input
                                            id="avatar-upload"
                                            name="avatar-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleAvatarChange}
                                        />
                                    </label>
                                </div>
                            </motion.div>

                            <h2 className="text-2xl font-bold text-[#0A2240]">
                                {profile.first_name || profile.last_name ?
                                    `${profile.first_name} ${profile.last_name}` :
                                    "Complete Your Profile"}
                            </h2>

                            <div className="flex items-center justify-center mt-1 text-[#0A2240]/60">
                                <Mail className="w-4 h-4 mr-1.5" />
                                <span>{user?.email}</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* First Name */}
                                <motion.div
                                    variants={fadeInUp}
                                    transition={{ delay: 0.1 }}
                                >
                                    <label htmlFor="first_name" className="block text-sm font-medium text-[#0A2240]/70 mb-2">
                                        First name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-[#0A2240]/30" />
                                        </div>
                                        <input
                                            type="text"
                                            name="first_name"
                                            id="first_name"
                                            value={profile.first_name}
                                            onChange={handleChange}
                                            className="appearance-none block w-full pl-10 pr-3 py-3 bg-[#F7F9FC] border border-[#E1E5EB] rounded-xl text-[#0A2240] focus:outline-none focus:ring-2 focus:ring-[#FF9E1B] focus:border-[#FF9E1B] transition-all"
                                            placeholder="Your first name"
                                        />
                                    </div>
                                </motion.div>

                                {/* Last Name */}
                                <motion.div
                                    variants={fadeInUp}
                                    transition={{ delay: 0.2 }}
                                >
                                    <label htmlFor="last_name" className="block text-sm font-medium text-[#0A2240]/70 mb-2">
                                        Last name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-[#0A2240]/30" />
                                        </div>
                                        <input
                                            type="text"
                                            name="last_name"
                                            id="last_name"
                                            value={profile.last_name}
                                            onChange={handleChange}
                                            className="appearance-none block w-full pl-10 pr-3 py-3 bg-[#F7F9FC] border border-[#E1E5EB] rounded-xl text-[#0A2240] focus:outline-none focus:ring-2 focus:ring-[#FF9E1B] focus:border-[#FF9E1B] transition-all"
                                            placeholder="Your last name"
                                        />
                                    </div>
                                </motion.div>

                                {/* Email (non-editable) */}
                                <motion.div
                                    className="md:col-span-2"
                                    variants={fadeInUp}
                                    transition={{ delay: 0.3 }}
                                >
                                    <label className="block text-sm font-medium text-[#0A2240]/70 mb-2">
                                        Email address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-[#0A2240]/30" />
                                        </div>
                                        <input
                                            type="email"
                                            disabled
                                            value={user?.email || ''}
                                            className="appearance-none block w-full pl-10 pr-3 py-3 bg-[#F7F9FC]/50 border border-[#E1E5EB] rounded-xl text-[#0A2240]/70 focus:outline-none cursor-not-allowed"
                                        />
                                    </div>
                                    <p className="mt-1 text-xs text-[#0A2240]/50">Your email address cannot be changed</p>
                                </motion.div>
                            </div>

                            <motion.div
                                className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4"
                                variants={fadeInUp}
                                transition={{ delay: 0.4 }}
                            >
                                <motion.button
                                    type="button"
                                    onClick={handleLogout}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-5 py-2.5 bg-white border border-[#E1E5EB] rounded-xl text-[#0A2240] font-medium shadow-sm hover:bg-[#F7F9FC] transition-colors flex items-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign out
                                </motion.button>

                                <div className="flex gap-4">
                                    <Link to="/update-password">
                                        <motion.button
                                            type="button"
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="px-5 py-2.5 bg-[#0A2240] rounded-xl text-white font-medium shadow-sm hover:bg-[#061830] transition-colors flex items-center gap-2"
                                        >
                                            <Lock className="w-4 h-4" />
                                            Change Password
                                        </motion.button>
                                    </Link>

                                    <motion.div
                                        className="group relative"
                                        whileHover="hover"
                                    >
                                        <motion.div
                                            className="absolute inset-0 rounded-xl bg-[#FF9E1B] blur-md opacity-0 group-hover:opacity-70 transition-all duration-300"
                                            variants={{
                                                hover: { opacity: 0.7, scale: 1.05 }
                                            }}
                                        />
                                        <motion.button
                                            type="submit"
                                            disabled={updating}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="relative z-10 px-5 py-2.5 bg-[#FF9E1B] rounded-xl text-[#0A2240] font-medium shadow-sm hover:bg-[#FFBE5C] transition-colors flex items-center gap-2"
                                        >
                                            {updating ? (
                                                <>
                                                    <motion.div
                                                        className="w-4 h-4 border-2 border-[#0A2240] border-t-transparent rounded-full"
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    />
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="w-4 h-4" />
                                                    Save Changes
                                                </>
                                            )}
                                        </motion.button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </form>
                    </div>
                </motion.div>

                {/* Additional sections could be added here */}
                <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.6 }}
                    className="mt-8 bg-white rounded-3xl shadow-lg overflow-hidden p-6"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-[#0A2240]">Account Settings</h3>
                        <div className="h-1 w-16 bg-[#FF9E1B] rounded-full"></div>
                    </div>

                    <div className="space-y-4">
                        <Link to="/update-password">
                            <motion.div
                                whileHover={{ x: 5 }}
                                className="p-4 border border-[#E1E5EB] rounded-xl hover:bg-[#F7F9FC] transition-colors flex items-center justify-between"
                            >
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-[#0A2240]/10 flex items-center justify-center mr-4">
                                        <Lock className="w-5 h-5 text-[#0A2240]" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-[#0A2240]">Password & Security</h4>
                                        <p className="text-sm text-[#0A2240]/60">Update your password and secure your account</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-[#0A2240]/40" />
                            </motion.div>
                        </Link>

                        {/* Add more settings options as needed */}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;