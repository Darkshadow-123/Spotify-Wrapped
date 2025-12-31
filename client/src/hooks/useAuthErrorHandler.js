import { useEffect } from 'react';
import axios from 'axios';

/**
 * Custom hook to handle Spotify API authorization errors
 * Dispatches 'spotify-auth-error' event when user is unauthorized (403)
 */
export const useAuthErrorHandler = () => {
  useEffect(() => {
    // Add response interceptor to axios
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // Check if error is 403 Forbidden (Unauthorized by Spotify admin)
        if (error.response?.status === 403) {
          console.warn('User not authorized in Spotify developer dashboard');
          
          // Dispatch custom event for App component to listen to
          const event = new CustomEvent('spotify-auth-error', {
            detail: 'UNAUTHORIZED'
          });
          window.dispatchEvent(event);
        }
        
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor on unmount
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);
};

export default useAuthErrorHandler;
