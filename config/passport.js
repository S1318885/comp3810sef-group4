const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy({
  clientID: '1033323949067-vvplohn7feaq757ppa659stthf6pc1la.apps.googleusercontent.com',
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