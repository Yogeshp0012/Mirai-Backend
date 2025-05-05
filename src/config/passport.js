import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import User from '../models/userSchema.js';

dotenv.config({ path: '.env.example' });
passport.use(
  'jwt',
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SESSION_SECRET,
    },
    (payload, done) => {
      User.findById(payload.id)
        .then((user) => {
          if (user) return done(null, user);
          return done(null, false, { message: 'User not found' });
        })
        .catch((err) => {
          console.log(err);
          return done(err);
        });
    },
  ),
);

// Export the configured passport instance
export default passport;
