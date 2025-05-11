// components/ProtectedRoute.tsx
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { saveAuthRedirectPath } from '../lib/sessionStorage';

interface ProtectedRouteProps {
    redirectPath?: string;
    children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    redirectPath = '/signin',
    children,
}) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Extract the video ID from pathname if it exists
    const getRouteContext = () => {
        if (location.pathname.includes('/videos')) {
            return 'view this video';
        }
        if (location.pathname.includes('/subscribe')) {
            return 'access subscription content';
        }
        return 'access this content';
    };

    // Save the path for redirect after auth
    useEffect(() => {
        if (!user && !loading) {
            saveAuthRedirectPath(location.pathname);
        }
    }, [user, loading, location.pathname]);

    if (loading) {
        // You can replace this with a loading component
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-t-4 border-b-4 border-indigo-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        // Redirect to signin with location state containing:
        // 1. The path they were trying to access (for redirect after auth)
        // 2. A message explaining why they're being redirected
        return (
            <Navigate
                to={redirectPath}
                replace
                state={{
                    from: location,
                    authRequired: true,
                    authMessage: `Please sign in or create an account to ${getRouteContext()}.`
                }}
            />
        );
    }

    return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;