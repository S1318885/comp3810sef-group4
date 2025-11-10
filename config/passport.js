const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy({
  clientID: '1033323949067-c99moo810qjo9kq1h775pbear8h1584c.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:3000/auth/google/callback'
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
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
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
