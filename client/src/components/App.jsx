import React, { useState, useEffect } from 'react';
import { token } from '../spotify';

import LoginScreen from './LoginScreen';
import Profile from './Profile';

import styled from 'styled-components';
import { GlobalStyle } from '../styles';

const AppContainer = styled.div`
  height: 100%;
  min-height: 100vh;
`;

const App = () => {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    // Extract token from URL hash on mount
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const tokenFromUrl = params.get("access_token");

    if (tokenFromUrl) {
      setAccessToken(tokenFromUrl);
      // Clear the hash after extracting the token
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <AppContainer>
      <GlobalStyle />

      {accessToken ? <Profile /> : <LoginScreen />}
    </AppContainer>
  );
};

export default App;
