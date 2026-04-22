import { useEffect } from 'react';
import axios from 'axios';

/**
 * Custom hook to handle Spotify API authorization errors
 * Dispatches 'spotify-auth-error' event when user is unauthorized (403)
 */
export const useAuthErrorHandler = () => {
  useEffect(() => {
    const isAuthorizationProbeRequest = (url = '') =>
      url.includes('api.spotify.com/v1/me') || url.includes('/v1/me');

    // Add response interceptor to axios
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // Only treat 403s from user-profile endpoints as app access restriction.
        // Some feature endpoints (e.g. audio analysis) can return 403 independently.
        const status = error.response?.status;
        const requestUrl = error.config?.url || '';
        if (status === 403 && isAuthorizationProbeRequest(requestUrl)) {
          console.warn('User not authorized in Spotify developer dashboard');

          // Dispatch custom event for App component to listen to
          const event = new CustomEvent('spotify-auth-error', {
            detail: 'UNAUTHORIZED',
          });
          window.dispatchEvent(event);
        }

        return Promise.reject(error);
      },
    );

    // Cleanup interceptor on unmount
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);
};

export default useAuthErrorHandler;
