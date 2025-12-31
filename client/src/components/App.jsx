import React, { useState, useEffect } from 'react';
import { token } from '../spotify';

import LoginScreen from './LoginScreen';
import Profile from './Profile';
import UnauthorizedUser from './UnauthorizedUser';

import styled from 'styled-components';
import { GlobalStyle } from '../styles';

const AppContainer = styled.div`
  height: 100%;
  min-height: 100vh;
`;

const App = () => {
  const [accessToken, setAccessToken] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    // Extract token from URL hash on mount
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const tokenFromUrl = params.get("access_token");

    if (tokenFromUrl) {
      setAccessToken(tokenFromUrl);
      setIsAuthorized(true);
      // Clear the hash after extracting the token
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Listen for authorization errors from child components
  useEffect(() => {
    const handleAuthError = (event) => {
      if (event.detail === 'UNAUTHORIZED') {
        setIsAuthorized(false);
      }
    };

    window.addEventListener('spotify-auth-error', handleAuthError);
    return () => window.removeEventListener('spotify-auth-error', handleAuthError);
  }, []);

  return (
    <AppContainer>
      <GlobalStyle />

      {!accessToken && <LoginScreen />}
      {accessToken && isAuthorized === false && <UnauthorizedUser />}
      {accessToken && isAuthorized !== false && <Profile />}
    </AppContainer>
  );
};

export default App;
