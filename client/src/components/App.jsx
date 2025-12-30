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
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    const accessToken = params.get("access_token");

    if (accessToken) {
      setAccessToken(accessToken);
      window.history.replaceState({}, document.title, "/");
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
