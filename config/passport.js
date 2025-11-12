const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

const GOOGLE_CLIENT_ID = '931800171713-arjpcmf0tfg8hjdhqvjhb8e50qkn6pf9.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
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
