# Unauthorized User Component - Implementation Guide

## Overview
A new **UnauthorizedUser** component has been created to handle users who are not registered in the Spotify Developer Dashboard. This provides a helpful, user-friendly error page with instructions for both the user and the app developer.

## Components Created/Modified

### 1. **UnauthorizedUser.jsx** (NEW)
**Location:** `client/src/components/UnauthorizedUser.jsx`

A comprehensive UI component that displays when a user isn't authorized by the Spotify admin. Features:
- 🔒 Clear messaging about the authorization issue
- 📋 Step-by-step instructions for the app developer
- 📖 Guidance for end-users on what to do
- 🔄 "Retry Access" button to try again
- 🚪 "Logout" button to exit

**Styling:**
- Uses the existing theme colors and mixins
- Responsive design for mobile/tablet
- Info boxes with visual hierarchy
- Color-coded sections (orange for error, green for success)

### 2. **useAuthErrorHandler.js** (NEW)
**Location:** `client/src/hooks/useAuthErrorHandler.js`

A custom React hook that:
- Intercepts all axios API responses
- Detects 403 Forbidden errors (Spotify's response for unauthorized users)
- Dispatches a custom `'spotify-auth-error'` event
- Allows the App component to react to authorization failures

### 3. **App.jsx** (UPDATED)
**Changes:**
- Added `isAuthorized` state to track authorization status
- Imports the `UnauthorizedUser` component
- Added event listener for `'spotify-auth-error'` events
- Updated rendering logic to show:
  - `LoginScreen` when no token
  - `UnauthorizedUser` when 403 error occurs
  - `Profile` when properly authorized

### 4. **Profile.jsx** (UPDATED)
**Changes:**
- Added `useAuthErrorHandler()` hook to Profile component
- This ensures all API calls within Profile routes are monitored

## How It Works

### Flow Diagram
```
User Logs In
    ↓
Token received & stored
    ↓
Profile component loads & starts API calls
    ↓
API call returns 403 Forbidden?
    ├─ YES → UnauthorizedUser component displays
    └─ NO → User sees their Spotify data
```

### Step-by-Step Process

1. **User not in dashboard**
   - User authenticates with Spotify successfully
   - Gets an access token
   - Token is stored in state

2. **First API call fails**
   - Profile component makes an API request to get user data
   - Spotify API returns 403 Forbidden (user not in authorized users list)
   - axios interceptor catches the 403 response

3. **Error handled gracefully**
   - Custom event `'spotify-auth-error'` is dispatched
   - App component listens and catches this event
   - Sets `isAuthorized` to `false`

4. **User sees helpful message**
   - UnauthorizedUser component renders
   - Provides clear instructions for both user and developer
   - Includes links to Spotify Developer Dashboard

## What Users Will See

### Error Message Example
```
🔒 Access Restricted

This application is currently in development mode and requires 
explicit authorization from the Spotify API administrator.

🔒 Your Spotify account is not authorized to access this 
application yet.

[Developer instructions box]
[User instructions box]

[Retry Access] [Logout]
```

## For App Developers

The UnauthorizedUser component includes step-by-step instructions:

1. Go to https://developer.spotify.com/dashboard
2. Select the application
3. Navigate to "User Management" or "Edit Settings"
4. Add the user's Spotify email to authorized users
5. Save changes

## For End-Users

Users are instructed to:
1. Get their Spotify account email
2. Contact the app developer
3. Wait for authorization
4. Retry access

## Error Scenarios Handled

| Scenario | Behavior |
|----------|----------|
| No token | Shows LoginScreen |
| Valid token, user authorized | Shows Profile with data |
| Valid token, user NOT authorized (403) | Shows UnauthorizedUser |
| Token expired | Handled by existing refresh logic |
| Network error | Existing error handling |

## Testing the Feature

To test in development:

1. Use a Spotify account that's NOT in your app's authorized users list
2. Log in normally
3. The app will authenticate successfully but fail on first API call
4. UnauthorizedUser component should display with all instructions

## Benefits

✅ **User-Friendly** - Clear explanation instead of blank/error page
✅ **Self-Explanatory** - Guides both developers and users
✅ **Non-Breaking** - Works alongside existing error handling
✅ **Professional** - Branded, styled component
✅ **Actionable** - Provides concrete next steps
✅ **Responsive** - Works on all devices

## Dependencies Used

- React hooks (useState, useEffect)
- React Router (useNavigate)
- styled-components (existing)
- axios (existing)
- Custom theme/icons (existing)
