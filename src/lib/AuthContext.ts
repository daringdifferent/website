// lib/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { useNavigate } from 'react-router-dom';

// Type definitions
type AuthContextType = {
    session: Session | null;
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<{
        error: Error | null;
        data: { user: User | null; session: Session | null } | null;
    }>;
    signUp: (email: string, password: string) => Promise<{
        error: Error | null;
        data: { user: User | null; session: Session | null } | null;
    }>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<{
        error: Error | null;
        data: {} | null;
    }>;
    updatePassword: (newPassword: string) => Promise<{
        error: Error | null;
        data: { user: User | null } | null;
    }>;
};

// Create the auth context with undefined default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Auth provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Get initial session
        const getInitialSession = async () => {
            const { data } = await supabase.auth.getSession();
            const initialSession = data.session;
            setSession(initialSession);
            setUser(initialSession?.user ?? null);
            setLoading(false);
        };

        getInitialSession();

        // Listen for auth changes
        const { data } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Cleanup subscription
        return () => {
            data.subscription.unsubscribe();
        };
    }, []);

    // Sign in with email and password
    const signIn = async (email: string, password: string) => {
        return await supabase.auth.signInWithPassword({ email, password });
    };

    // Sign up with email and password
    const signUp = async (email: string, password: string) => {
        return await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`
            }
        });
    };

    // Sign out
    const signOut = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    // Reset password
    const resetPassword = async (email: string) => {
        return await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/update-password`,
        });
    };

    // Update password
    const updatePassword = async (newPassword: string) => {
        return await supabase.auth.updateUser({ password: newPassword });
    };

    const contextValue = {
        session,
        user,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
    };

    return (
        React.createElement(
            AuthContext.Provider,
            { value: contextValue },
            !loading ? children : null
        )
    );
};