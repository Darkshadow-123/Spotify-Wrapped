# Complete Setup Guide: After Migration

Follow these steps to complete the migration and get your project running.

## Step 1: Set Up Environment Variables

### Root Directory Setup

```bash
# Create .env file from template
cp .env.example .env
```

**Edit `.env` and add your Spotify credentials**:
```dotenv
CLIENT_ID=your_spotify_client_id_from_dashboard
CLIENT_SECRET=your_spotify_client_secret_from_dashboard
PORT=8888
NODE_ENV=development
REDIRECT_URI=http://localhost:8888/callback
FRONTEND_URI=http://localhost:3000
```

**To get your Spotify credentials:**
1. Go to https://developer.spotify.com/dashboard
2. Log in or create an account
3. Create an application
4. Copy your Client ID and Client Secret
5. Add http://localhost:8888/callback to Redirect URIs

---

## Step 2: Clean Old Files

```powershell
# Navigate to project root
cd d:\Downloads\spotify-profile-main\spotify-profile-main

# Remove old lock files
Remove-Item yarn.lock -Force
Remove-Item client\yarn.lock -Force

# Remove old node_modules
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force client\node_modules
```

---

## Step 3: Install Dependencies

```powershell
# Install root dependencies
npm install

# Install client dependencies
npm run client:install

# Or do it manually
cd client
npm install
cd ..
```

---

## Step 4: Build the Frontend

```powershell
# Build client for production
cd client
npm run build
cd ..

# This creates client/build/ directory with optimized assets
```

---

## Step 5: Run the Application

### Option A: Development Mode (Recommended for Development)

**Terminal 1: Run Express Server**
```powershell
npm run server
# Server running on http://localhost:8888
```

**Terminal 2: Run Vite Dev Server** (from client directory)
```powershell
cd client
npm run dev
# Dev server running on http://localhost:3000 with hot reload
```

### Option B: Development Mode (Using Concurrently)

```powershell
# Runs both server and client simultaneously
npm run dev
```

### Option C: Production Mode

```powershell
# Build the client
cd client
npm run build
cd ..

# Run the server (it will serve the built app)
npm run server
# Visit http://localhost:8888
```

---

## Step 6: Test the Application

1. **Open browser** to http://localhost:3000 (dev) or http://localhost:8888 (production)
2. **Click "Login with Spotify"**
3. **Authorize** the application
4. **View your Spotify profile data**

---

## Verification Checklist

- [ ] `.env` file created and filled with Spotify credentials
- [ ] Old lock files removed (yarn.lock)
- [ ] Old node_modules removed
- [ ] npm install completed successfully
- [ ] `client/build/` directory exists (after npm run build)
- [ ] Server starts without errors on port 8888
- [ ] Client dev server starts on port 3000
- [ ] Can visit http://localhost:3000
- [ ] Spotify login flow works
- [ ] Profile data displays correctly

---

## Project Structure (Post-Migration)

```
spotify-profile/
├── .env                          # ← Create this from .env.example
├── .env.example                  # ← Template (SAFE TO COMMIT)
├── .env.local                    # ← Local development (DO NOT COMMIT)
├── .gitignore
├── package.json                  # ← Root scripts use npm
├── MIGRATION_GUIDE.md            # ← Client migration details
├── SERVER_MIGRATION.md           # ← Server changes
├── README.md
│
├── server/
│   └── index.js                  # ← UPDATED: Buffer fix, build path
│
└── client/
    ├── index.html                # ← NEW: Vite entry point
    ├── vite.config.js            # ← NEW: Vite configuration
    ├── .eslintrc.json            # ← NEW: ESLint config
    ├── .prettierrc                # ← NEW: Prettier config
    ├── .env.example              # ← NEW: Client env template
    ├── package.json              # ← UPDATED: Vite + npm
    ├── public/                   # ← Static assets
    ├── src/
    │   ├── main.jsx              # ← RENAMED from index.js
    │   ├── components/
    │   │   ├── App.jsx           # ← RENAMED from .js
    │   │   ├── LoginScreen.jsx   # ← RENAMED + env vars updated
    │   │   └── ...other components.jsx
    │   ├── styles/
    │   ├── utils/
    │   └── spotify/
    └── build/                    # ← GENERATED: npm run build
        ├── index.html
        ├── js/
        └── css/
```

