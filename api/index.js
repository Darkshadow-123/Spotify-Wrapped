// SPOTIFY WEB API AUTHORIZATION CODE FLOW
// https://developer.spotify.com/documentation/general/guides/authorization-guide/

<<<<<<< HEAD
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import querystring from 'querystring';
import request from 'request';
import dotenv from 'dotenv';
=======
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import querystring from "querystring";
import request from "request";
import dotenv from "dotenv";
>>>>>>> 2f63d7a8f58b206db771b8cff18e7fd02e529292

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
<<<<<<< HEAD
const REDIRECT_URI = 'https://spotify-wrapped-chi.vercel.app/api/callback';
const FRONTEND_URI = 'https://spotify-wrapped-chi.vercel.app';
//"https://spotify-wrapped-bzjngdbo3-rishis-projects-e1d0838a.vercel.app"
=======
const REDIRECT_URI = "https://spotify-wrapped-chi.vercel.app/api/callback";
const FRONTEND_URI ="https://spotify-wrapped-chi.vercel.app";
  //"https://spotify-wrapped-bzjngdbo3-rishis-projects-e1d0838a.vercel.app"
>>>>>>> 2f63d7a8f58b206db771b8cff18e7fd02e529292

const app = express();

app.use(cors());
app.use(cookieParser());

/**
 * Generates a random string containing numbers and letters
 */
<<<<<<< HEAD
const generateRandomString = length => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
=======
const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
>>>>>>> 2f63d7a8f58b206db771b8cff18e7fd02e529292
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

<<<<<<< HEAD
const stateKey = 'spotify_auth_state';
=======
const stateKey = "spotify_auth_state";
>>>>>>> 2f63d7a8f58b206db771b8cff18e7fd02e529292

/**
 * LOGIN
 */

<<<<<<< HEAD
app.get('/api/login', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state, { httpOnly: true, secure: true, sameSite: 'none', path: '/' });

  const scope =
    'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public';

  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: 'code',
=======
app.get("/api/login", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state, {  httpOnly: true, secure: true, sameSite: 'none', path: '/' });

  const scope =
    "user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public";

  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: "code",
>>>>>>> 2f63d7a8f58b206db771b8cff18e7fd02e529292
      client_id: CLIENT_ID,
      scope,
      redirect_uri: REDIRECT_URI,
      state,
<<<<<<< HEAD
    })}`,
=======
    })}`
>>>>>>> 2f63d7a8f58b206db771b8cff18e7fd02e529292
  );
});

/**
 * CALLBACK
 */
<<<<<<< HEAD
app.get('/api/callback', (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies?.[stateKey] || null;

  if (!state || !storedState) {
    return res.redirect(`${FRONTEND_URI}`);
  }

=======
app.get("/api/callback", (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies?.[stateKey] || null;
  
  if (!state || !storedState) {
    return res.redirect(`${FRONTEND_URI}`);
  }
  
>>>>>>> 2f63d7a8f58b206db771b8cff18e7fd02e529292
  if (state !== storedState) {
    return res.redirect(`${FRONTEND_URI}`);
  }

<<<<<<< HEAD
  res.clearCookie(stateKey);

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    },
    headers: {
      Authorization: `Basic ${  Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
=======

  res.clearCookie(stateKey);

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
>>>>>>> 2f63d7a8f58b206db771b8cff18e7fd02e529292
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const { access_token, refresh_token } = body;

      res.redirect(
        `${FRONTEND_URI}/#${querystring.stringify({
          access_token,
          refresh_token,
<<<<<<< HEAD
        })}`,
      );
    } else {
      res.redirect(`${FRONTEND_URI}/#${querystring.stringify({ error: 'invalid_token' })}`);
=======
        })}`
      );
    } else {
      res.redirect(
        `${FRONTEND_URI}/#${querystring.stringify({ error: "invalid_token" })}`
      );
>>>>>>> 2f63d7a8f58b206db771b8cff18e7fd02e529292
    }
  });
});

/**
 * REFRESH TOKEN
 */
<<<<<<< HEAD
app.get('/api/refresh_token', (req, res) => {
  const refresh_token = req.query.refresh_token;

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: `Basic ${  Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
    },
    form: {
      grant_type: 'refresh_token',
=======
app.get("/api/refresh_token", (req, res) => {
  const refresh_token = req.query.refresh_token;

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
>>>>>>> 2f63d7a8f58b206db771b8cff18e7fd02e529292
      refresh_token,
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.json({ access_token: body.access_token });
    } else {
<<<<<<< HEAD
      res.status(400).json({ error: 'could_not_refresh_token' });
=======
      res.status(400).json({ error: "could_not_refresh_token" });
>>>>>>> 2f63d7a8f58b206db771b8cff18e7fd02e529292
    }
  });
});

/**
 * EXPORT EXPRESS APP (SERVERLESS)
 */
export default app;
