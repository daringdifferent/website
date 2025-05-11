// pages/AuthCallback.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AuthCallback: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleCallback = async () => {
            try {
                // Try to get the original requested URL from storage
                const intendedPath = sessionStorage.getItem('authRedirectPath');

                // Process the callback from OAuth or magic link
                const { data, error } = await supabase.auth.getSessionFromUrl();

                if (error) {
                    throw error;
                }

                if (data?.session) {
                    // Check if this is a password reset
                    if (window.location.hash.includes('type=recovery')) {
                        navigate('/update-password');
                    } else {
                        // For OAuth or magic link sign-in
                        // Navigate back to the intended URL if it exists, otherwise to home
                        if (intendedPath) {
                            // Clear the stored path
                            sessionStorage.removeItem('authRedirectPath');
                            // Add state to indicate coming from auth
                            navigate(intendedPath, { replace: true, state: { fromAuth: true } });
                        } else {
                            navigate('/', { replace: true });
                        }
                    }
                } else {
                    // If no session, go to sign in
                    navigate('/signin', {
                        state: intendedPath ? { from: { pathname: intendedPath } } : undefined
                    });
                }
            } catch (err: any) {
                console.error('Error during auth callback:', err);
                setError(err.message || 'An error occurred during authentication.');
            } finally {
                setLoading(false);
            }
        };

        handleCallback();
    }, [navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                {loading ? (
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
                        <h2 className="text-center text-xl font-medium text-gray-900">
                            Completing your sign in...
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Please wait while we authenticate your account.
                        </p>
                    </div>
                ) : error ? (
                    <div className="bg-white shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6 text-center">
                            <svg className="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <h3 className="mt-2 text-lg font-medium text-gray-900">Authentication Error</h3>
                            <p className="mt-1 text-sm text-gray-500">{error}</p>
                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={() => navigate('/signin')}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Back to sign in
                                </button>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default AuthCallback;