---

## Available npm Scripts

### Root Level
```bash
npm run client:install    # Install client dependencies
npm run client            # Run client dev server
npm run server            # Run Express server
npm run dev               # Run both server & client (concurrently)
npm start                 # Run Express server (production)
```

### Client Level (cd client)
```bash
npm run dev               # Start Vite dev server
npm run build             # Build for production
npm run preview           # Preview production build
npm run lint              # Run ESLint
```

---

## Deployment Guide

### Heroku Deployment

1. **Set environment variables**:
```bash
heroku config:set CLIENT_ID=your_id
heroku config:set CLIENT_SECRET=your_secret
heroku config:set NODE_ENV=production
heroku config:set REDIRECT_URI=https://your-app.herokuapp.com/callback
heroku config:set FRONTEND_URI=https://your-app.herokuapp.com
```

2. **Update Spotify Dashboard**:
   - Add `https://your-app.herokuapp.com/callback` to Redirect URIs

3. **Deploy**:
```bash
git push heroku main
```

### Other Platforms (Vercel, Netlify, etc.)

For full-stack hosting, you'll need:
- Backend: Node.js Express server
- Frontend: Built Vite app
- Environment variables set on platform

---

## Troubleshooting

### Issue: "Cannot find module 'vite'"
**Solution**: Run `npm install` in both root and client directories

### Issue: Port 3000 or 8888 already in use
**Solution**: 
- Change port in `client/vite.config.js` (line: `port: 3000`)
- Change port in `server/index.js` or via `PORT` env variable

### Issue: "CORS error" when logging in
**Solution**: 
- Verify server is running on :8888
- Check proxy config in `client/vite.config.js`
- Check `REDIRECT_URI` in `.env` matches Spotify Dashboard

### Issue: "Cannot GET /" after build
**Solution**: 
- Run `npm run build` in client directory
- Verify `client/build/index.html` exists
- Restart server: `npm run server`

### Issue: Login redirects to wrong URL
**Solution**: 
- Check `FRONTEND_URI` in `.env`
- Check `REDIRECT_URI` in `.env` matches Spotify Dashboard Redirect URIs

### Issue: Files with .jsx extension not found
**Solution**: 
- This is normal - Vite handles .jsx extension resolution
- All component imports work without specifying .jsx extension

---

## What Was Changed

### Configuration Files
- ✅ `package.json` - Updated to use npm and Vite
- ✅ `client/vite.config.js` - Created new Vite config
- ✅ `.eslintrc.json` - Created ESLint config
- ✅ `.prettierrc` - Created Prettier config
- ✅ `server/index.js` - Fixed Buffer constructor and build paths

### File Extensions
- ✅ All `.js` files in `src/` renamed to `.jsx`
- ✅ `index.js` → `main.jsx`

### Build Output
- ✅ Old CRA build system → Vite bundler
- ✅ Output location: `client/build/` (same as before)

### Environment Variables
- ✅ `process.env.*` → `import.meta.env.*` (in components)
- ✅ New `.env.example` template added

---

## Performance Improvements with Vite

- **Dev Server**: ~2 seconds startup (vs CRA ~30 seconds)
- **Hot Module Reload**: Instant (vs CRA 3-5 seconds)
- **Build Time**: ~3-5 seconds (vs CRA 30-60 seconds)
- **Bundle Size**: Smaller optimized output

---

## Next Steps

1. ✅ Complete all steps above
2. 🧪 Test the application thoroughly
3. 🔍 Verify Spotify login and data display
4. 🚀 Deploy to your hosting platform
5. 📚 Read [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) for detailed client changes
6. 📚 Read [SERVER_MIGRATION.md](SERVER_MIGRATION.md) for server changes

---

**Your migration is complete! You're now using npm + Vite instead of Yarn + CRA.** 🎉
