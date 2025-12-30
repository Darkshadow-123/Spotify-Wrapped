// SPOTIFY WEB API AUTHORIZATION CODE FLOW
// https://developer.spotify.com/documentation/general/guides/authorization-guide/

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import querystring from "querystring";
import request from "request";
import dotenv from "dotenv";

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "https://spotify-wrapped-chi.vercel.app/api/callback";
const FRONTEND_URI = "https://spotify-wrapped-chi.vercel.app";

const app = express();

app.use(cors());
app.use(cookieParser());

/**
 * Generates a random string containing numbers and letters
 */
const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = "spotify_auth_state";

/**
 * LOGIN
 */

app.get("/api/login", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  const scope =
    "user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public";

  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: "code",
      client_id: CLIENT_ID,
      scope,
      redirect_uri: REDIRECT_URI,
      state,
    })}`
  );
});

/**
 * CALLBACK
 */
app.get("/api/callback", (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies?.[stateKey] || null;

  if (!state || !storedState) {
    return res.redirect(`${FRONTEND_URI}`);
  }

  if (state !== storedState) {
    return res.redirect(`${FRONTEND_URI}`);
  }

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
        })}`
      );
    } else {
      res.redirect(
        `${FRONTEND_URI}/#${querystring.stringify({ error: "invalid_token" })}`
      );
    }
  });
});

/**
 * REFRESH TOKEN
 */
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
      refresh_token,
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.json({ access_token: body.access_token });
    } else {
      res.status(400).json({ error: "could_not_refresh_token" });
    }
  });
});

/**
 * EXPORT EXPRESS APP (SERVERLESS)
 */
export default app;
