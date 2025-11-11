const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy({
  clientID: '931800171713-arjpcmf0tfg8hjdhqvjhb8e50qkn6pf9.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      const username = profile.emails[0].value.split('@')[0];
      user = await new User({
        googleId: profile.id,
        username: username,
      }).save();
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.use(new FacebookStrategy({
  clientID: '698339182894543',
  clientSecret: 'c69554a5088ac22058e55e10769443f2',
  callbackURL: '/auth/facebook/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ facebookId: profile.id });
    if (!user) {
      const username = profile.displayName.replace(/\s+/g, '').toLowerCase() || `fb_${profile.id}`;
      user = await new User({
        facebookId: profile.id,
        username: username,
      }).save();
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
