// lib/sessionStorage.ts

/**
 * Saves the current path to session storage for auth redirects
 * @param path The path to save
 */
export const saveAuthRedirectPath = (path: string): void => {
    try {
        sessionStorage.setItem('authRedirectPath', path);
    } catch (error) {
        console.error('Failed to save redirect path to session storage:', error);
    }
};

/**
 * Gets the saved auth redirect path from session storage
 * @returns The saved path or null if not found
 */
export const getAuthRedirectPath = (): string | null => {
    try {
        return sessionStorage.getItem('authRedirectPath');
    } catch (error) {
        console.error('Failed to get redirect path from session storage:', error);
        return null;
    }
};

/**
 * Clears the saved auth redirect path from session storage
 */
export const clearAuthRedirectPath = (): void => {
    try {
        sessionStorage.removeItem('authRedirectPath');
    } catch (error) {
        console.error('Failed to clear redirect path from session storage:', error);
    }
};