const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');

const GOOGLE_CLIENT_ID = '931800171713-arjpcmf0tfg8hjdhqvjhb8e50qkn6pf9.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const FACEBOOK_APP_ID = '847235911090738';
const FACEBOOK_APP_SECRET = '4cd2fbef7f1161ae984e1838037a2a08';
const CALLBACK_URL = 'https://comp3810sef-group4.onrender.com';

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${CALLBACK_URL}/auth/google/callback`,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await new User({
        googleId: profile.id,
        username: profile.emails[0].value,
        displayName: profile.displayName,
      }).save();
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: `${CALLBACK_URL}/auth/facebook/callback`,
  profileFields: ['id', 'emails', 'name'],
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ facebookId: profile.id });
    if (!user) {
      const email = profile.emails?.[0]?.value || `${profile.id}@facebook.com`;
      user = await new User({
        facebookId: profile.id,
        username: email,
        displayName: `${profile.name.givenName} ${profile.name.familyName}`,
      }).save();
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));
