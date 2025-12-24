# ✅ PRE-DEPLOYMENT CHECKLIST

## 🎯 Before Deploying to Production

### Environment Setup
- [ ] `.env` file created from `.env.example`
- [ ] Spotify API credentials added (CLIENT_ID, CLIENT_SECRET)
- [ ] All environment variables filled in
- [ ] `.env` is in `.gitignore` (don't commit!)

### Dependencies Installation
- [ ] `npm install` completed successfully in root
- [ ] `npm run client:install` completed successfully
- [ ] `node_modules/` directory created with no errors
- [ ] No security vulnerabilities (`npm audit`)

### Code Quality
- [ ] `npm run lint` passes without errors
- [ ] No console warnings in dev server
- [ ] No TypeScript errors (if applicable)
- [ ] Code formatting checked with Prettier

### Development Testing
- [ ] `npm run dev` starts without errors
- [ ] App loads at http://localhost:3000
- [ ] Dev server hot-reload working
- [ ] Browser DevTools show no errors
- [ ] Styled-components showing proper names

### Feature Testing
- [ ] Spotify login flow works
- [ ] Authorization code flow completes
- [ ] Token refresh works
- [ ] API calls succeed
- [ ] Profile data displays correctly
- [ ] Playlists load properly
- [ ] Charts render without errors

### Build Testing
- [ ] `cd client && npm run build` completes successfully
- [ ] `client/build/` directory created
- [ ] No build errors or warnings
- [ ] Source maps disabled for production
- [ ] Code minified correctly

### Production Server Testing
- [ ] `npm start` launches production server
- [ ] Server listens on correct port
- [ ] Static files served correctly
- [ ] API endpoints respond
- [ ] OAuth flow works in production build

### Spotify Dashboard Setup
- [ ] Application registered at https://developer.spotify.com/dashboard
- [ ] Client ID copied to `.env`
- [ ] Client Secret copied to `.env`
- [ ] Redirect URI added: `http://localhost:8888/callback`
- [ ] For production: updated redirect URI for your domain

### Git Configuration
- [ ] `.env` is in `.gitignore`
- [ ] No sensitive data in commits
- [ ] `.gitignore` includes: node_modules, .env, build, logs
- [ ] All necessary files tracked in git

---

## 🚀 Deployment Platform Checklist

### Heroku
- [ ] Heroku account created
- [ ] Heroku CLI installed
- [ ] `heroku create` run
- [ ] Environment variables set:
  ```bash
  heroku config:set CLIENT_ID=your_id
  heroku config:set CLIENT_SECRET=your_secret
  heroku config:set NODE_ENV=production
  heroku config:set REDIRECT_URI=https://your-app.herokuapp.com/callback
  ```
- [ ] Spotify Dashboard updated with Heroku callback URL
- [ ] `git push heroku main` successful
- [ ] `heroku logs --tail` shows no errors

### Vercel/Netlify (Frontend Only)
- [ ] Build command: `cd client && npm run build`
- [ ] Output directory: `client/build`
- [ ] Environment variables configured
- [ ] Redirects configured for SPA routing

### Self-Hosted / VPS
- [ ] Node.js 18+ installed on server
- [ ] Port 8888 open/accessible
- [ ] Environment variables configured
- [ ] Reverse proxy setup (nginx/Apache)
- [ ] SSL certificate configured
- [ ] Process manager setup (PM2, systemd)

---

## 📋 Final Verification

### Directory Structure
```
✓ Project root contains package.json
✓ client/ directory has vite.config.js
✓ client/src/ contains main.jsx (not index.jsx)
✓ client/public/ contains static assets
✓ server/ directory has index.js
✓ No old files (no .babelrc, no public/index.html)
```

### File Permissions
- [ ] All files readable by application user
- [ ] Node modules executable
- [ ] Build directory writable if needed

### Ports & Networking
- [ ] Port 3000 available for dev (or configured)
- [ ] Port 8888 available for production (or configured)
- [ ] Firewall allows required ports
- [ ] CORS configured if needed

### Database & Cache (if applicable)
- [ ] MongoDB/Redis connection working
- [ ] Connection strings in environment variables
- [ ] No hardcoded credentials

### Monitoring & Logging
- [ ] Error tracking setup (Sentry, etc.)
- [ ] Server logs configured
- [ ] Performance monitoring setup
- [ ] Uptime monitoring configured

---

## 🔍 Pre-Launch Verification

Run these commands to verify everything:

```bash
# 1. Check Node version
node --version  # Should be 18.0.0 or higher

# 2. Check npm
npm --version

# 3. Install dependencies
npm install && npm run client:install

# 4. Run linting
npm run lint

# 5. Build
cd client && npm run build

# 6. Verify build exists
ls -la build/  # Should have index.html, js/, css/

# 7. Test production locally
npm start
# Visit http://localhost:8888

# 8. Check Spotify login works
# Click "Login with Spotify" button
# You should be redirected to Spotify
# After auth, should return with tokens
```

---

## ⚠️ Common Deployment Issues

### Issue: Build fails with "cannot find module"
**Solution**: Run `npm install` in root, then `npm run client:install`

### Issue: Port 8888 already in use
**Solution**: Change `PORT` environment variable to available port

### Issue: Spotify login redirect fails
**Solution**: Verify `REDIRECT_URI` matches Spotify Dashboard and `.env` file

### Issue: Styled-components don't have names
**Solution**: Ensure `babel-plugin-styled-components` in devDependencies

### Issue: Module not found errors
**Solution**: Check file extensions (.jsx not .js) and import statements

### Issue: Build hangs or takes too long
**Solution**: Check available disk space and RAM, kill other processes

---

## 📞 Post-Deployment Checklist

- [ ] Application accessible from internet
- [ ] Spotify login flow working
- [ ] User data fetching correctly
- [ ] Charts displaying properly
- [ ] No console errors in production
- [ ] Performance acceptable
- [ ] Error tracking working
- [ ] Logs accessible and readable
- [ ] Backups configured
- [ ] Team notified of deployment

---

## 🎓 Rollback Plan

If issues after deployment:

```bash
# 1. Check logs
heroku logs --tail  # or your platform's logging

# 2. Revert to previous version
git revert HEAD
git push heroku main

# 3. Or redeploy with last known good commit
git reset --hard <commit-hash>
git push heroku main --force

# 4. Check environment variables still set
heroku config
```

---

## 📊 Post-Deployment Monitoring

First 24 hours:
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Verify user counts
- [ ] Monitor API response times
- [ ] Check for security issues

First week:
- [ ] Gather user feedback
- [ ] Monitor crash reports
- [ ] Check resource usage
- [ ] Verify backup creation
- [ ] Review security logs

---

## ✅ Success Criteria

Deployment is successful when:
- ✅ Application accessible from web
- ✅ Spotify login working
- ✅ Data loads without errors
- ✅ No console errors
- ✅ Page loads in < 3 seconds
- ✅ All features functional
- ✅ Error tracking active
- ✅ Logs accessible

---

## 📚 Reference

For detailed setup: See `SETUP.md`
For quick reference: See `QUICK_START.md`
For issues: See documentation in project root

---

**Before Deployment**: Ensure all checkboxes are checked ✅
**During Deployment**: Monitor for errors
**After Deployment**: Monitor logs and user feedback

**Good luck! 🚀**
