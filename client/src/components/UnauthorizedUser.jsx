import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme, mixins, Main, media } from '../styles';
import { logout } from '../spotify';
import { IconInfo } from './icons';

const { colors, fontSizes, spacing } = theme;

const UnauthorizedContainer = styled(Main)`
  ${mixins.flexCenter};
  flex-direction: column;
  min-height: 100vh;
  padding: ${spacing.lg};
  text-align: center;
`;

const IconWrapper = styled.div`
  margin-bottom: ${spacing.lg};
  svg {
    width: 80px;
    height: 80px;
    color: ${colors.orange};
  }
`;

const Title = styled.h1`
  font-size: ${fontSizes.xl};
  font-weight: 700;
  margin-bottom: ${spacing.md};
  color: ${colors.white};
  ${media.tablet`
    font-size: ${fontSizes.lg};
  `};
`;

const Description = styled.p`
  font-size: ${fontSizes.sm};
  color: ${colors.lightGrey};
  margin-bottom: ${spacing.md};
  max-width: 600px;
  line-height: 1.6;
`;

const ErrorMessage = styled.div`
  background-color: rgba(255, 87, 51, 0.1);
  border: 1px solid rgba(255, 87, 51, 0.3);
  border-radius: 8px;
  padding: ${spacing.md};
  margin: ${spacing.md} 0;
  color: #ff5733;
  font-size: ${fontSizes.xs};
  max-width: 600px;
`;

const InfoBox = styled.div`
  background-color: rgba(29, 185, 84, 0.1);
  border-left: 4px solid ${colors.green};
  border-radius: 4px;
  padding: ${spacing.md};
  margin: ${spacing.lg} 0;
  max-width: 600px;
  text-align: left;
  
  h3 {
    margin-top: 0;
    color: ${colors.green};
  }
  
  ol {
    padding-left: ${spacing.md};
    color: ${colors.lightGrey};
    font-size: ${fontSizes.xs};
    
    li {
      margin-bottom: ${spacing.xs};
      
      strong {
        color: ${colors.white};
      }
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${spacing.md};
  justify-content: center;
  margin-top: ${spacing.lg};
  flex-wrap: wrap;
`;

const Button = styled.button`
  background-color: ${props => props.secondary ? 'transparent' : colors.green};
  color: ${props => props.secondary ? colors.green : colors.white};
  border: ${props => props.secondary ? `1px solid ${colors.green}` : 'none'};
  border-radius: 30px;
  padding: ${spacing.sm} ${spacing.md};
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.secondary ? colors.green : 'rgba(29, 185, 84, 0.8)'};
    color: ${props => props.secondary ? colors.white : colors.white};
  }
`;

const SpotifyLink = styled.a`
  color: ${colors.green};
  text-decoration: none;
  font-weight: 700;
  
  &:hover {
    text-decoration: underline;
  }
`;

const UnauthorizedUser = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <UnauthorizedContainer>
      <IconWrapper>
        <IconInfo />
      </IconWrapper>

      <Title>Access Restricted</Title>

      <Description>
        This application is currently in <strong>development mode</strong> and requires explicit authorization from the Spotify API administrator.
      </Description>

      <ErrorMessage>
        🔒 Your Spotify account is not authorized to access this application yet.
      </ErrorMessage>

      <Description>
        The app developer needs to add your Spotify account to the authorized users list in their Spotify Developer Dashboard.
      </Description>

      <InfoBox>
        <h3>What the app developer needs to do:</h3>
        <ol>
          <li>
            Go to <SpotifyLink href="https://developer.spotify.com/dashboard" target="_blank" rel="noopener noreferrer">
              Spotify Developer Dashboard
            </SpotifyLink>
          </li>
          <li>
            Select their application
          </li>
          <li>
            Navigate to <strong>"User Management"</strong> or <strong>"Edit Settings"</strong>
          </li>
          <li>
            Add your Spotify email address to the <strong>"User" or "Authorized Users"</strong> list
          </li>
          <li>
            Save the changes
          </li>
        </ol>
      </InfoBox>

      <InfoBox>
        <h3>What you can do:</h3>
        <ol>
          <li>
            Contact the app developer and share your <strong>Spotify account email</strong>
          </li>
          <li>
            Wait for them to authorize your account
          </li>
          <li>
            Come back and try logging in again
          </li>
        </ol>
      </InfoBox>

      <ButtonGroup>
        <Button onClick={handleRetry}>Retry Access</Button>
        <Button secondary onClick={handleLogout}>Logout</Button>
      </ButtonGroup>
    </UnauthorizedContainer>
  );
};

export default UnauthorizedUser;
