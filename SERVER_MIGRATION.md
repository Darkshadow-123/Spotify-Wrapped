# Server-Side Migration Notes

## Changes Made to Server

### 1. **Deprecated Buffer Constructor** ✅
**Issue**: Using `new Buffer.from()` is deprecated in newer Node versions
**Fixed in**: `server/index.js` (lines for authorization headers)

Changed:
```javascript
// OLD - deprecated
Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`

// NEW - correct
Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
```

This fix was applied in 3 locations:
- Line ~124: In `/callback` endpoint
- Line ~162: In `/refresh_token` endpoint

### 2. **Frontend Build Path** ✅
**Issue**: Server was looking for `client/public/index.html` but Vite outputs to `client/build/`
**Fixed in**: `server/index.js` (final catch-all route)

Changed:
```javascript
// OLD - CRA structure
response.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));

// NEW - Vite structure
response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
```

### 3. **Static Files Serving**
The server already correctly serves from `client/build`:
```javascript
app.use(express.static(path.resolve(__dirname, '../client/build')));
```

This is compatible with Vite's default `outDir: 'build'` configuration.

---

## Server Dependencies Status

All existing server dependencies remain compatible:
- ✅ `express` - Web framework
- ✅ `dotenv` - Environment variables
- ✅ `cors` - Cross-origin requests
- ✅ `cookie-parser` - Authentication cookies
- ✅ `request` - HTTP requests to Spotify API
- ✅ `connect-history-api-fallback` - SPA routing

**No server dependency updates needed.**

---

## Environment Setup

### Development Setup

1. **Create `.env` file in root directory** (NOT `.env.local`):
```bash
# Copy from template
cp .env.example .env
```

2. **Fill in your Spotify credentials**:
```dotenv
# Get from https://developer.spotify.com/dashboard
CLIENT_ID=your_spotify_client_id
CLIENT_SECRET=your_spotify_client_secret

PORT=8888
NODE_ENV=development
REDIRECT_URI=http://localhost:8888/callback
FRONTEND_URI=http://localhost:3000
```

3. **Load variables when starting**:
```bash
# PowerShell
$env:NODE_ENV="development"; npm run server

# Or use a .env loader
npm install -g dotenv-cli
dotenv -e .env node server/index.js
```

### Production Setup (Heroku/Deployment)

1. **Add environment variables to your deployment platform**:
   - Heroku: Use `heroku config:set KEY=value`
   - Environment file management
   - CI/CD platform secrets

2. **Key variables**:
   - `CLIENT_ID` - Spotify API key
   - `CLIENT_SECRET` - Spotify API secret
   - `NODE_ENV` - Set to `production`
   - `REDIRECT_URI` - Your production callback URL
   - `FRONTEND_URI` - Your production frontend URL
   - `PORT` - Usually managed by platform (e.g., Heroku sets this)

---

## Complete Server Architecture

### Request Flow

```
1. Browser requests http://localhost:3000
   ↓
2. Vite dev server (client running on :3000)
   - Handles /api/* requests → proxy to http://localhost:8888
   ↓
3. Express server (running on :8888)
   - Serves built React app from client/build/
   - Handles OAuth flow with Spotify
   - Proxies requests from client
   ↓
4. Spotify API
   - Authentication
   - User data endpoints
```

### OAuth Flow with New Build Structure

1. **User clicks login** → Express `/login` endpoint
2. **Redirected to Spotify** → Authenticate
3. **Spotify redirects** to `/callback` endpoint
4. **Token received** → Redirected to `FRONTEND_URI` with tokens
5. **React app loads** from `client/build/index.html`
6. **Client makes requests** to server API endpoints

---

## Deployment Checklist

### Before Deploying

- [ ] Update `.env.example` with all required variables
- [ ] Set all environment variables on deployment platform
- [ ] Update `REDIRECT_URI` for production domain
- [ ] Update `FRONTEND_URI` for production domain
- [ ] Run `npm run build` to generate `client/build/`
- [ ] Test production build locally with `npm run preview`

### Heroku Deploy Steps

```bash
# 1. Update Procfile (if it exists)
echo "web: node server/index.js" > Procfile

# 2. Set environment variables
heroku config:set CLIENT_ID=your_id
heroku config:set CLIENT_SECRET=your_secret
heroku config:set NODE_ENV=production
heroku config:set REDIRECT_URI=https://your-app.herokuapp.com/callback
heroku config:set FRONTEND_URI=https://your-app.herokuapp.com

# 3. Deploy
git push heroku main
```

---

## Testing Server Locally

### Start Development Server

```bash
# Terminal 1: Start Express server
npm run server

# Terminal 2: Start Vite dev server (from client directory)
npm run dev

# Terminal 3: Optional - Run both with concurrently
npm run dev  # from root
```

### Test Endpoints

1. **Health check**:
   ```bash
   curl http://localhost:8888
   ```

2. **OAuth flow**:
   - Visit http://localhost:3000
   - Click "Login with Spotify"
   - Should redirect to Spotify
   - After auth, should return to app with tokens

3. **Check build output**:
   ```bash
   ls -la client/build/
   # Should contain: index.html, js/, css/, etc.
   ```

---

## Troubleshooting

### "Cannot find module 'dotenv'"
**Solution**: Run `npm install` in root directory

### "CORS error when requesting API"
**Solution**: 
- Check `vite.config.js` proxy configuration
- Ensure server is running on port 8888
- Check `REDIRECT_URI` and `FRONTEND_URI` match your setup

### "Cannot POST /callback"
**Solution**: 
- Verify Spotify credentials (CLIENT_ID, CLIENT_SECRET)
- Check that redirect URI in Spotify Dashboard matches `REDIRECT_URI` env var

### "404 index.html not found"
**Solution**: 
- Run `npm run build` in client directory
- Verify `client/build/index.html` exists
- Check server path: should be `../client/build` not `../client/public`

### Server won't start on port 8888
**Solution**:
- Change `PORT` environment variable: `export PORT=8889`
- Check if port is in use: `netstat -ano | find ":8888"`

---

## Key Differences from CRA Build

| Aspect | CRA | Vite |
|--------|-----|------|
| Build output dir | `client/build` | `client/build` |
| HTML file location | `client/public/index.html` | Generated in `client/build/` |
| Build time | ~30-60 seconds | ~3-5 seconds |
| Output size | Larger | Smaller |
| Asset hashing | Yes | Yes |

The server configuration works the same for both!

---

## Summary of Server Changes

✅ **Fixed 2 deprecated `Buffer` calls**
✅ **Updated final route to serve from `build/` instead of `public/`**
✅ **Updated `.env.example` with correct structure**
✅ **All other server code remains compatible**

**The server is now fully compatible with Vite's build output!**
